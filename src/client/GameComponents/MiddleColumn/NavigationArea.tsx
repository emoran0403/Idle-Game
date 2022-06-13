import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const NavigationArea = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="d-flex">
      <button
        onClick={() => {
          console.log("you clicked World Map Button");
        }}
        className="btn btn-info flex-fill"
      >
        World Map Button
      </button>
      <div>Current Location</div>
      <div>Current Activity</div>
    </div>
  );
};

export default NavigationArea;
