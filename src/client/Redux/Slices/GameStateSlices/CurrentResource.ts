import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const Resource = createSlice({
  name: "currentResource",
  initialState: {
    CurrentResource: `none`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setResource: (state, action) => {
      state.CurrentResource = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResource } = Resource.actions;

export default Resource.reducer;
