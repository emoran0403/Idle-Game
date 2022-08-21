import * as Types from "../../Types";
import { getLevel } from "../XP Levels";

export const cycloneNode: Types.IRunespanNode = {
  name: `cycloneNode`,
  displayName: `Cyclone`,
  levelReqRunecrafting: 1,
  XPGivenRune_one: 19,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `airrune`,
  rune_two: ``,
};
export const mindstormNode: Types.IRunespanNode = {
  name: `mindstormNode`,
  displayName: `Mind Storm`,
  levelReqRunecrafting: 1,
  XPGivenRune_one: 20,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `mindrune`,
  rune_two: ``,
};
export const waterPoolNode: Types.IRunespanNode = {
  name: `waterPoolNode`,
  displayName: `Water Pool`,
  levelReqRunecrafting: 5,
  XPGivenRune_one: 25.3,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `waterrune`,
  rune_two: ``,
};
export const rockfragmentNode: Types.IRunespanNode = {
  name: `rockfragmentNode`,
  displayName: `Rock Fragment`,
  levelReqRunecrafting: 9,
  XPGivenRune_one: 28.6,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `earthrune`,
  rune_two: ``,
};
export const fireballNode: Types.IRunespanNode = {
  name: `fireballNode`,
  displayName: `Fireball`,
  levelReqRunecrafting: 14,
  XPGivenRune_one: 34.8,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `firerune`,
  rune_two: ``,
};
export const vineNode: Types.IRunespanNode = {
  name: `vineNode`,
  displayName: `Vine`,
  levelReqRunecrafting: 17,
  XPGivenRune_one: 30.3,
  XPGivenRune_two: 34.3,
  multiRune: true,
  rune_one: `waterrune`,
  rune_two: `earthrune`,
};
export const fleshygrowthNode: Types.IRunespanNode = {
  name: `fleshygrowthNode`,
  displayName: `Fleshy growth`,
  levelReqRunecrafting: 20,
  XPGivenRune_one: 46.2,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `bodyrune`,
  rune_two: ``,
};
export const firestormNode: Types.IRunespanNode = {
  name: `firestormNode`,
  displayName: `Fire storm`,
  levelReqRunecrafting: 27,
  XPGivenRune_one: 22.8,
  XPGivenRune_two: 41.7,
  multiRune: true,
  rune_one: `airrune`,
  rune_two: `firerune`,
};
export const chaoticcloudNode: Types.IRunespanNode = {
  name: `chaoticcloudNode`,
  displayName: `Chaotic cloud`,
  levelReqRunecrafting: 35,
  XPGivenRune_one: 61.6,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `chaosrune`,
  rune_two: ``,
};
export const nebulaNode: Types.IRunespanNode = {
  name: `nebulaNode`,
  displayName: `Nebula`,
  levelReqRunecrafting: 40,
  XPGivenRune_one: 63.8,
  XPGivenRune_two: 85.6,
  multiRune: true,
  rune_one: `cosmicrune`,
  rune_two: `astralrune`,
};
export const shifterNode: Types.IRunespanNode = {
  name: `shifterNode`,
  displayName: `Shifter`,
  levelReqRunecrafting: 44,
  XPGivenRune_one: 86.8,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `naturerune`,
  rune_two: ``,
};
export const jumperNode: Types.IRunespanNode = {
  name: `jumperNode`,
  displayName: `Jumper`,
  levelReqRunecrafting: 54,
  XPGivenRune_one: 107.8,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `lawrune`,
  rune_two: ``,
};
export const skullsNode: Types.IRunespanNode = {
  name: `skullsNode`,
  displayName: `Skulls`,
  levelReqRunecrafting: 65,
  XPGivenRune_one: 120,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `deathrune`,
  rune_two: ``,
};
export const bloodpoolNode: Types.IRunespanNode = {
  name: `bloodpoolNode`,
  displayName: `Blood pool`,
  levelReqRunecrafting: 77,
  XPGivenRune_one: 146.3,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `bloodrune`,
  rune_two: ``,
};
export const bloodyskullsNode: Types.IRunespanNode = {
  name: `bloodyskullsNode`,
  displayName: `Bloody skulls`,
  levelReqRunecrafting: 83,
  XPGivenRune_one: 144,
  XPGivenRune_two: 175.5,
  multiRune: true,
  rune_one: `deathrune`,
  rune_two: `bloodrune`,
};
export const livingsoulNode: Types.IRunespanNode = {
  name: `livingsoulNode`,
  displayName: `Living soul`,
  levelReqRunecrafting: 90,
  XPGivenRune_one: 213,
  XPGivenRune_two: 0,
  multiRune: false,
  rune_one: `soulrune`,
  rune_two: ``,
};
export const undeadsoulNode: Types.IRunespanNode = {
  name: `undeadsoulNode`,
  displayName: `Undead soul`,
  levelReqRunecrafting: 95,
  XPGivenRune_one: 144,
  XPGivenRune_two: 255.6,
  multiRune: true,
  rune_one: `deathrune`,
  rune_two: `soulrune`,
};

