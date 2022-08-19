import * as Types from "../../Types";
import { getLevel } from "../XP Levels";

export const airrune: Types.IRune = {
  name: `airrune`,
  displayName: `Air rune`,
  levelReqRunecrafting: 1,
  XPGivenRunecrafting: 5,
  value: 17,
  multirunes: [11, 22, 33, 44, 55, 66, 77, 88, 99],
};
export const mindrune: Types.IRune = {
  name: `mindrune`,
  displayName: `Mind rune`,
  levelReqRunecrafting: 1,
  XPGivenRunecrafting: 5.5,
  value: 17,
  multirunes: [14, 28, 42, 56, 70, 84, 98],
};
export const waterrune: Types.IRune = {
  name: `waterrune`,
  displayName: `Water rune`,
  levelReqRunecrafting: 5,
  XPGivenRunecrafting: 6,
  value: 17,
  multirunes: [19, 38, 57, 76, 95],
};
export const earthrune: Types.IRune = {
  name: `earthrune`,
  displayName: `Earth rune`,
  levelReqRunecrafting: 9,
  XPGivenRunecrafting: 6.5,
  value: 17,
  multirunes: [26, 52, 78],
};
export const firerune: Types.IRune = {
  name: `firerune`,
  displayName: `Fire rune`,
  levelReqRunecrafting: 14,
  XPGivenRunecrafting: 7,
  value: 17,
  multirunes: [35, 70],
};
export const bodyrune: Types.IRune = {
  name: `bodyrune`,
  displayName: `Body rune`,
  levelReqRunecrafting: 20,
  XPGivenRunecrafting: 7.5,
  value: 17,
  multirunes: [46, 92],
};
export const cosmicrune: Types.IRune = {
  name: `cosmicrune`,
  displayName: `Cosmic rune`,
  levelReqRunecrafting: 27,
  XPGivenRunecrafting: 8,
  value: 232,
  multirunes: [59],
};
export const chaosrune: Types.IRune = {
  name: `chaosrune`,
  displayName: `Chaos rune`,
  levelReqRunecrafting: 35,
  XPGivenRunecrafting: 8.5,
  value: 140,
  multirunes: [74],
};
export const astralrune: Types.IRune = {
  name: `astralrune`,
  displayName: `Astral rune`,
  levelReqRunecrafting: 40,
  XPGivenRunecrafting: 8.7,
  value: 220,
  multirunes: [82],
};
export const naturerune: Types.IRune = {
  name: `naturerune`,
  displayName: `Nature rune`,
  levelReqRunecrafting: 44,
  XPGivenRunecrafting: 9,
  value: 372,
  multirunes: [91],
};
export const lawrune: Types.IRune = {
  name: `lawrune`,
  displayName: `Law rune`,
  levelReqRunecrafting: 54,
  XPGivenRunecrafting: 9.5,
  value: 378,
  multirunes: [],
};
export const deathrune: Types.IRune = {
  name: `deathrune`,
  displayName: `Death rune`,
  levelReqRunecrafting: 65,
  XPGivenRunecrafting: 10,
  value: 310,
  multirunes: [],
};
export const bloodrune: Types.IRune = {
  name: `bloodrune`,
  displayName: `Blood rune`,
  levelReqRunecrafting: 77,
  XPGivenRunecrafting: 10.5,
  value: 550,
  multirunes: [],
};
export const soulrune: Types.IRune = {
  name: `soulrune`,
  displayName: `Soul rune`,
  levelReqRunecrafting: 90,
  XPGivenRunecrafting: 91.7,
  value: 410,
  multirunes: [],
};

export const ListOfRunes: Types.IListOfRunes = {
  airrune,
  mindrune,
  waterrune,
  earthrune,
  firerune,
  bodyrune,
  cosmicrune,
  chaosrune,
  astralrune,
  naturerune,
  lawrune,
  deathrune,
  bloodrune,
  soulrune,
};

/**
 * This function calculates the number of runes made by the player, and the runecrafting experience for doing so.
 * @param runeToMake - The rune the player is trying to make.
 * @param runecraftingXP - The player's current runecrafting experience.
 * @param essenceInInventory - The amount of essence in the player's inventory.
 * @returns Returns an object containing the number of runes made, and the runecrafting experience gained.
 */
export const resolveRunecrafting = (runeToMake: Types.IRuneTypes, runecraftingXP: number, essenceInInventory: number) => {
  //* define variables

  // define the player's runecrafting level to account for multiple runes
  const runecraftingLevel = getLevel(runecraftingXP);
  // define thisRune for readability
  const thisRune = ListOfRunes[`${runeToMake}rune` as keyof Types.IListOfRunes];
  // define the return object, which will be updated based on further calculations
  let returnObj = {
    runesMade: 0,
    runecraftingXP: 0,
  };

  //* calculate the runecrafting experience gained, and update the return object
  const runecraftingXPGained = thisRune.XPGivenRunecrafting * essenceInInventory;
  returnObj.runecraftingXP = runecraftingXPGained;

  //* calculate how the multiplier the player qualifies for based on the player's level
  /**
   * first, find how many thresholds the player passes => thisRune.multirunes.filter((threshold) => threshold <= runecraftinglevel)
   * we find that amount by calling .length
   * since we are dealing with `multiple` runes, we add 1
   * then, multiply the multiplier by the number of essence in the player's inventory
   * finally, assign this to the return object
   */
  const runeAmountMultiplier = thisRune.multirunes.filter((threshold) => threshold <= runecraftingLevel).length + 1;
  const runesMade = runeAmountMultiplier * essenceInInventory;
  returnObj.runesMade = runesMade;

  return returnObj;
};
