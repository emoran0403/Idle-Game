import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

//! this needs to pull from some single source of truth showing all the skills available, and their resources

const SkillsPanel = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="container">
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
              <img>Icon here</img>
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
