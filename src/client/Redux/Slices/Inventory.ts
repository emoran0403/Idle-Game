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

    // use this when we want to remove an item from the inventory.  Will remove the first instance of that item from the inventory
    removeAnItemFromInventory: (state: Types.I_Inventory, action) => {
      // define the item to be removed for readability
      const targetItem = action.payload;

      const targetIndex = state.CurrentInventory.findIndex((item) => item === targetItem);
      // findIndex returns -1 if the item cannot be found, so make sure the item IS found
      if (targetIndex !== -1) {
        // given the index, remove 1 item
        state.CurrentInventory.splice(targetIndex, 1);
      }
    },

    // use this when we need to remove items from the inventory
    removeAllItemsFromInventory: (state: Types.I_Inventory) => {
      // removes all items from the inventory
      // logic of moving item to the bank or whatnot is handled elsewhere
      state.CurrentInventory.splice(0, state.CurrentInventory.length);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToInventory, removeAnItemFromInventory, removeAllItemsFromInventory } = Inventory.actions;

export default Inventory.reducer;
