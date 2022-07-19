import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const bank_fish = createSlice({
  name: "bank_fish",
  initialState: {
    //list of items in the bank, starting at 0

    raw_shrimp: {
      name: `raw_shrimp`,
      amount: 69,
    },
    raw_crayfish: {
      name: `raw_crayfish`,
      amount: 0,
    },
    raw_anchovies: {
      name: `raw_anchovies`,
      amount: 0,
    },
    raw_trout: {
      name: `raw_trout`,
      amount: 0,
    },
    raw_salmon: {
      name: `raw_salmon`,
      amount: 420,
    },
    raw_pike: {
      name: `raw_pike`,
      amount: 0,
    },
    raw_sardine: {
      name: `raw_sardine`,
      amount: 0,
    },
    raw_herring: {
      name: `raw_herring`,
      amount: 0,
    },
  },
  reducers: {
    // use this when we need to add an item to the bank
    addItemToBank: (state: Types.IFishBankSlice, action) => {
      const item: string = action.payload.item; // decide which item to add
      const amount: number = Number(action.payload.amount); // this will be the number of items added to the bank
      state[item as keyof Types.IFishBankSlice].amount += amount; // add the item to state, then reassign (ty immer)
    },

    // use this when we need to remove an item from the bank
    removeItemFromBank: (state: Types.IFishBankSlice, action) => {
      const item: string = action.payload.item; // decide which item to remove
      const amount: number = Number(action.payload.amount); // this will be the number of items removed from the bank

      //@ this will need to add to the player inventory
      if (state[item as keyof Types.IFishBankSlice].amount - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state[item as keyof Types.IFishBankSlice].amount -= amount; // subtract the item from state
      } else {
        // remove all of that item, setting state to 0
        state[item as keyof Types.IFishBankSlice].amount = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToBank, removeItemFromBank } = bank_fish.actions;

export default bank_fish.reducer;
