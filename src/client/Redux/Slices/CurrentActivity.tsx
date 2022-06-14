import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const CurrentActivity = createSlice({
  name: "currentActivity",
  initialState: {
    //list of activities, with a boolean describing the players activity,
    Banking: true,
    Woodcutting: false,
    Firemaking: false,
    Combat: false,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setActivity: (state: Types.IFlatObjectOfBooleans, action) => {
      const activity: string = action.type; // decide which location the player is going to

      // iterate over each activity in state
      for (let action in state) {
        // set each activity to false
        state[action] = false;
        // if the activity matches the location the player is to be at,
        if (state[action] === state[activity]) {
          // then set this location to true
          state[activity] = true;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActivity } = CurrentActivity.actions;

export default CurrentActivity.reducer;

//! need to add a walking / traveling option
