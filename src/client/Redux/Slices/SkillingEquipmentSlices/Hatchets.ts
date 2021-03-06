import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const Hatchets = createSlice({
  name: "hatchets",
  initialState: {
    //list of hatchets, describing if the player owns the item or not

    playerOwnsbronzehatchet: true,
    playerOwnsironhatchet: false,
    playerOwnssteelhatchet: false,
    playerOwnsmithrilhatchet: false,
    playerOwnsadamanthatchet: false,
    playerOwnsrunehatchet: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire armor, not sell them
    playerNowOwnsHatchetItem: (state: Types.IHatchetsSlice, action) => {
      state[action.payload as keyof Types.IHatchetsSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsHatchetItem } = Hatchets.actions;

export default Hatchets.reducer;
