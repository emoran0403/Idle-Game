import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";
import { AllLocations } from "../../../../Constants/LocationInfo";
import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { getLevel } from "../../../../Constants/XP Levels";
import { ListOfFish } from "../../../../Constants/Items/Fish";
import { useDispatch } from "react-redux";
import { setResource } from "../../Redux/Slices/CurrentResource";
import { setSkill } from "../../Redux/Slices/CurrentSkill";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setTarget } from "../../Redux/Slices/CurrentTarget";
import { setQuest } from "../../Redux/Slices/CurrentQuest";
import { listOfHatchets } from "../../../../Constants/SkillingEquipment/Hatchets";

//@ this needs to pull from some single source of truth showing all the skills available, and their resources based on the current location from state

const SkillsPanel = (props: Types.SkillsPanelCompProps) => {
  const dispatch = useDispatch();
  // This grabs the current location from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;
  const hatchetsFromState = useSelector((state: Types.AllState) => state.Hatchets) as Types.IHatchetsSlice;

  // This chooses the current location summary from AllLocations
  const currentLocationSummary = AllLocations[CurrentLocation] as Types.ILocationSummary;

  // gets the player's experience
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  let WoodcuttingLevel: number = getLevel(Experience.Woodcutting);
  let FishingLevel: number = getLevel(Experience.Fishing);

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
                // if the last log contains the resource, don't send it
                if (resource === props.chatLogArray[props.chatLogArray.length - 1].message.substring(12)) {
                  return;
                }
                props.newChatLog(`Now cutting ${resource}`, `Activity Swap`);
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
                // if the last log contains the resource, don't send it
                if (resource === props.chatLogArray[props.chatLogArray.length - 1].message.substring(12)) {
                  return;
                }
                props.newChatLog(`Now fishing ${resource}`, `Activity Swap`);
              }}
              key={`resource-list-${resource}`}
              className={`btn border mb-3 ${FishingLevel >= ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing ? `bg-success` : `bg-danger`}`}
            >
              <div className="card-body text">
                <h5 className="card-title">{resource}</h5>
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

    const itemHasBeenEquipped = (e: React.ChangeEvent<HTMLSelectElement>) => {
      //! string type is `ok` since they can be keys of Types.ICurrentEquipment
      /**
       * this can be better described by stating the possible options of each slot in Types.ICurrentEquipment
       *
       */
      let newlyEquippedItemDisplayName: string = ``;
      let oldEquippedItemDisplayName: string = ``;

      // go thru all the composite items so we can set the context of the old and new items
      for (let i = 0; i < compositeHatchets.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositeHatchets[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositeHatchets[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositeHatchets[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositeHatchets[i].displayName;
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
        {compositeHatchets.map((Hatchet) => (
          <option
            value={Hatchet.name}
            key={`Slot-Item-${Hatchet.name}`}
            className={`${handleSelectorStyle(Hatchet)}`}
            disabled={applyDisabledAttribute(Hatchet)}
          >
            {Hatchet.displayName}
          </option>
        ))}
      </select>
    );
  };

  const handleSelectorStyle = (hatchet: Types.ICompositeHatchet) => {
    // if the equipment is a piece of armor, it will have a defence level
    // based on the style, determine if the player has the appropriate offensive levels

    const playerOwnsItem = hatchet.playerOwnsThisItem;

    const canWear = getLevel(Experience.Woodcutting) >= hatchet.levelReqWoodcutting;
    // check if the player owns the armor, and has the appropriate defence level
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

  const applyDisabledAttribute = (hatchet: Types.ICompositeHatchet) => {
    const canWear = getLevel(Experience.Woodcutting) >= hatchet.levelReqWoodcutting;
    if (!hatchet.playerOwnsThisItem || !canWear) {
      // if the player does not own the item, or if the player does not meet the level req, return true to disable the item
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          Hatchet: {displayHatchetSelectorTag()}
          <div className="card-body">
            {/* panel specific content goes here */}
            {WoodcuttingOptions(currentLocationSummary.Skills.Woodcutting)}
            {FishingOptions(currentLocationSummary.Skills.Fishing)}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPanel;
