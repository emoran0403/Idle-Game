import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const CurrentLocation = createSlice({
  name: "currentLocation",
  initialState: {
    //list of locations, with a boolean describing the players location,
    Lumbridge: true,
    Bank: false,
  },
  reducers: {
    // this is the only reducer needed as the player can only be in 1 place at a time
    setLocation: (state: Types.IFlatObjectOfBooleans, action) => {
      const location: string = action.type; // decide which location the player is going to

      // iterate over each place in state
      for (let place in state) {
        // set each place to false
        state[place] = false;
        // if the place matches the location the player is to be at,
        if (state[place] === state[location]) {
          // then set this location to true
          state[location] = true;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLocation } = CurrentLocation.actions;

export default CurrentLocation.reducer;

//! I think i want to change this to just be {Location: 'location string here'}
