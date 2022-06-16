import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Quests_Lumbridge = createSlice({
  name: "Quests_Lumbridge",
  initialState: {
    //list of items in the bank, starting at 0
    // refer to state as state.QuestArray
    // with an array, i can add more quests later
    QuestArray: [
      {
        name: "Cook's Assistant",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "Myths of the White Lands",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "The Restless Ghost",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "The Blood Pact",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "Buyers and Cellars",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
    ],
  },
  reducers: {
    // use this when we need to increment a quest steps count
    // incrementQuestStep: (state, action) => {
    //   const questNameFromAction: string = action.type; // decide which quest needs incrementing
    //   // go through all the quests...
    //   for (let i = 1; i < state.QuestArray.length; i++) {
    //     let currentQuest = state.QuestArray[i]; // rename it for better context
    //     // ...until we find the quest name that matches the quest name from the action
    //     if (currentQuest.name === questNameFromAction) {
    //       // increment the steps counter
    //       currentQuest.stepsComplete += 1;
    //     }
    //   }
    // },

    // markQuestAsComplete: (state, action) => {
    //   const questNameFromAction: string = action.type; // decide which quest needs to be marked as complete
    //   // go through all the quests...
    //   for (let i = 1; i < state.QuestArray.length; i++) {
    //     let currentQuest = state.QuestArray[i]; // rename it for better context
    //     // ...until we find the quest name that matches the quest name from the action
    //     if (currentQuest.name === questNameFromAction) {
    //       // mark the quest as complete
    //       currentQuest.complete = true;
    //     }
    //   }
    // },

    //! can i do this instead of making 2 separate reducers?
    incrementQuestStepAndCheckIfCompleted: (state, action) => {
      const questNameFromAction: string = action.type; // decide which quest needs incrementing
      // go through all the quests...
      for (let i = 1; i < state.QuestArray.length; i++) {
        let currentQuest = state.QuestArray[i]; // rename it for better context
        // ...until we find the quest name that matches the quest name from the action
        if (currentQuest.name === questNameFromAction) {
          // increment the steps counter
          currentQuest.stepsComplete += 1;
          // check if the newly incremented counter equals the total
          if (currentQuest.stepsComplete === currentQuest.stepsTotal) {
            // if they equal, set the quest as complete
            currentQuest.complete = true;
          }
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementQuestStepAndCheckIfCompleted } = Quests_Lumbridge.actions;

export default Quests_Lumbridge.reducer;
