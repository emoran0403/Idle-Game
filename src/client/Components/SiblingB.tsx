import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";

const SiblingB = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingB</h5>
          <div className="card-text">Show levels here</div>
          <div className="card-text">Show levels here</div>
        </div>
      </div>
    </>
  );
};

export default SiblingB;
