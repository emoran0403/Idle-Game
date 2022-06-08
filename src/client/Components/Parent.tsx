import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import SiblingA from "./SiblingA";
import SiblingB from "./SiblingB";

const Parent = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div>This is Parent</div>

      <div className="d-flex p-2 justify-content-around">
        <SiblingA />
        <SiblingB />
      </div>
    </>
  );
};

export default Parent;
