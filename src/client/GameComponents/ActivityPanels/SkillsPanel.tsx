import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";
import { AllLocations } from "../../../../Constants/LocationInfo";
import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { getLevel } from "../../../../Constants/XP Levels";
import { ListOfFish } from "../../../../Constants/Items/Fish";

//@ this needs to pull from some single source of truth showing all the skills available, and their resources based on the current location from state
//! how can i conditionall set the background color for each of the skilling options based on the player's current level?

const SkillsPanel = (props: Types.ActivitiesProps) => {
  // This grabs the current location from state
  const { Current } = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  // This chooses the current location summary from AllLocations
  const currentLocationSummary = AllLocations[Current] as Types.ILocationSummary;

  // gets the player's experience
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  let WoodcuttingLevel: number = getLevel(Experience.Woodcutting);
  let FishingLevel: number = getLevel(Experience.Fishing);

  const panelHeaderJSX = () => {
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
      <div className="card-title border border-dark border-1 rounded-3">
        <div className="text-center">Woodcutting Level {WoodcuttingLevel}</div>
        <div className="d-flex flex-row">
          {resourceArray.map((resource) => (
            <div key={`resource-list-${resource}`} className="card border mb-3">
              <div className="card-body text">
                <h5 className="card-title">{resource}</h5>
                <div className="card-text">
                  <div>Level {ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting}</div>
                  <div>{ListOfLogs[resource as keyof Types.IListOfLogs].XPGivenWoodcutting} XP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FishingOptions = (resourceArray: string[]) => {
    return (
      <div className="card-title border border-dark border-1 rounded-3">
        <div className="text-center">Fishing Level {FishingLevel}</div>
        <div className="d-flex flex-row">
          {resourceArray.map((resource) => (
            <div key={`resource-list-${resource}`} className="card border mb-3">
              <div className="card-body text">
                <h5 className="card-title">{resource}</h5>
                <div className="card-text">
                  <div>Level {ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing}</div>
                  <div>{ListOfFish[resource as keyof Types.IListOfFish].XPGivenFishing} XP</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div>
          <div className="card">
            <div className="card-body">
              {WoodcuttingOptions(currentLocationSummary.Skills.Woodcutting)}
              <div className="card-title border border-dark border-1 rounded-3">
                <div className="text-center">Mining</div>
                <div>{/* functiongoeshere */}</div>
              </div>
              {FishingOptions(currentLocationSummary.Skills.Fishing)}
            </div>
          </div>
        </div>
        <div className="col-lg-9 justify-content-lg-center"></div>
      </div>
    </div>
  );
};

export default SkillsPanel;
