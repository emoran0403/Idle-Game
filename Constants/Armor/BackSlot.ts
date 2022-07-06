import * as Types from "../../Types";

const listOfMeleeCapes = {};
const listOfMagicCapes = {};
const listOfRangedCapes = {};
const listOfTypelessCapes = {};

export const backSlot: Types.IArmorSlotBack = {
  melee: listOfMeleeCapes,
  magic: listOfMagicCapes,
  ranged: listOfRangedCapes,
  hybrid: listOfTypelessCapes,
};
