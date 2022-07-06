import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const NeckSlotSlice = createSlice({
  name: "neckslotslice",
  initialState: {
    //list of armor for the head slot, describing if the player owns the item or not

    playerOwnsamuletofstrength: false,
    playerOwnsamuletofmagic: false,
    playerOwnsamuletofaccuracy: false,
    playerOwnsholysymbol: false,
    playerOwnsamuletofdefence: false,
    playerOwnsamuletofpower: false,
    playerOwnsamuletofglory: false,
    playerOwnsamuletoffury: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsItem: (state: Types.INeckSlotSlice, action) => {
      state[action.payload] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsItem } = NeckSlotSlice.actions;

export default NeckSlotSlice.reducer;
