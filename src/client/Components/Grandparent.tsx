import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import Parent from "./Parent";
import ButtonHolder from "./ButtonHolder";

const Grandparent = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <>
      <div>This is grandparent</div>
      <div className="d-flex p-2 justify-content-center">
        <Parent />
        <ButtonHolder />
      </div>
    </>
  );
};

export default Grandparent;
