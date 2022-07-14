import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Quests_Lumbridge = createSlice({
  name: "Quests_Lumbridge",
  initialState: {
    // refer to state as state.QuestArray
    // with an array, i can add more quests later
    LumbridgeQuestArray: [
      {
        name: "Cook's Assistant",
        stepsComplete: 10,
        stepsTotal: 20,
        complete: false,
      },
      {
        name: "Myths of the White Lands",
        stepsComplete: 0,
        stepsTotal: 113,
        complete: false,
      },
      {
        name: "The Restless Ghost",
        stepsComplete: 14,
        stepsTotal: 14,
        complete: true,
      },
      {
        name: "The Lost Tribe",
        stepsComplete: 0,
        stepsTotal: 33,
        complete: false,
      },
      {
        name: "The Blood Pact",
        stepsComplete: 0,
        stepsTotal: 17,
        complete: false,
      },
      {
        name: "Buyers and Cellars",
        stepsComplete: 0,
        stepsTotal: 15,
        complete: false,
      },
      {
        name: "Lost City",
        stepsComplete: 0,
        stepsTotal: 26,
        complete: false,
      },
    ],
  },
  reducers: {
    doQuestLogicLumbridge: (state, action) => {
      const questNameFromAction: string = action.payload; // decide which quest needs incrementing
      // go through all the quests...
      for (let i = 1; i < state.LumbridgeQuestArray.length; i++) {
        let questOfInterest = state.LumbridgeQuestArray[i]; // rename it for better context
        // ...until we find the quest name that matches the quest name from the action
        if (questOfInterest.name === questNameFromAction) {
          // increment the steps counter
          questOfInterest.stepsComplete += 1;
          // check if the newly incremented counter equals the total
          if (questOfInterest.stepsComplete === questOfInterest.stepsTotal) {
            // if they equal, set the quest as complete
            questOfInterest.complete = true;
          }
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { doQuestLogicLumbridge } = Quests_Lumbridge.actions;

export default Quests_Lumbridge.reducer;
