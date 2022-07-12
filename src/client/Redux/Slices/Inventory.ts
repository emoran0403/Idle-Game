import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";
import { useSelector } from "react-redux";

// const resourcesStatus = useSelector((state: Types.AllState) => state.Resources) as Types.IResources;
let resourcesStatus = true;

//object[key] is how we can access an object's value by passing in a key

export const Inventory = createSlice({
  name: "inventory",
  initialState: {
    CurrentInventory: [`logs`],
  },
  reducers: {
    /**
     * This will need to respect the players resources setting - to bank or not to bank, that is the question
     */
    // use this when we need to add an item to the inventory

    addItemToInventory: (state: Types.I_Inventory, action) => {
      const item: string = action.payload.item; // the item to push into the inventory
      const inventorySpace: number = Number(state.CurrentInventory.length); // the amount of occupied space in the inventory

      // check if the player is banking or dropping items
      if (resourcesStatus) {
        //Decide if the inventory has space
        if (inventorySpace < 28) {
          state.CurrentInventory.push(item); // add the item to state, then reassign
          if (inventorySpace + 1 === 28) {
            //@ this will need to trigger the player to move to the bank to deposit if the inventory is full
            // go to bank here
          }
        }
      }
      // if the player is dropping the items, then do nothing
      // I dont need to return state here
    },

    // use this when we need to remove an item from the inventory
    removeItemFromInventory: (state: Types.I_Inventory) => {
      //array.shift() for each item in the array will remove the first item every time (first item for UI/UX reasons)

      for (let i = 0; i < state.CurrentInventory.length; i++) {
        const item = state.CurrentInventory.shift(); // pop removes the item from the inventory array,

        //search bank for the item, then increment the amount by 1
        //@ this will need to add to the player Bank if the player is depositing the inventory into the bank
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToInventory, removeItemFromInventory } = Inventory.actions;

export default Inventory.reducer;
