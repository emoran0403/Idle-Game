import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const ActivityButtons = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="d-flex">
      <button
        onClick={() => {
          console.log("you clicked Skills");
        }}
        className="btn btn-info flex-fill"
      >
        Skills
      </button>
      <button
        onClick={() => {
          console.log("you clicked Quests");
        }}
        className="btn btn-info flex-fill"
      >
        Quests
      </button>
      <button
        onClick={() => {
          console.log("you clicked Bank");
        }}
        className="btn btn-info flex-fill"
      >
        Bank
      </button>
      <button
        onClick={() => {
          console.log("you clicked Combat");
        }}
        className="btn btn-info flex-fill"
      >
        Combat
      </button>
      <button
        onClick={() => {
          console.log("you clicked Bosses");
        }}
        className="btn btn-info flex-fill"
      >
        Bosses
      </button>
    </div>
  );
};

export default ActivityButtons;
