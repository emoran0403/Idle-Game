import * as Types from "../../Types";

const listOfMeleeNecks = {};
const listOfMagicNecks = {};
const listOfRangedNecks = {};
const listOfTypelessNecks = {};

export const neckSlot: Types.IArmorSlotNeck = {
  melee: listOfMeleeNecks,
  magic: listOfMagicNecks,
  ranged: listOfRangedNecks,
  hybrid: listOfTypelessNecks,
};
