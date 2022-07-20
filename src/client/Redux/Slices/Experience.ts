import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const Experience = createSlice({
  name: "experience",
  initialState: {
    //list of skills, starting at 0 experience
    Woodcutting: 9000000,
    Firemaking: 90,
    Fishing: 20000000,
    Attack: 13000000,
    Strength: 13000000,
    Defence: 0,
    Constitution: 1358,
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
      const skill: string = action.payload.skill; // decide which skill to gain the experience
      const experienceGained: number = Number(action.payload.xp); // this will be the amount of experience gained

      state[skill] += experienceGained;
    },
  },
});

// Action creators are generated for each case reducer function
export const { gainXP } = Experience.actions;

export default Experience.reducer;

//! 2:04 timestape theory froday 6/10
