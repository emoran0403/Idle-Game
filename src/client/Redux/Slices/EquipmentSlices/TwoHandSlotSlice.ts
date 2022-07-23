import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const TwoHandSlotSlice = createSlice({
  name: "twohandslotslice",
  initialState: {
    //list of armor for the back slot, describing if the player owns the item or not

    playerOwnsbronze2hsword: true,
    playerOwnsiron2hsword: true,
    playerOwnssteel2hsword: true,
    playerOwnsmithril2hsword: true,
    playerOwnsadamant2hsword: true,
    playerOwnsrune2hsword: true,

    playerOwnsstaffofair: false,
    playerOwnsstaffofwater: false,
    playerOwnsstaffofearth: true,
    playerOwnsstaffoffire: false,
    playerOwnsairbattlestaff: false,
    playerOwnswaterbattlestaff: false,
    playerOwnsearthbattlestaff: true,
    playerOwnsfirebattlestaff: false,
    playerOwnsmysticairstaff: false,
    playerOwnsmysticwaterstaff: false,
    playerOwnsmysticearthstaff: true,
    playerOwnsmysticfirestaff: false,

    playerOwnsshortbow: true,
    playerOwnsoakshortbow: true,
    playerOwnswillowshortbow: false,
    playerOwnsmapleshortbow: false,
    playerOwnsyewshortbow: true,
    playerOwnsmagicshortbow: true,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsTwoHandItem: (state: Types.ITwoHandSlotSlice, action) => {
      state[action.payload as keyof Types.ITwoHandSlotSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsTwoHandItem } = TwoHandSlotSlice.actions;

export default TwoHandSlotSlice.reducer;
