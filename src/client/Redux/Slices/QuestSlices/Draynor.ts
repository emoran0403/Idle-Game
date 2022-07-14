import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Quests_Draynor = createSlice({
  name: "Quests_Draynor",
  initialState: {
    // refer to state as state.QuestArray
    // with an array, i can add more quests later
    DraynorQuestArray: [
      {
        name: "A Fairy Tale I - Growing Pains",
        stepsComplete: 0,
        stepsTotal: 35,
        complete: false,
      },
      {
        name: "A Fairy Tale II - Cure a Queen",
        stepsComplete: 0,
        stepsTotal: 36,
        complete: false,
      },
      {
        name: "Vampyre Slayer",
        stepsComplete: 0,
        stepsTotal: 23,
        complete: false,
      },
      {
        name: "Ernest the Chicken",
        stepsComplete: 0,
        stepsTotal: 40,
        complete: false,
      },
      {
        name: "Animal Magnetism",
        stepsComplete: 0,
        stepsTotal: 52,
        complete: false,
      },
      {
        name: "Love Story",
        stepsComplete: 0,
        stepsTotal: 44,
        complete: false,
      },
      {
        name: "Swept Away",
        stepsComplete: 0,
        stepsTotal: 30,
        complete: false,
      },
      {
        name: "Missing My Mummy",
        stepsComplete: 0,
        stepsTotal: 45,
        complete: false,
      },
      {
        name: "Stolen Hearts",
        stepsComplete: 0,
        stepsTotal: 29,
        complete: false,
      },
    ],
  },
  reducers: {
    doQuestLogicDraynor: (state, action) => {
      // decide which quest needs incrementing
      const questNameFromAction: string = action.payload;
      // go through all the quests...
      for (let i = 0; i < state.DraynorQuestArray.length; i++) {
        let questOfInterest = state.DraynorQuestArray[i]; // rename it for better context
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
export const { doQuestLogicDraynor } = Quests_Draynor.actions;

export default Quests_Draynor.reducer;
