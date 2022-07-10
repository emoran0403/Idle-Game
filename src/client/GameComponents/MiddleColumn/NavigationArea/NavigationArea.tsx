import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import Resources from "./Resources";
import CurrentLocation from "./CurrentLocation";
import CurrentSkill from "./CurrentSkill";
import CurrentResource from "./CurrentResource";
import CurrentActivity from "./CurrentActivity";

const NavigationArea = (props: Types.NoProps) => {
  // useEffect(() => {}, []);
  return (
    <div className="d-flex border border-dark border-2 rounded-3">
      <button
        onClick={() => {
          console.log("you clicked World Map Button");
        }}
        className="btn btn-primary flex-fill"
      >
        World Map Button
      </button>
      <CurrentLocation />
      <CurrentActivity />
      <CurrentSkill />
      <CurrentResource />
      <Resources />
    </div>
  );
};

export default NavigationArea;
