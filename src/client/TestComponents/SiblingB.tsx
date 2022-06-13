import * as Types from "../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";

const SiblingB = (props: Types.NoProps) => {
  const BHCount = useSelector((state) => state) as Types.ButtonSlice;

  return (
    <div className="mx-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">This is SiblingB</h5>
          {/* <div className="card-text">Button Holder count * 2 = {Number(BHCount.buttons1.value) * 2}</div> */}

          <div className="card-text">Button 1 count * 2 = {Number(BHCount.buttons1?.value) * 2}</div>
          <div className="card-text">Button 2 count * 5 = {Number(BHCount.buttons2?.value) * 5}</div>
          <div className="card-text">Button 3 count * 10 = {Number(BHCount.buttons3?.value) * 10}</div>
        </div>
      </div>
    </div>
  );
};

export default SiblingB;
