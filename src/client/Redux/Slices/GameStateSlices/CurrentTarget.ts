import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const Target = createSlice({
  name: "currentTarget",
  initialState: {
    CurrentTarget: `none`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setTarget: (state, action) => {
      state.CurrentTarget = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTarget } = Target.actions;

export default Target.reducer;
