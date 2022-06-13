import { createSlice } from "@reduxjs/toolkit";

export const ButtonCounter = createSlice({
  name: "button1",
  initialState: {
    value: 10,
  },
  reducers: {
    incrementByAmount1: (state, action) => {
      state.value += action.payload;
    },
    increment1: (state) => {
      state.value += 1;
    },
    decrement1: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
// these have been destructured so that we can impot them by name where we need them
export const { incrementByAmount1, increment1, decrement1 } = ButtonCounter.actions;

export default ButtonCounter.reducer;
