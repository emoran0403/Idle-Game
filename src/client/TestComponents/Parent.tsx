import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import SiblingA from "./SiblingA";
import SiblingB from "./SiblingB";

const Parent = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <div className="border border-secondary mx-2">
      <div className="text-center">This is Parent</div>

      <div className="d-flex p-2 mx-2 justify-content-around">
        <SiblingA />
        <SiblingB />
      </div>
    </div>
  );
};

export default Parent;
