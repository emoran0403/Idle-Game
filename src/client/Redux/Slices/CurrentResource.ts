import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const CurrentResource = createSlice({
  name: "currentResource",
  initialState: {
    Current: `none`,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setResource: (state, action) => {
      state.Current = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResource } = CurrentResource.actions;

export default CurrentResource.reducer;
