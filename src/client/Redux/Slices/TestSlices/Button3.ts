import { createSlice } from "@reduxjs/toolkit";

export const ButtonCounter = createSlice({
  name: "button3",
  initialState: {
    value: 10,
  },
  reducers: {
    incrementByAmount3: (state, action) => {
      state.value += action.payload;
    },
    increment3: (state) => {
      state.value += 1;
    },
    decrement3: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
// these have been destructured so that we can impot them by name where we need them
export const { incrementByAmount3, increment3, decrement3 } = ButtonCounter.actions;

export default ButtonCounter.reducer;
