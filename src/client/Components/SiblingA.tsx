import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";

const SiblingA = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <div className="mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingA</h5>
          <div className="card-text">Button 1 count = </div>
          <div className="card-text">Button 2 count = </div>
          <div className="card-text">Button 3 count = </div>
        </div>
      </div>
    </div>
  );
};

export default SiblingA;
