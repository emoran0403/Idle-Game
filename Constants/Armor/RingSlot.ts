import * as Types from "../../Types";

const listOfMeleeRings = {};
const listOfMagicRings = {};
const listOfRangedRings = {};
const listOfTypelessRings = {};

export const neckSlot: Types.IArmorSlotRing = {
  melee: listOfMeleeRings,
  magic: listOfMagicRings,
  ranged: listOfRangedRings,
  hybrid: listOfTypelessRings,
};
