import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

export const Resources = createSlice({
  name: "resources",
  initialState: {
    //list of options describing the players choice to keep items, or drop them
    Banking: true,
    Dropping: false,
  },
  reducers: {
    // this is the only reducer needed as the player can only do 1 thing at a time
    setResources: (state: Types.IFlatObjectOfBooleans, action) => {
      const option: string = action.type; // decide which option the player has chosen

      // iterate over each choice in state
      for (let choice in state) {
        // set each choice to false
        state[choice] = false;
        // if the choice matches the option the player has picked,
        if (state[choice] === state[option]) {
          // then set this option to true
          state[option] = true;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResources: setLocation } = Resources.actions;

export default Resources.reducer;
