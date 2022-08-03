import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const bank_ores = createSlice({
  name: "bank_ores",
  initialState: {
    //list of items in the bank, starting at 0
    runeEssence: {
      name: `runeEssence`,
      amount: 0,
    },
    pureEssence: {
      name: `pureEssence`,
      amount: 0,
    },
    tin: {
      name: `tin`,
      amount: 0,
    },
    copper: {
      name: `copper`,
      amount: 0,
    },
    iron: {
      name: `iron`,
      amount: 0,
    },
    coal: {
      name: `coal`,
      amount: 0,
    },
    mithril: {
      name: `mithril`,
      amount: 0,
    },
    gold: {
      name: `gold`,
      amount: 0,
    },
    adamantite: {
      name: `adamantite`,
      amount: 0,
    },
    luminite: {
      name: `luminite`,
      amount: 0,
    },
    runite: {
      name: `runite`,
      amount: 0,
    },
    orichalcite: {
      name: `orichalcite`,
      amount: 0,
    },
    drakolith: {
      name: `drakolith`,
      amount: 0,
    },
    necrite: {
      name: `necrite`,
      amount: 0,
    },
    phasmatite: {
      name: `phasmatite`,
      amount: 0,
    },
    banite: {
      name: `banite`,
      amount: 0,
    },
    lightAnimica: {
      name: `lightAnimica`,
      amount: 0,
    },
    darkAnimica: {
      name: `darkAnimica`,
      amount: 0,
    },
  },
  reducers: {
    // use this when we need to add an item to the bank
    addOreToBank: (state: Types.IOreBankSlice, action) => {
      const item: string = action.payload.item; // decide which item to add
      const amount: number = Number(action.payload.amount); // this will be the number of items added to the bank
      state[item as keyof Types.IOreBankSlice].amount += amount; // add the item to state, then reassign (ty immer)
    },

    // use this when we need to remove an item from the bank
    removeOreFromBank: (state: Types.IOreBankSlice, action) => {
      const item: string = action.payload.item; // decide which item to remove
      const amount: number = Number(action.payload.amount); // this will be the number of items removed from the bank

      //@ this will need to add to the player inventory
      if (state[item as keyof Types.IOreBankSlice].amount - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state[item as keyof Types.IOreBankSlice].amount -= amount; // subtract the item from state
      } else {
        // remove all of that item, setting state to 0
        state[item as keyof Types.IOreBankSlice].amount = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addOreToBank, removeOreFromBank } = bank_ores.actions;

export default bank_ores.reducer;
