import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { AllLocations } from "../../../../Constants/LocationInfo";
import { getLevel } from "../../../../Constants/XP Levels";

import { ListOfFish } from "../../../../Constants/Items/Fish";

import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { listOfHatchets } from "../../../../Constants/SkillingEquipment/Hatchets";

import { ListOfOres } from "../../../../Constants/Items/Ores";
import { listOfPickaxes } from "../../../../Constants/SkillingEquipment/Pickaxes";

import { setResource } from "../../Redux/Slices/CurrentResource";
import { setSkill } from "../../Redux/Slices/CurrentSkill";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setTarget } from "../../Redux/Slices/CurrentTarget";
import { setQuest } from "../../Redux/Slices/CurrentQuest";

const SkillsPanel = (props: Types.SkillsPanelCompProps) => {
  const dispatch = useDispatch();
  // This grabs the current location from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;
  const hatchetsFromState = useSelector((state: Types.AllState) => state.Hatchets) as Types.IHatchetsSlice;
  const pickaxesFromState = useSelector((state: Types.AllState) => state.Pickaxes) as Types.IPickaxesSlice;

  // This chooses the current location summary from AllLocations
  const currentLocationSummary = AllLocations[CurrentLocation] as Types.ILocationSummary;

  // gets the player's experience
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  let WoodcuttingLevel: number = getLevel(Experience.Woodcutting);
  let FishingLevel: number = getLevel(Experience.Fishing);
  let MiningLevel: number = getLevel(Experience.Mining);

  const panelHeaderJSX = () => {
    // returns the JSX for the panel header
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-3 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <div className="col-lg-9 justify-content-lg-center">Skilling in {CurrentLocation}</div>
      </div>
    );
  };

  const WoodcuttingOptions = (resourceArray: string[]) => {
    return (
      <div onClick={() => {}} className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Woodcutting Level {WoodcuttingLevel}</h6>
        <div className="d-flex flex-row flex-wrap">
          {resourceArray.map((resource) => (
            <button
              disabled={WoodcuttingLevel < ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting ? true : false}
              onClick={(e) => {
                dispatch(setTarget(`none`));
                dispatch(setActivity(`Skilling`));
                dispatch(setResource(resource));
                dispatch(setQuest(`none`));
                dispatch(setSkill(`Woodcutting`));
                // send a contextual message to the chat window
                // if the last log contains the same message, don't send it
                if (
                  `Now cutting ${ListOfLogs[resource as keyof Types.IListOfLogs].displayName}` === props.chatLogArray[props.chatLogArray.length - 1].message
                ) {
                  return;
                }
                props.newChatLog(`Now cutting ${ListOfLogs[resource as keyof Types.IListOfLogs].displayName}`, `Activity Swap`);
              }}
              key={`resource-list-${resource}`}
              className={`btn border mb-3 ${
                WoodcuttingLevel >= ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting ? `bg-success` : `bg-danger`
              }`}
            >
              <div className="card-body text">
                <h5 className="card-title">{ListOfLogs[resource as keyof Types.IListOfLogs].displayName}</h5>
                <div className="card-text">
                  <div>Level {ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting}</div>
                  <div>{ListOfLogs[resource as keyof Types.IListOfLogs].XPGivenWoodcutting} XP</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const FishingOptions = (resourceArray: string[]) => {
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Fishing Level {FishingLevel}</h6>
        <div className="d-flex flex-row flex-wrap">
          {resourceArray.map((resource) => (
            <button
              disabled={FishingLevel < ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing ? true : false}
              onClick={(e) => {
                dispatch(setTarget(`none`));
                dispatch(setActivity(`Skilling`));
                dispatch(setResource(resource));
                dispatch(setQuest(`none`));
                dispatch(setSkill(`Fishing`));

                // send a contextual message to the chat window
                // if the last log contains the same message, don't send it
                if (
                  `Now fishing ${ListOfFish[resource as keyof Types.IListOfFish].displayName}` === props.chatLogArray[props.chatLogArray.length - 1].message
                ) {
                  return;
                }
                props.newChatLog(`Now fishing ${ListOfFish[resource as keyof Types.IListOfFish].displayName}`, `Activity Swap`);
              }}
              key={`resource-list-${resource}`}
              className={`btn border mb-3 ${FishingLevel >= ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing ? `bg-success` : `bg-danger`}`}
            >
              <div className="card-body text">
                <h5 className="card-title">{ListOfFish[resource as keyof Types.IListOfFish].displayName}</h5>
                <div className="card-text">
                  <div>Level {ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing}</div>
                  <div>{ListOfFish[resource as keyof Types.IListOfFish].XPGivenFishing} XP</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const MiningOptions = (resourceArray: string[]) => {
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Mining Level {MiningLevel}</h6>
        <div className="d-flex flex-row flex-wrap">
          {resourceArray.map((resource) => (
            <button
              disabled={MiningLevel < ListOfOres[resource as keyof Types.IListOfOres].levelReqMining ? true : false}
              onClick={(e) => {
                dispatch(setTarget(`none`));
                dispatch(setActivity(`Skilling`));
                dispatch(setResource(resource));
                dispatch(setQuest(`none`));
                dispatch(setSkill(`Mining`));
                // send a contextual message to the chat window
                // if the last log contains the same message, don't send it
                if (`Now mining ${ListOfOres[resource as keyof Types.IListOfOres].displayName}` === props.chatLogArray[props.chatLogArray.length - 1].message) {
                  return;
                }
                props.newChatLog(`Now mining ${ListOfOres[resource as keyof Types.IListOfOres].displayName}`, `Activity Swap`);
              }}
              key={`resource-list-${resource}`}
              className={`btn border mb-3 ${MiningLevel >= ListOfOres[resource as keyof Types.IListOfOres].levelReqMining ? `bg-success` : `bg-danger`}`}
            >
              <div className="card-body text">
                <h5 className="card-title">{ListOfOres[resource as keyof Types.IListOfOres].displayName}</h5>
                <div className="card-text">
                  <div>Level {ListOfOres[resource as keyof Types.IListOfOres].levelReqMining}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const displayHatchetSelectorTag = () => {
    // define an empty array where composite hatchets will be pushed to
    let compositeHatchets: Types.ICompositeHatchet[] = [];

    // create an array of hatchets from constants
    let hatchetsFromConstants: Types.IHatchet[] = Object.values(listOfHatchets);

    for (let i = 0; i < hatchetsFromConstants.length; i++) {
      // create an array of composite hatchets by adding the playerOwnsThisItem property to object from constants for each hatchet from constants

      let playerOwnsThisItem: boolean = hatchetsFromState[`playerOwns${hatchetsFromConstants[i].name}` as keyof Types.IHatchetsSlice];
      let tempHatchet: Types.ICompositeHatchet = { ...hatchetsFromConstants[i], playerOwnsThisItem };
      // compose items from constants and state
      compositeHatchets.push(tempHatchet);
    }

    //@ remove crystal hatchet until implemented
    let compositeHatchetsNoCrystal = compositeHatchets.filter((hatchet) => hatchet.name !== "crystalhatchet");

    const itemHasBeenEquipped = (e: React.ChangeEvent<HTMLSelectElement>) => {
      //! string type is `ok` since they can be keys of Types.ICurrentEquipment
      /**
       * this can be better described by stating the possible options of each slot in Types.ICurrentEquipment
       *
       */
      let newlyEquippedItemDisplayName: string = ``;
      let oldEquippedItemDisplayName: string = ``;

      // go thru all the composite items so we can set the context of the old and new items
      for (let i = 0; i < compositeHatchetsNoCrystal.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositeHatchetsNoCrystal[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositeHatchetsNoCrystal[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositeHatchetsNoCrystal[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositeHatchetsNoCrystal[i].displayName;
        }
      }

      // a hatchet is always equipped, so we only need the swap message
      if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value !== `none`) {
        props.newChatLog(`Swapped to ${newlyEquippedItemDisplayName}`, `Equipment Swap`);
      }

      props.setCurrentEquipment({ ...props.currentEquipment, [e.target.name as keyof Types.ICurrentEquipment]: e.target.value });
    };

    return (
      <select className="form-select" onChange={(e) => itemHasBeenEquipped(e)} name={`Hatchet`}>
        {compositeHatchetsNoCrystal.map((Hatchet) => (
          <option
            value={Hatchet.name}
            key={`Slot-Item-${Hatchet.name}`}
            className={`${handleSelectorStyle(Hatchet)}`}
            disabled={applyDisabledAttribute(Hatchet)}
            selected={Hatchet.name === props.currentEquipment.Hatchet ? true : false}
          >
            {Hatchet.displayName}
          </option>
        ))}
      </select>
    );
  };

  const displayPickaxeSelectorTag = () => {
    // define an empty array where composite pickaxes will be pushed to
    let compositePickaxes: Types.ICompositePickaxe[] = [];

    // create an array of Pickaxes from constants
    let pickaxesFromConstants: Types.IPickaxe[] = Object.values(listOfPickaxes);

    for (let i = 0; i < pickaxesFromConstants.length; i++) {
      // create an array of composite Pickaxes by adding the playerOwnsThisItem property to object from constants for each Pickaxe from constants

      let playerOwnsThisItem: boolean = pickaxesFromState[`playerOwns${pickaxesFromConstants[i].name}` as keyof Types.IPickaxesSlice];
      let tempPickaxe: Types.ICompositePickaxe = { ...pickaxesFromConstants[i], playerOwnsThisItem };
      // compose items from constants and state
      compositePickaxes.push(tempPickaxe);
    }

    //@ remove crystal pickaxe until implemented
    let compositePickaxesNoCrystal = compositePickaxes.filter((hatchet) => hatchet.name !== "crystalpickaxe");

    const itemHasBeenEquipped = (e: React.ChangeEvent<HTMLSelectElement>) => {
      //! string type is `ok` since they can be keys of Types.ICurrentEquipment
      /**
       * this can be better described by stating the possible options of each slot in Types.ICurrentEquipment
       *
       */
      let newlyEquippedItemDisplayName: string = ``;
      let oldEquippedItemDisplayName: string = ``;

      // go thru all the composite items so we can set the context of the old and new items
      for (let i = 0; i < compositePickaxesNoCrystal.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositePickaxesNoCrystal[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositePickaxesNoCrystal[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositePickaxesNoCrystal[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositePickaxesNoCrystal[i].displayName;
        }
      }

      // a hatchet is always equipped, so we only need the swap message
      if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value !== `none`) {
        props.newChatLog(`Swapped to ${newlyEquippedItemDisplayName}`, `Equipment Swap`);
      }

      props.setCurrentEquipment({ ...props.currentEquipment, [e.target.name as keyof Types.ICurrentEquipment]: e.target.value });
    };

    return (
      <select className="form-select" onChange={(e) => itemHasBeenEquipped(e)} name={`Pickaxe`}>
        {compositePickaxesNoCrystal.map((Pickaxe) => (
          <option
            value={Pickaxe.name}
            key={`Slot-Item-${Pickaxe.name}`}
            className={`${handleSelectorStyle(Pickaxe)}`}
            disabled={applyDisabledAttribute(Pickaxe)}
            selected={Pickaxe.name === props.currentEquipment.Pickaxe ? true : false}
          >
            {Pickaxe.displayName}
          </option>
        ))}
      </select>
    );
  };

  const handleSelectorStyle = (item: Types.ICompositeHatchet | Types.ICompositePickaxe) => {
    // use type guarding to decide which item is being styled

    const playerOwnsItem = item.playerOwnsThisItem;

    let canWear = false;

    if (`levelReqWoodcutting` in item) {
      canWear = getLevel(Experience.Woodcutting) >= item.levelReqWoodcutting;
    } else if (`levelReqMining` in item) {
      canWear = getLevel(Experience.Mining) >= item.levelReqMining;
    }

    // check if the player owns the item, and has the appropriate level
    if (playerOwnsItem && canWear) {
      // has levels and owns item = green background

      return `bg-success`;
    } else if (!playerOwnsItem && canWear) {
      // missing levels and owns item = yellow background

      return `bg-yellowlol`;
    } else if (playerOwnsItem && !canWear) {
      // has levels and does not own item = orange background

      return `bg-orangelol`;
    } else if (!playerOwnsItem && !canWear) {
      // missing levels and does not own item = red background
      return `bg-danger`;
    }
  };

  const applyDisabledAttribute = (item: Types.ICompositeHatchet | Types.ICompositePickaxe) => {
    // set canWear to false,
    let canWear = false;
    // type guard to ensure we are checking the correct attribute
    if (`levelReqWoodcutting` in item) {
      canWear = getLevel(Experience.Woodcutting) >= item.levelReqWoodcutting;
    } else if (`levelReqMining` in item) {
      canWear = getLevel(Experience.Mining) >= item.levelReqMining;
    }

    if (!item.playerOwnsThisItem || !canWear) {
      // if the player does not own the item, or if the player does not meet the level req, return true to disable the item
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          Hatchet: {displayHatchetSelectorTag()}
          Pickaxe: {displayPickaxeSelectorTag()}
          <div className="card-body">
            {/* panel specific content goes here */}
            {WoodcuttingOptions(currentLocationSummary.Skills.Woodcutting)}
            {FishingOptions(currentLocationSummary.Skills.Fishing)}
            {MiningOptions(currentLocationSummary.Skills.Mining)}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPanel;
