import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Inventory = createSlice({
  name: "inventory",
  initialState: {
    //list of items in the players inventory
    //Coins will be displayed, but not counted against the 28 item limit for the inventory
    //! should I make a separate slice called wallet to hold just coins?
    //! this would avoid any lame off by 1 errors with calculating the remaining space in the inventory
    Coins: 0,
  },
  reducers: {
    /**
     * This will need to respect the players resources setting - to bank or not to bank, that is the question
     */
    // use this when we need to add an item to the inventory
    addItemToInventory: (state: Types.IFlatObjectOfNums, action) => {
      const item: string = action.type; // decide which item to add
      const amount: number = Number(action.payload); // this will be the number of items added to the inventory
      const inventorySpace: number = Object.keys(state).length;
      const playerIsBanking: boolean = true; //@ will need to grab this from state

      // check if the player is banking or dropping items
      if (playerIsBanking) {
        //Decide if the inventory has space
        if (inventorySpace < 27) {
          //! will state[item] += amount add the key and value to the state object if it does not already exist?
          state[item] += amount; // add the item to state, then reassign
          //! I need to check this again, but do i need a different variable, or will it be updated upon adding the item to the state object?
          const inventorySpaceAfterAdding: number = Object.keys(state).length;

          if (inventorySpaceAfterAdding === 28) {
            //@ this will need to trigger the player to move to the bank to deposit if the inventory is full
            // go to bank here
          }
        }
      } else {
        //do nothing
        //! do i need to return state here, or literally do nothing?
      }
    },

    // use this when we need to remove an item from the inventory
    removeItemFromInventory: (state: Types.IFlatObjectOfNums, action) => {
      const item: string = action.type; // decide which item to remove
      const amount: number = Number(action.payload); // this will be the number of items removed from the bank

      //@ this will need to add to the player Bank if the player is depositing the inventory into the bank
      if (state[item] - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state[item] -= amount; // subtract the item from state
      } else {
        // remove all of that item, setting state to 0
        state[item] = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItemToInventory, removeItemFromInventory } = Inventory.actions;

export default Inventory.reducer;
