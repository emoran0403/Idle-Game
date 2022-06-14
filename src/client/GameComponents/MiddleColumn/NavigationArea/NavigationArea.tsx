import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import Resources from "./Resources";
import CurrentLocation from "./CurrentLocation";
import CurrentActivity from "./CurrentActivity";

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
      <CurrentLocation />
      <CurrentActivity />
      <Resources />
    </div>
  );
};

export default NavigationArea;
