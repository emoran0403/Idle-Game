import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Bank = createSlice({
  name: "bank",
  initialState: {
    //list of items in the bank, starting at 0
    Coins: 0,
    Logs: 0,
    Ashes: 0,
  },
  reducers: {
    // use this when we need to add an item to the bank
    addItemToBank: (state: Types.IFlatObjectOfNums, action) => {
      const item: string = action.type; // decide which item to add
      const amount: number = Number(action.payload); // this will be the number of items added to the bank
      state[item] += amount; // add the item to state, then reassign (ty immer)
    },

    // use this when we need to remove an item from the bank
    removeItemFromBank: (state: Types.IFlatObjectOfNums, action) => {
      const item: string = action.type; // decide which item to remove
      const amount: number = Number(action.payload); // this will be the number of items removed from the bank
      state[item] -= amount; // subtract the item from state, then reassign (ty immer)
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToBank, removeItemFromBank } = Bank.actions;

export default Bank.reducer;
