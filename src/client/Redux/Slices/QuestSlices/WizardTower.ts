import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Quests_WizardTower = createSlice({
  name: "Quests_WizardTower",
  initialState: {
    // refer to state as state.QuestArray
    // with an array, i can add more quests later
    WizardTowerQuestArray: [
      {
        name: "Rune Mysteries",
        stepsComplete: 0,
        stepsTotal: 39,
        complete: false,
      },
      {
        name: "Rune Memories",
        stepsComplete: 0,
        stepsTotal: 49,
        complete: false,
      },
      {
        name: "Heart of Stone",
        stepsComplete: 0,
        stepsTotal: 49,
        complete: false,
      },
      {
        name: "Beneath Cursed Tides",
        stepsComplete: 0,
        stepsTotal: 60,
        complete: false,
      },
    ],
  },
  reducers: {
    doQuestLogicWizardTower: (state, action) => {
      // decide which quest needs incrementing
      const questNameFromAction: string = action.payload;
      // go through all the quests...
      for (let i = 0; i < state.WizardTowerQuestArray.length; i++) {
        let questOfInterest = state.WizardTowerQuestArray[i]; // rename it for better context
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
export const { doQuestLogicWizardTower } = Quests_WizardTower.actions;

export default Quests_WizardTower.reducer;
