import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Inventory = createSlice({
  name: "inventory",
  initialState: {
    CurrentInventory: [],
  },
  reducers: {
    // use this when we need to add an item to the inventory
    addItemToInventory: (state: Types.I_Inventory, action) => {
      // Logic of when to bank is handled elsewhere
      const item: string = action.payload; // the item to push into the inventory
      state.CurrentInventory.push(item);
    },

    // use this when we need to remove items from the inventory
    removeItemFromInventory: (state: Types.I_Inventory) => {
      // removes all items from the inventory
      // logic of moving item to the bank or whatnot is handled elsewhere
      state.CurrentInventory.splice(0, state.CurrentInventory.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToInventory, removeItemFromInventory } = Inventory.actions;

export default Inventory.reducer;
