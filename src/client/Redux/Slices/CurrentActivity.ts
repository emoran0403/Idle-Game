import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const CurrentActivity = createSlice({
  name: "currentactivity",
  initialState: {
    Current: `Idle`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setActivity: (state, action) => {
      state.Current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActivity } = CurrentActivity.actions;

export default CurrentActivity.reducer;

//! need to add a walking / traveling option / and a questing option
