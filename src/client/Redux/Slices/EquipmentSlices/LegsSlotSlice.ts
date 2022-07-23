import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const LegsSlotSlice = createSlice({
  name: "legslotslice",
  initialState: {
    //list of armor for the legs slot, describing if the player owns the item or not

    playerOwnsbronzeplatelegs: false,
    playerOwnsironplatelegs: false,
    playerOwnssteelplatelegs: false,
    playerOwnsmithrilplatelegs: false,
    playerOwnsadamantplatelegs: false,
    playerOwnsruneplatelegs: false,

    playerOwnswizardrobeskirt: false,
    playerOwnsimphiderobebottom: false,
    playerOwnsspidersilkrobebottom: false,
    playerOwnsbatwinglegs: false,
    playerOwnssplitbarklegs: false,

    playerOwnsleatherchaps: false,
    playerOwnshardleatherchaps: false,
    playerOwnsstuddedchaps: false,
    playerOwnscarapacelegs: false,
    playerOwnsgreendragonhidechaps: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsLegItem: (state: Types.ILegsSlotSlice, action) => {
      state[action.payload as keyof Types.ILegsSlotSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsLegItem } = LegsSlotSlice.actions;

export default LegsSlotSlice.reducer;
