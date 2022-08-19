import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const Activity = createSlice({
  name: "currentactivity",
  initialState: {
    CurrentActivity: `Idle`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setActivity: (state, action) => {
      state.CurrentActivity = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActivity } = Activity.actions;

export default Activity.reducer;
