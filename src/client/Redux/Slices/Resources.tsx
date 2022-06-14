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
    setResources: (state: Types.IFlatObjectOfBooleans) => {
      for (let [key, value] of Object.entries(state)) {
        if (value === true) {
          state[key] = false;
        } else {
          state[key] = true;
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { setResources: setLocation } = Resources.actions;

export default Resources.reducer;
