import * as Types from "../../../../../Types";
import * as React from "react";

//! all but clues should read from a constant file - how to structure that file for each location?
//! clues should check the bank state for a clue scroll
//! based on these conditions, apply the disabled attribute to those activities that are not present in the current location

// these buttons will need to hide the activity area, and display the corresponding panel in place of the activity are
// when the back button is clicked, return to the activity area
// skills, quests, combat, and bosses read from a constant file - under location info
// bank is always enabled
// minigames read from a constant file
// clues will check the bank to see if there is a cluescroll
//@ disable bosses, minigames, and clues for now

const ActivityButtons = (props: Types.ActivityButtonsCompProps) => {
  return (
    <div className="d-flex border border-dark border-2 rounded-3">
      <button
        onClick={() => {
          props.handleUpdateDisplay(`skills`);
          // console.log("you clicked Skills");
        }}
        className="btn btn-primary flex-fill"
      >
        Skills
      </button>
      <button
        onClick={() => {
          props.handleUpdateDisplay(`quests`);
          // console.log("you clicked Quests");
        }}
        className="btn btn-primary flex-fill"
      >
        Quests
      </button>
      <button
        onClick={() => {
          props.handleUpdateDisplay(`bank`);
          // console.log("you clicked Bank");
        }}
        className="btn btn-primary flex-fill"
      >
        Bank
      </button>
      <button
        onClick={() => {
          props.handleUpdateDisplay(`combat`);
          // console.log("you clicked Combat");
        }}
        className="btn btn-primary flex-fill"
      >
        Combat
      </button>
      <button
        disabled
        onClick={() => {
          props.handleUpdateDisplay(`bosses`);
          // console.log("you clicked Bosses");
        }}
        className="btn btn-primary flex-fill"
      >
        Bosses
      </button>

      <button
        disabled
        onClick={() => {
          props.handleUpdateDisplay(`minigames`);
          // console.log("you clicked Minigames");
        }}
        className="btn btn-primary flex-fill"
      >
        Minigames
      </button>

      <button
        disabled
        onClick={() => {
          props.handleUpdateDisplay(`clues`);
          // console.log("you clicked Clues");
        }}
        className="btn btn-primary flex-fill"
      >
        Clues
      </button>
    </div>
  );
};

export default ActivityButtons;
