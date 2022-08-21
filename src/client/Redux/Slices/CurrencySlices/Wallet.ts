import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Wallet = createSlice({
  name: "wallet",
  initialState: {
    // wallet only holds coins
    coins: 100,
  },
  reducers: {
    // use this when we need to add coins to the wallet
    addCoinsToWallet: (state: Types.IFlatObjectOfNums, action) => {
      const amount: number = Number(action.payload); // this will be the number of coins added to the wallet
      state.coins += amount;
    },

    // use this when we need to remove coins from the bank
    removeFromWallet: (state: Types.IFlatObjectOfNums, action) => {
      const amount: number = Number(action.payload); // this will be the number of coins removed from the wallet

      if (state.coins - amount >= 0) {
        // prevent the removal of an amount that would result in a negative
        state.coins -= amount; // subtract the coins
      } else {
        // remove all of the coins, setting state to 0
        state.coins = 0;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addCoinsToWallet, removeFromWallet } = Wallet.actions;

export default Wallet.reducer;
