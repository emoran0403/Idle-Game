import * as Types from "../../../../Types";
import * as React from "react";

const ActivityButtons = (props: Types.NoProps) => {
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

      <button
        onClick={() => {
          console.log("you clicked Minigames");
        }}
        className="btn btn-info flex-fill"
      >
        Minigames
      </button>

      <button
        onClick={() => {
          console.log("you clicked Clues");
        }}
        className="btn btn-info flex-fill"
      >
        Clues
      </button>
    </div>
  );
};

export default ActivityButtons;

//! these buttons will need to hide the activity area, and display the corresponding panel in place of the activity are
