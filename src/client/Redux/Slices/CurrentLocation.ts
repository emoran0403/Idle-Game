import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

// this allows us to assert the type of state as a specific set of strings, as opposed to any general string
// const Current: Types.ICurrentLocation[`Current`] = `Lumbridge`;

export const Location = createSlice({
  name: "currentLocation",
  initialState: {
    //list of locations, with a boolean describing the players location,
    CurrentLocation: `Lumbridge`,
  },
  reducers: {
    // this is the only reducer needed as the player can only be in 1 place at a time
    setLocation: (state, action) => {
      state.CurrentLocation = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation } = Location.actions;

export default Location.reducer;

//! I think i want to change this to just be {Location: 'location string here'}
