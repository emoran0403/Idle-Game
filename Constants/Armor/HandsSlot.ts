import * as Types from "../../Types";

const listOfMeleeHands = {};
const listOfMagicHands = {};
const listOfRangedHands = {};

export const headGear: Types.IArmorSlotHands = {
  melee: listOfMeleeHands,
  magic: listOfMagicHands,
  ranged: listOfRangedHands,
};
