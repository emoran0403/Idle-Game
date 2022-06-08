import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";

const SiblingA = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingA</h5>
          <div className="card-text">Show some XP here</div>
          <div className="card-text">Show some XP here</div>
        </div>
      </div>
    </>
  );
};

export default SiblingA;
