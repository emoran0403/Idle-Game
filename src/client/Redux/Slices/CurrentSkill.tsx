import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const CurrentSkill = createSlice({
  name: "currentSkill",
  initialState: {
    Current: `Woodcutting`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setSkill: (state, action) => {
      state.Current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSkill } = CurrentSkill.actions;

export default CurrentSkill.reducer;

//! need to add a walking / traveling option
