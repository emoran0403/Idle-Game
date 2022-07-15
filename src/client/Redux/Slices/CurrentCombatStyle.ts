import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const CombatStyle = createSlice({
  name: "currentcombatstyle",
  initialState: {
    CurrentStyle: `none`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setStyle: (state, action) => {
      state.CurrentStyle = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStyle } = CombatStyle.actions;

export default CombatStyle.reducer;
