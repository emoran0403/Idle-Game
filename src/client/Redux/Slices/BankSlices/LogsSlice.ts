import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const bank_logs = createSlice({
  name: "bank_logs",
  initialState: {
    //list of items in the bank, starting at 0
    logs: {
      name: `logs`,
      amount: 69,
    },
    oak: {
      name: `oak`,
      amount: 0,
    },
    willow: {
      name: `willow`,
      amount: 0,
    },
    maple: {
      name: `maple`,
      amount: 420,
    },
    yew: {
      name: `yew`,
      amount: 0,
    },
    magic: {
      name: `magic`,
      amount: 0,
    },
    elder: {
      name: `elder`,
      amount: 0,
    },
  },
  reducers: {
    // use this when we need to add an item to the bank
    addItemToBank: (state: Types.ILogBankSlice, action) => {
      const item: string = action.type; // decide which item to add
      const amount: number = Number(action.payload); // this will be the number of items added to the bank
      state[item as keyof Types.ILogBankSlice].amount += amount; // add the item to state, then reassign (ty immer)
    },

    // use this when we need to remove an item from the bank
    removeItemFromBank: (state: Types.ILogBankSlice, action) => {
      const item: string = action.type; // decide which item to remove
      const amount: number = Number(action.payload); // this will be the number of items removed from the bank

      //@ this will need to add to the player inventory
      if (state[item as keyof Types.ILogBankSlice].amount - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state[item as keyof Types.ILogBankSlice].amount -= amount; // subtract the item from state
      } else {
        // remove all of that item, setting state to 0
        state[item as keyof Types.ILogBankSlice].amount = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToBank, removeItemFromBank } = bank_logs.actions;

export default bank_logs.reducer;

//! fix the reducers! lol
