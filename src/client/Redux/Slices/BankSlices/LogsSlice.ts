import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const bank_logs = createSlice({
  name: "bank_logs",
  initialState: {
    logs: {
      name: `logs`,
      amount: 0,
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
      amount: 0,
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
    addLogToBank: (state: Types.ILogBankSlice, action) => {
      const item: string = action.payload.item; // decide which item to add
      const amount: number = Number(action.payload.amount); // this will be the number of items added to the bank
      state[item as keyof Types.ILogBankSlice].amount += amount; // add the item to state, then reassign (ty immer)
    },

    // use this when we need to remove an item from the bank
    removeLogFromBank: (state: Types.ILogBankSlice, action) => {
      const item: string = action.payload.item; // decide which item to remove
      const amount: number = Number(action.payload.amount); // this will be the number of items removed from the bank

      //* we need to prevent the removal of an amount that would result in a negative
      //* functions removing logs from the bank must be aware of the amount of that log remaining in the bank

      // if there will be enough items remaining, then subtract the amount
      if (state[item as keyof Types.ILogBankSlice].amount - amount >= 0) {
        // remove the given amount
        state[item as keyof Types.ILogBankSlice].amount -= amount;
      } else {
        // otherwise, remove all of that item, setting state to 0
        state[item as keyof Types.ILogBankSlice].amount = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLogToBank, removeLogFromBank } = bank_logs.actions;

export default bank_logs.reducer;
