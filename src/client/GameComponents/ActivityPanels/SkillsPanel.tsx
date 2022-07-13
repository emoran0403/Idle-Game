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
import { EmptyItem } from "../../../../Constants/Equipment/EmptyItem";

//@ this needs to pull from some single source of truth showing all the skills available, and their resources based on the current location from state

const SkillsPanel = (props: Types.SkillsPanelCompProps) => {
  const dispatch = useDispatch();
  // This grabs the current location from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;

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
                <h5 className="card-title">{resource}</h5>
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

  const displayToolSelectorTag = (itemsFromState: Types.AllSliceKeys, slotName: Types.IEquipmentSlotOptions, slotString: string) => {
    let compositeItems: Types.ICompositeArmorItem[] = [EmptyItem];

    let itemsFromConstants: Types.IArmorItem[] = [...Object.values(slotName.melee), ...Object.values(slotName.magic), ...Object.values(slotName.ranged)];
    // console.log(itemsFromState);
    // console.log();

    for (let i = 0; i < itemsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = itemsFromState[`playerOwns${itemsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...itemsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
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
      for (let i = 0; i < compositeItems.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositeItems[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositeItems[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositeItems[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositeItems[i].displayName;
        }
      }

      // if slot is none, we are equipping an item
      if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] === `none`) {
        props.newChatLog(`Equipped ${newlyEquippedItemDisplayName}`, `Equipment Swap`);

        // if slot is not none, and e.target.value is none, we are unequipping an item
      } else if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value === `none`) {
        props.newChatLog(`Unequipped ${oldEquippedItemDisplayName}`, `Equipment Swap`);

        //if slot is not none, and e.target.value is not none, we are swapping to a new item
      } else if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value !== `none`) {
        props.newChatLog(`Swapped to ${newlyEquippedItemDisplayName}`, `Equipment Swap`);
      }

      props.setCurrentEquipment({ ...props.currentEquipment, [e.target.name as keyof Types.ICurrentEquipment]: e.target.value });
    };

    return (
      <select onChange={(e) => itemHasBeenEquipped(e)} className="form-select" name={`${slotString}`}>
        {compositeItems.map((Item) => (
          <option value={Item.name} disabled={applyDisabledAttribute(Item)} key={`Slot-Item-${Item.name}`} className={`${handleSelectorStyle(Item)}`}>
            {Item.displayName}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          {displayToolSelectorTag()}
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
