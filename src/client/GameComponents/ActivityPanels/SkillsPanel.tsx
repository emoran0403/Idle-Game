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

//@ this needs to pull from some single source of truth showing all the skills available, and their resources based on the current location from state
//! how can i conditionall set the background color for each of the skilling options based on the player's current level?

const SkillsPanel = (props: Types.ActivitiesProps) => {
  const dispatch = useDispatch();
  // This grabs the current location from state
  const { Current } = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  // This chooses the current location summary from AllLocations
  const currentLocationSummary = AllLocations[Current] as Types.ILocationSummary;

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
        <div className="col-lg-9 justify-content-lg-center">Skills</div>
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
                dispatch(setResource(resource));
                dispatch(setSkill(`Woodcutting`));
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
                dispatch(setResource(resource));
                dispatch(setSkill(`Fishing`));
              }}
              key={`resource-list-${resource}`}
              className={`btn border mb-3 ${
                FishingLevel >= ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing ? `bg-success` : `bg-danger`
              }`}
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

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
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
