import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const SiblingA = (props: Types.NoProps) => {
  const BHCount = useSelector((state) => state) as Types.ButtonSlice;

  // console.log(BHCount.buttons.value);

  return (
    <div className="mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingA</h5>
          <div className="card-text">Button Holder count = {BHCount.buttons.value}</div>
          {/* 
          <div className="card-text">Button 1 count = </div>
          <div className="card-text">Button 2 count = </div>
          <div className="card-text">Button 3 count = </div> */}
        </div>
      </div>
    </div>
  );
};

export default SiblingA;
