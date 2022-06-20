import * as Types from "../../../../Types";
import * as React from "react";

//! all but clues should read from a constant file - how to structure that file for each location?
//! clues should check the bank state for a clue scroll
//! based on these conditions, apply the disabled attribute to those activities that are not present in the current location

// these buttons will need to hide the activity area, and display the corresponding panel in place of the activity are
// when the back button is clicked, return to the activity area

const ActivityButtons = (props: Types.NoProps) => {
  return (
    <div className="d-flex border border-dark border-2 rounded-3">
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
        disabled
        onClick={() => {
          console.log("you clicked Bosses");
        }}
        className="btn btn-info flex-fill"
      >
        Bosses
      </button>

      <button
        disabled
        onClick={() => {
          console.log("you clicked Minigames");
        }}
        className="btn btn-info flex-fill"
      >
        Minigames
      </button>

      <button
        disabled
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
