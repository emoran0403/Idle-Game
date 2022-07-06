import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const RingSlotSlice = createSlice({
  name: "ringslotslice",
  initialState: {
    //list of armor for the back slot, describing if the player owns the item or not

    warriorring: false,
    seersring: false,
    archerring: false,
    ringofpotency: false,
    ringofwealth: false,
    berserkerring: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsItem: (state: Types.IRingSlotSlice, action) => {
      state[action.payload] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsItem } = RingSlotSlice.actions;

export default RingSlotSlice.reducer;
