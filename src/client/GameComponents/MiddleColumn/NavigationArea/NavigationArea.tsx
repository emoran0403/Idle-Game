import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import Resources from "./Resources";
import CurrentLocation from "./CurrentLocation";
import CurrentSkill from "./CurrentSkill";
import CurrentResource from "./CurrentResource";
import CurrentActivity from "./CurrentActivity";

const NavigationArea = (props: Types.NavigationAreaCompProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentLocation.Current as Types.ICurrentLocationOptions);
  // useEffect(() => {}, []);
  return (
    <div className="d-flex border border-dark border-2 rounded-3">
      <button
        onClick={() => {
          console.log("you clicked World Map Button");
          console.log(state);
          if (`More Locations coming soon(tm)!` === props.chatLogArray[props.chatLogArray.length - 1].message) {
            return;
          }
          props.newChatLog(`More Locations coming soon(tm)!`, `Nonfilterable`);
        }}
        className="btn btn-primary flex-fill"
      >
        World Map
      </button>
      <CurrentLocation />
      <CurrentActivity />
      <CurrentSkill />
      <CurrentResource />
      <Resources newChatLog={props.newChatLog} />
    </div>
  );
};

export default NavigationArea;
