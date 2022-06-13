import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const Experience = createSlice({
  name: "experience",
  initialState: {
    //list of skills, starting at 0 experience
    Woodcutting: 0,
    Firemaking: 0,
    Attack: 0,
    Strength: 0,
    Defense: 0,
    Consitution: 0,
    Prayer: 0,
  },
  reducers: {
    // this is the only reducer needed, experience can only increase
    gainXP: (state: Types.IFlatObjectOfNums, action) => {
      const skill: string = action.type; // decide which skill to gain the experience
      const experienceGained: number = Number(action.payload); // this will be the amount of experience gained

      //object[key] is how we can access an object's value by passing in a key
      state[skill] += experienceGained;
    },
  },
});

// Action creators are generated for each case reducer function
export const { gainXP } = Experience.actions;

export default Experience.reducer;

//! 2:04 timestape theory froday 6/10
