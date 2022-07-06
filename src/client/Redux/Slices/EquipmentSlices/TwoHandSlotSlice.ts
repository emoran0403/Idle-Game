import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const TwoHandSlotSlice = createSlice({
  name: "twohandslotslice",
  initialState: {
    //list of armor for the back slot, describing if the player owns the item or not

    bronze2hsword: false,
    iron2hsword: false,
    steel2hsword: false,
    mithril2hsword: false,
    adamant2hsword: false,
    rune2hsword: false,

    staffofair: false,
    staffofwater: false,
    staffofearth: false,
    staffoffire: false,
    airbattlestaff: false,
    waterbattlestaff: false,
    earthbattlestaff: false,
    firebattlestaff: false,
    mysticairstaff: false,
    mysticwaterstaff: false,
    mysticearthstaff: false,
    mysticfirestaff: false,

    shortbow: false,
    oakshortbow: false,
    willowshortbow: false,
    mapleshortbow: false,
    yewshortbow: false,
    magicshortbow: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsItem: (state: Types.ITwoHandSlotSlice, action) => {
      state[action.payload] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsItem } = TwoHandSlotSlice.actions;

export default TwoHandSlotSlice.reducer;
