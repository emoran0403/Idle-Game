import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Resources from "./Resources";
import CurrentLocationComp from "./CurrentLocationComp";
import CurrentSkillComp from "./CurrentSkillComp";
import CurrentResourceComp from "./CurrentResourceComp";
import CurrentActivityComp from "./CurrentActivityComp";

const NavigationArea = (props: Types.NavigationAreaCompProps) => {
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location as Types.ICurrentLocation);
  // useEffect(() => {}, []);

  return (
    <div className="d-flex justify-content-evenly border border-dark border-2 rounded-3" style={{ height: "100px" }}>
      <button
        onClick={() => {
          console.log("you clicked World Map Button");
          console.log(CurrentLocation);
          if (`More Locations coming soon(tm)!` === props.chatLogArray[props.chatLogArray.length - 1].message) {
            return;
          }
          props.newChatLog(`More Locations coming soon(tm)!`, `Nonfilterable`);
        }}
        className="btn btn-primary flex-fill"
        style={{ width: `130px` }}
      >
        World Map
        <img src="/Assets/World_map_icon.png" />
      </button>
      <CurrentLocationComp />
      <CurrentActivityComp />
      <CurrentSkillComp />
      <CurrentResourceComp />
      <Resources newChatLog={props.newChatLog} />
    </div>
  );
};

export default NavigationArea;
