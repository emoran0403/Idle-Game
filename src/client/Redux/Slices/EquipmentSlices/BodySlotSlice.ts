import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const BodySlotSlice = createSlice({
  name: "bodyslotslice",
  initialState: {
    //list of armor for the body slot, describing if the player owns the item or not

    playerOwnsbronzeplatebody: true,
    playerOwnsironplatebody: true,
    playerOwnssteelplatebody: true,
    playerOwnsmithrilplatebody: true,
    playerOwnsadamantplatebody: false,
    playerOwnsruneplatebody: false,

    playerOwnswizardrobetop: false,
    playerOwnsimphiderobetop: false,
    playerOwnsspidersilkrobetop: false,
    playerOwnsbatwingtorso: false,
    playerOwnssplitbarkbody: false,

    playerOwnsleatherbody: false,
    playerOwnshardleatherbody: false,
    playerOwnsstuddedbody: false,
    playerOwnscarapacetorso: false,
    playerOwnsgreendragonhidebody: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsBodyItem: (state: Types.IBodySlotSlice, action) => {
      state[action.payload as keyof Types.IBodySlotSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsBodyItem } = BodySlotSlice.actions;

export default BodySlotSlice.reducer;
