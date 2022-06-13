import { createSlice } from "@reduxjs/toolkit";

export const ButtonCounter = createSlice({
  name: "button2",
  initialState: {
    value: 10,
  },
  reducers: {
    incrementByAmount2: (state, action) => {
      state.value += action.payload;
    },
    increment2: (state) => {
      state.value += 1;
    },
    decrement2: (state) => {
      state.value -= 1;
    },
  },
});

// Action creators are generated for each case reducer function
// these have been destructured so that we can impot them by name where we need them
export const { incrementByAmount2, increment2, decrement2 } = ButtonCounter.actions;

export default ButtonCounter.reducer;
