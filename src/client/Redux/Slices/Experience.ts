import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const Experience = createSlice({
  name: "experience",
  initialState: {
    //list of skills, starting at 0 experience
    Woodcutting: 5000,
    Firemaking: 90,
    Fishing: 0,
    Attack: 0,
    Strength: 0,
    Defence: 500,
    Consitution: 1358,
    Prayer: 0,
    Summoning: 0,
    Ranged: 0,
    Magic: 0,
    Cooking: 0,
    Mining: 0,
    Thieving: 0,
    Crafting: 0,
  },
  reducers: {
    // this is the only reducer needed, experience can only increase
    gainXP: (state: Types.IFlatObjectOfNums, action) => {
      console.log({ state });
      console.log({ action });
      const skill: string = action.payload.skill; // decide which skill to gain the experience
      const experienceGained: number = Number(action.payload.xp); // this will be the amount of experience gained

      //object[key] is how we can access an object's value by passing in a key
      state[skill] += experienceGained;
    },
  },
});

// Action creators are generated for each case reducer function
export const { gainXP } = Experience.actions;

export default Experience.reducer;

//! 2:04 timestape theory froday 6/10
