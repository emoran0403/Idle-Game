import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AllLocations } from "../../../../Constants/LocationInfo";

//! this needs to pull from some single source of truth showing all the skills available, and their resources based on the current location from state

const SkillsPanel = (props: Types.NoProps) => {
  const { Current } = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  //Location is a string denoting the players current location

  const wow = AllLocations[Current] as Types.ILocationSummary;
  console.log(wow);

  useEffect(() => {}, []);

  return (
    <div className="container card border border-dark border-2 rounded-3">
      <div className="row justify-content-lg-center">
        <div className="col-lg-3 justify-content-lg-center">
          <button className="btn btn-primary" onClick={() => {}}>
            Back
          </button>
        </div>
        <div className="col-lg-9 justify-content-lg-center">Skills</div>
      </div>
      <div className="row justify-content-lg-center">
        <div>
          {/* Each of these cards need to come from the skills available at the current location */}
          {(Object.keys(wow.Skills) as unknown as Types.ListOfSkills[]).map((skill) => (
            <div className="card">
              <div className="card-body">
                {/* <img>Icon here</img> */}
                <h5 className="card-title">
                  <span>{skill}</span>
                  {/* @ts-ignore */}
                  {wow.Skills[skill].map((str: Types.ListOfSkills) => (
                    <button className="border border-dark border-1 rounded-3">{str}</button>
                  ))}
                </h5>
                {/* <p className="card-text">Show the skill level here</p> */}
              </div>
            </div>
          ))}
          {/* End of card */}
        </div>
        <div className="col-lg-9 justify-content-lg-center"></div>
      </div>
    </div>
  );
};

export default SkillsPanel;
