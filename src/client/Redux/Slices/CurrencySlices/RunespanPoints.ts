import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const RunespanPoints = createSlice({
  name: "runespanPoints",
  initialState: {
    runespanPoints: 0,
  },
  reducers: {
    // use this when we need to add runespanPoints to the wallet
    addPointsToState: (state: Types.IFlatObjectOfNums, action) => {
      const amount: number = Number(action.payload); // this will be the number of runespanPoints added to the wallet
      state.runespanPoints += amount;
    },

    // use this when we need to remove runespanPoints from the bank
    removePointsFromState: (state: Types.IFlatObjectOfNums, action) => {
      const amount: number = Number(action.payload); // this will be the number of runespanPoints removed from the wallet

      if (state.runespanPoints - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state.runespanPoints -= amount; // subtract the runespanPoints
      } else {
        // remove all of the runespanPoints, setting state to 0
        state.runespanPoints = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addPointsToState, removePointsFromState } = RunespanPoints.actions;

export default RunespanPoints.reducer;
