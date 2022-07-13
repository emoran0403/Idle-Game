import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const Quest = createSlice({
  name: "currentQuest",
  initialState: {
    currentQuest: `none`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setQuest: (state, action) => {
      state.currentQuest = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setQuest } = Quest.actions;

export default Quest.reducer;
