import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";

const SiblingB = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <div className="mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingB</h5>
          <div className="card-text">Button 1 count * 2 = </div>
          <div className="card-text">Button 2 count * 5 = </div>
          <div className="card-text">Button 3 count * 10 = </div>
        </div>
      </div>
    </div>
  );
};

export default SiblingB;
