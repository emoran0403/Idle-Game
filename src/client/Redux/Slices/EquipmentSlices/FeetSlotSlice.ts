import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const FeetSlotSlice = createSlice({
  name: "feetslotslice",
  initialState: {
    //list of armor for the feet slot, describing if the player owns the item or not

    playerOwnsbronzearmouredboots: false,
    playerOwnsironarmouredboots: false,
    playerOwnssteelarmouredboots: false,
    playerOwnsmithrilarmouredboots: false,
    playerOwnsadamantarmouredboots: false,
    playerOwnsrunearmouredboots: false,

    playerOwnswizardboots: false,
    playerOwnsimphideboots: false,
    playerOwnsspidersilkboots: false,
    playerOwnsbatwingboots: false,
    playerOwnssplitbarkboots: false,

    playerOwnsleatherboots: false,
    playerOwnshardleatherboots: false,
    playerOwnsstuddedleatherboots: false,
    playerOwnscarapaceboots: false,
    playerOwnsgreendragonhideboots: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsItem: (state: Types.IFeetSlotSlice, action) => {
      state[action.payload] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsItem } = FeetSlotSlice.actions;

export default FeetSlotSlice.reducer;
