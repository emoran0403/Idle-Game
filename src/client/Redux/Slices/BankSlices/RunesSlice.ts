import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const bank_runes = createSlice({
  name: "bank_runes",
  initialState: {
    airrune: {
      name: `airrune`,
      amount: 0,
    },
    mindrune: {
      name: `mindrune`,
      amount: 0,
    },
    waterrune: {
      name: `waterrune`,
      amount: 0,
    },
    earthrune: {
      name: `earthrune`,
      amount: 0,
    },
    firerune: {
      name: `firerune`,
      amount: 0,
    },
    bodyrune: {
      name: `bodyrune`,
      amount: 0,
    },
    cosmicrune: {
      name: `cosmicrune`,
      amount: 0,
    },
    chaosrune: {
      name: `chaosrune`,
      amount: 0,
    },
    astralrune: {
      name: `astralrune`,
      amount: 0,
    },
    naturerune: {
      name: `naturerune`,
      amount: 0,
    },
    lawrune: {
      name: `lawrune`,
      amount: 0,
    },
    deathrune: {
      name: `deathrune`,
      amount: 0,
    },
    bloodrune: {
      name: `bloodrune`,
      amount: 0,
    },
    soulrune: {
      name: `soulrune`,
      amount: 0,
    },
  },
  reducers: {
    /**
     * use this when we need to add an item to the bank
     * @param state The current bank_runes state
     * @param action - An object with the following properties:
     * {
     * item: Types.IRune,
     * amount:number,
     * }
     */
    addRuneToBank: (state: Types.IRuneBankSlice, action) => {
      // decide which item to add
      const item: string = action.payload.item;
      // this will be the number of items added to the bank
      const amount: number = Number(action.payload.amount);
      // add the item to state
      state[item as keyof Types.IRuneBankSlice].amount += amount;
    },

    /**
     * use this when we need to remove an item from the bank
     * @param state The current bank_runes state
     * @param action - An object with the following properties:
     * {
     * item: Types.IRune,
     * amount:number,
     * }
     */
    removeRuneFromBank: (state: Types.IRuneBankSlice, action) => {
      // decide which item to remove
      const item: string = action.payload.item;
      // this will be the number of items removed from the bank
      const amount: number = Number(action.payload.amount);

      //* we need to prevent the removal of an amount that would result in a negative
      //* functions removing logs from the bank must be aware of the amount of that log remaining in the bank

      // if there will be enough items remaining, then subtract the amount
      if (state[item as keyof Types.IRuneBankSlice].amount - amount >= 0) {
        // remove the given amount
        state[item as keyof Types.IRuneBankSlice].amount -= amount;
      } else {
        // otherwise, remove all of that item, setting state to 0
        state[item as keyof Types.IRuneBankSlice].amount = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRuneToBank, removeRuneFromBank } = bank_runes.actions;

export default bank_runes.reducer;