export const listOfRunespanNodes: Types.IListOfRunespanNodes = {
  cycloneNode,
  mindstormNode,
  waterPoolNode,
  rockfragmentNode,
  fireballNode,
  vineNode,
  fleshygrowthNode,
  firestormNode,
  chaoticcloudNode,
  nebulaNode,
  shifterNode,
  jumperNode,
  skullsNode,
  bloodpoolNode,
  livingsoulNode,
  bloodyskullsNode,
  undeadsoulNode,
};
export const runespanNodePoints: Types.IRunespanNodePoints = {
  airrune: 0.1,
  mindrune: 0.2,
  waterrune: 0.3,
  earthrune: 0.4,
  firerune: 0.5,
  bodyrune: 0.7,
  cosmicrune: 0.9,
  chaosrune: 1.1,
  astralrune: 1.3,
  naturerune: 1.5,
  lawrune: 1.7,
  deathrune: 2.5,
  bloodrune: 3,
  soulrune: 3.5,
};
export const runespanShop: Types.IRunespanShop = {
  runecrafterhat: {
    name: `runecrafterhat`,
    displayName: `Master runecrafter hat`,
    cost: 4000,
    XPBonusRunecrafting: 1.01,
  },
  runecrafterrobe: {
    name: `runecrafterrobe`,
    displayName: `Master runecrafter robe`,
    cost: 4000,
    XPBonusRunecrafting: 1.01,
  },
  runecrafterskirt: {
    name: `runecrafterskirt`,
    displayName: `Master runecrafter skirt`,
    cost: 4000,
    XPBonusRunecrafting: 1.01,
  },
  runecrafterboots: {
    name: `runecrafterboots`,
    displayName: `Master runecrafter boots`,
    cost: 4000,
    XPBonusRunecrafting: 1.01,
  },
  pureEssence: {
    name: `pureEssence`,
    displayName: `Pure essence`,
    cost: 500,
    amount: 200,
  },
};

/**
 *
 * @param nodeToSiphon The runespan node the player is currently attempting to siphon.
 * @param runecraftingXP The player's current runecrafting experience.
 * @returns Return an object containing the runecrafting experience gained, and the number of runespan points the player earned from siphoning.
 */
export const resolveRunespan = (nodeToSiphon: Types.RunespanNodeTypes, runecraftingXP: number) => {
  //* define variables

  // define the return object, which will be updated based on further calculations
  let returnObj = {
    runeSpanpoints: 0,
    runecraftingXP: 1,
  };
  // define the player's runecrafting level to account for multiple runes
  const runecraftingLevel = getLevel(runecraftingXP);
  // define the current node as thisNode for readability
  const thisNode = listOfRunespanNodes[nodeToSiphon as keyof Types.IListOfRunespanNodes];
  // define the success chance
  const playerRoll = 20 + Math.min(runecraftingLevel / thisNode.levelReqRunecrafting, 5);
  // roll in the range [0-100)
  const gameRoll = Math.floor(Math.random() * 100);

  //* decide if the player successfully siphoned the node

  // if the player rolls higher than the game, they successfully siphon and create a rune
  if (playerRoll >= gameRoll) {
    // determine if the current node has multiple runes, and if the player is lucky enough to create the beter rune
    if (thisNode.multiRune && Math.random() >= 0.5) {
      // if so, update returnObj
      returnObj.runecraftingXP = thisNode.XPGivenRune_two;
      //@ts-ignore
      returnObj.runeSpanpoints = runespanNodePoints[thisNode.rune_two];
    } else {
      // if the node does not have multiple runes, or the player was unlucky, then update returnObj
      returnObj.runecraftingXP = thisNode.XPGivenRune_one;
      returnObj.runeSpanpoints = runespanNodePoints[thisNode.rune_one];
    }
  }

  return returnObj;
};
