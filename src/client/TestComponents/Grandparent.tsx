import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import Parent from "./Parent";
import ButtonHolder from "./ButtonHolder";
import ChangeAll from "./ChangeAll";

const Grandparent = (props: Types.NoProps) => {
  useEffect(() => {}, []);

  return (
    <div className="border border-secondary">
      <div className="text-center">This is grandparent</div>
      <div className="d-flex p-2 justify-content-center">
        <Parent />
        <ButtonHolder />
        <ChangeAll />
      </div>
    </div>
  );
};

export default Grandparent;
