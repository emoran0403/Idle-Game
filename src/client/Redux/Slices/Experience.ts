import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

// const hydratedState = {};
// hydratedState.rawData = localStorage.getItem("persist:root");
// if (hydratedState.rawData) {
//   // debugger;
//   // hydratedState.rawData;
//   hydratedState.Experience = JSON.parse(hydratedState.rawData).Experience;
//   if (hydratedState.Experience) {
//     hydratedState.Experience = JSON.parse(hydratedState.Experience);
//   }
// }

// hydratedState.Experience ||

export const Experience = createSlice({
  name: "experience",
  initialState: {
    //list of skills, starting at 0 experience
    Attack: 0,
    Strength: 0,
    Defence: 0,
    Constitution: 1358,
    Prayer: 0,
    Summoning: 0,
    Ranged: 0,
    Magic: 0,
    Crafting: 0,
    Mining: 0,
    Smithing: 0,
    Fishing: 0,
    Cooking: 0,
    Firemaking: 0,
    Woodcutting: 0,
    Runecrafting: 0,
    Dungeoneering: 0,
    Fletching: 0,
    Agility: 0,
    Herblore: 0,
    Thieving: 0,
    Slayer: 0,
    Farming: 0,
    Construction: 0,
    Hunter: 0,
    Divination: 0,
    Invention: 0,
    Archaeology: 0,
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
