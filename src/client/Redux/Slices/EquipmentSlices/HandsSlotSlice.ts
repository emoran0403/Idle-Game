import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const HandSlotSlice = createSlice({
  name: "handslotslice",
  initialState: {
    //list of armor for the hand slot, describing if the player owns the item or not

    playerOwnsbronzegauntlets: false,
    playerOwnsirongauntlets: false,
    playerOwnssteelgauntlets: false,
    playerOwnsmithrilgauntlets: false,
    playerOwnsadamantgauntlets: false,
    playerOwnsrunegauntlets: false,

    playerOwnswizardgloves: false,
    playerOwnsimphidegloves: false,
    playerOwnsspidersilkgloves: false,
    playerOwnsbatwinggloves: false,
    playerOwnssplitbarkgauntlets: false,

    playerOwnsleathervambraces: false,
    playerOwnshardleathergloves: false,
    playerOwnsstuddedleathergloves: false,
    playerOwnscarapacegloves: false,
    playerOwnsgreendragonhidevambraces: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsItem: (state: Types.IHandSlotSlice, action) => {
      state[action.payload as keyof Types.IHandSlotSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsItem } = HandSlotSlice.actions;

export default HandSlotSlice.reducer;
