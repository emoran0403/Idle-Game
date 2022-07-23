import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const HeadSlotSlice = createSlice({
  name: "headslotslice",
  initialState: {
    //list of armor for the head slot, describing if the player owns the item or not

    playerOwnsbronzefullhelm: false,
    playerOwnsironfullhelm: false,
    playerOwnssteelfullhelm: false,
    playerOwnsmithrilfullhelm: false,
    playerOwnsadamantfullhelm: false,
    playerOwnsrunefullhelm: false,

    playerOwnswizardhat: false,
    playerOwnsimphidehood: true,
    playerOwnsspidersilkhood: true,
    playerOwnsbatwinghood: true,
    playerOwnssplitbarkhelm: true,

    playerOwnsleathercowl: true,
    playerOwnshardleathercowl: false,
    playerOwnsstuddedleathercoif: false,
    playerOwnscarapacehelm: false,
    playerOwnsgreendragonhidecoif: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsHeadItem: (state: Types.IHeadSlotSlice, action) => {
      state[action.payload as keyof Types.IHeadSlotSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsHeadItem } = HeadSlotSlice.actions;

export default HeadSlotSlice.reducer;
