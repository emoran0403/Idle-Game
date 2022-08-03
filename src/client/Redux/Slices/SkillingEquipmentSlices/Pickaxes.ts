import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

export const Pickaxes = createSlice({
  name: "pickaxes",
  initialState: {
    //list of pickaxes, describing if the player owns the item or not

    playerOwnsbronzepickaxe: true,
    playerOwnsironpickaxe: false,
    playerOwnssteelpickaxe: false,
    playerOwnsmithrilpickaxe: false,
    playerOwnsadamantpickaxe: false,
    playerOwnsrunepickaxe: false,
    playerOwnsorikalkumpickaxe: false,
    playerOwnsdragonpickaxe: false,
    playerOwnsnecroniumpickaxe: false,
    playerOwnscrystalpickaxe: false,
    playerOwnsbanepickaxe: false,
    playerOwnselderrunepickaxe: false,
  },
  reducers: {
    // this is the only reducer needed as the player will only be able to acquire pickaxes, not sell them
    playerNowOwnsPickaxeItem: (state: Types.IPickaxesSlice, action) => {
      state[action.payload as keyof Types.IPickaxesSlice] = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { playerNowOwnsPickaxeItem } = Pickaxes.actions;

export default Pickaxes.reducer;
