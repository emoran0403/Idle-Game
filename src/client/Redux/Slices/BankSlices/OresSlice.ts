import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const bank_ores = createSlice({
  name: "bank_ores",
  initialState: {
    //list of items in the bank, starting at 0
    clay: {
      name: `clay`,
      amount: 0,
    },
    runeEssence: {
      name: `runeEssence`,
      amount: 0,
    },
    pureEssence: {
      name: `pureEssence`,
      amount: 0,
    },
    tinore: {
      name: `tinore`,
      amount: 0,
    },
    copperore: {
      name: `copperore`,
      amount: 0,
    },
    ironore: {
      name: `ironore`,
      amount: 0,
    },
    coalore: {
      name: `coalore`,
      amount: 0,
    },
    mithrilore: {
      name: `mithrilore`,
      amount: 0,
    },
    goldore: {
      name: `goldore`,
      amount: 0,
    },
    adamantiteore: {
      name: `adamantiteore`,
      amount: 0,
    },
    luminiteore: {
      name: `luminiteore`,
      amount: 0,
    },
    runiteore: {
      name: `runiteore`,
      amount: 0,
    },
    orichalciteore: {
      name: `orichalciteore`,
      amount: 0,
    },
    drakolithore: {
      name: `drakolithore`,
      amount: 0,
    },
    necriteore: {
      name: `necriteore`,
      amount: 0,
    },
    phasmatiteore: {
      name: `phasmatiteore`,
      amount: 0,
    },
    baniteore: {
      name: `baniteore`,
      amount: 0,
    },
    lightAnimicaore: {
      name: `lightAnimicaore`,
      amount: 0,
    },
    darkAnimicaore: {
      name: `darkAnimicaore`,
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
