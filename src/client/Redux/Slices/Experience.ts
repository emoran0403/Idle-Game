import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

const resetState = {
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
};

export const Experience = createSlice({
  name: "experience",
  initialState: { ...resetState },
  reducers: {
    // this is the only reducer needed, experience can only increase
    gainXP: (state: Types.IFlatObjectOfNums, action) => {
      const skill: string = action.payload.skill; // decide which skill to gain the experience
      const experienceGained: number = Number(action.payload.xp); // this will be the amount of experience gained

      state[skill] += experienceGained;
    },

    resetXP: (state) => {
      state.Attack = 0;
      state.Strength = 0;
      state.Defence = 0;
      state.Constitution = 1358;
      state.Prayer = 0;
      state.Summoning = 0;
      state.Ranged = 0;
      state.Magic = 0;
      state.Crafting = 0;
      state.Mining = 0;
      state.Smithing = 0;
      state.Fishing = 0;
      state.Cooking = 0;
      state.Firemaking = 0;
      state.Woodcutting = 0;
      state.Runecrafting = 0;
      state.Dungeoneering = 0;
      state.Fletching = 0;
      state.Agility = 0;
      state.Herblore = 0;
      state.Thieving = 0;
      state.Slayer = 0;
      state.Farming = 0;
      state.Construction = 0;
      state.Hunter = 0;
      state.Divination = 0;
      state.Invention = 0;
      state.Archaeology = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { gainXP, resetXP } = Experience.actions;

export default Experience.reducer;
