import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AllLocations } from "../../../../Constants/LocationInfo";

//! this needs to pull from some single source of truth showing all the skills available, and their resources based on the current location from state

const SkillsPanel = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  // state.Lumbridge;

  console.log(`state is next `);

  console.log(state);

  //! i need to iterate through state locations, and return that key as a string.
  //! then i need to use that string to pull from AllLocations

  const wow = [...Object.entries(state)].flat();
  console.log(`entries: ${wow}`);

  const wow2 = [...Object.keys(state)].flat();
  console.log(`keys: ${wow2}`);

  const wow3 = [...Object.values(state)].flat();
  console.log(`values: ${wow3}`);

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
        <div className="col-lg-3 justify-content-lg-center">
          {/* Each of these cards need to come from the skills available at the current location */}
          <div className="card">
            <div className="card-body">
              {/* <img>Icon here</img> */}
              <h5 className="card-title">Skill Name here</h5>
              <p className="card-text">Show the skill level here</p>
            </div>
          </div>
          {/* End of card */}
        </div>
        <div className="col-lg-9 justify-content-lg-center"></div>
      </div>
    </div>
  );
};

export default SkillsPanel;
