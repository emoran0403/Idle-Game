import * as Types from "../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";

const SiblingA = (props: Types.NoProps) => {
  const state = useSelector((state) => state) as Types.ButtonSlice;

  return (
    <div className="mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingA</h5>
          {/* <div className="card-text">Button Holder count = {BHCount.buttons1.value}</div> */}

          <div className="card-text">Button 1 count = {state.buttons1?.value}</div>
          <div className="card-text">Button 2 count = {state.buttons2?.value}</div>
          <div className="card-text">Button 3 count = {state.buttons3?.value}</div>
        </div>
      </div>
    </div>
  );
};

export default SiblingA;
