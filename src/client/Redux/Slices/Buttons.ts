import { createSlice } from "@reduxjs/toolkit";

export const ButtonCounter = createSlice({
  name: "button1",
  initialState: {
    value: 10,
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementByAmount, increment, decrement } = ButtonCounter.actions;

export default ButtonCounter.reducer;

// action object
//# this shouldnt need a payload, since the it is incrementing by 1 every time
const incrementAction = {
  type: "buttons/increment",
  payload: "1",
};

//# this shouldnt need a payload, since the it is decrementing by 1 every time
const decrementAction = {
  type: "buttons/decrement",
  payload: "1",
};

// this payload will depend on state lol
const incrementByAmountAction = {
  type: "buttons/increment",
  payload: "some amount",
};
// Action creators

const generateIncrementByAmountAction = (amount: number) => {
  return {
    type: "todos/todoAdded",
    payload: amount,
  };
};
