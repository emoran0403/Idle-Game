import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const BackSlotSlice = createSlice({
  name: "backslotslice",
  initialState: {
    //list of armor for the back slot, describing if the player owns the item or not

    playerOwnsbladestormdrape: false,
    playerOwnsspellstormdrape: false,
    playerOwnsarrowstormdrape: false,
    playerOwnspathfindercape: false,
    playerOwnsteamcape: false,
    playerOwnsobsidiancape: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsItem: (state: Types.IBackSlotSlice, action) => {
      state[action.payload] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsItem } = BackSlotSlice.actions;

export default BackSlotSlice.reducer;
