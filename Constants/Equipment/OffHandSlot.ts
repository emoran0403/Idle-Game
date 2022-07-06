import * as Types from "../../Types";
//! for now, just use 2h weapons, since magic already needs to track ammunition in the form of runes

const listOfMeleeOffHands = {};
const listOfMagicOffHands = {};
const listOfRangedOffHands = {};

export const mainHandSlot = {
  melee: listOfMeleeOffHands,
  magic: listOfMagicOffHands,
  ranged: listOfRangedOffHands,
};
