import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Inventory = createSlice({
  name: "inventory",
  initialState: {},
  reducers: {
    /**
     * This will need to respect the players resources setting - to bank or not to bank, that is the question
     */
    // use this when we need to add an item to the inventory
    addItemToInventory: (state: Types.IFlatObjectOfNums, action) => {
      // const item: string = action.type; // decide which item to add
      const amount: number = Number(action.payload.amount); // this will be the number of items added to the inventory
      const item: string = action.payload.item;
      // adds the entire of the inventory space, accounting for mixed items
      const inventorySpace: number = Number(Object.values(state).reduce((a, b) => a + b, 0));
      const playerIsBanking: boolean = true; //@ will need to grab this from state

      // check if the player is banking or dropping items
      if (playerIsBanking) {
        //Decide if the inventory has space
        if (inventorySpace < 28) {
          state[item] += amount; // add the item to state, then reassign
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
    removeItemFromInventory: (state: Types.IFlatObjectOfNums, action) => {
      const amount: number = Number(action.payload.amount); // this will be the number of items added to the inventory
      const item: string = action.payload.item;

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

//!make this work
// const inventory = {
//   quantity: 22,
//   items: { logs: 10, fish: 12 },
// };
// state.items[item]
