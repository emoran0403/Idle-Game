import * as Types from "../../../../../Types";
import * as React from "react";

//@ once implemented, clues should check the bank state for a clue scroll

// these buttons will need to hide the activity area, and display the corresponding panel in place of the activity area
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
          props.handleUpdateDisplay(`combat`);
          // console.log("you clicked Combat");
        }}
        className="btn btn-primary flex-fill"
      >
        Combat
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
          props.handleUpdateDisplay(`shop`);
          // console.log("you clicked Bank");
        }}
        className="btn btn-primary flex-fill"
      >
        Shop
      </button>

      <button
        onClick={() => {
          console.log("you clicked World Map Button");
          props.handleUpdateDisplay(`map`);

          // console.log(CurrentLocation);
          // if (`More Locations coming soon(tm)!` === props.chatLogArray[props.chatLogArray.length - 1].message) {
          //   return;
          // }
          // props.newChatLog(`More Locations coming soon(tm)!`, `Nonfilterable`);
        }}
        className="btn btn-primary flex-fill"
      >
        World Map
        <img src="/Assets/World_map_icon.png" />
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
