import { createSlice } from "@reduxjs/toolkit";

export const experienceGain = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = experienceGain.actions;

export default experienceGain.reducer;
