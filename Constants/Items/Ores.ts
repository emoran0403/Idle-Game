import * as Types from "../../Types";
import { getLevel } from "../XP Levels";

export const ListOfOres: Types.IListOfOres = {
  runeEssence: {
    name: "runeEssence",
    displayName: "Rune essence",
    levelReqMining: 1,
    durability: 50,
    hardness: 0,
    xpMultiplier: 0.66,
    value: 17,
  },
  pureEssence: {
    name: "pureEssence",
    displayName: "Pure essence",
    levelReqMining: 30,
    durability: 50,
    hardness: 0,
    xpMultiplier: 0.66,
    value: 17,
  },
  tinore: {
    name: "tinore",
    displayName: "Tin ore",
    levelReqMining: 1,
    durability: 40,
    hardness: 0,
    xpMultiplier: 0.66,
    value: 17,
  },
  copperore: {
    name: "copperore",
    displayName: "Copper ore",
    levelReqMining: 1,
    durability: 40,
    hardness: 0,
    xpMultiplier: 0.66,
    value: 17,
  },
  ironore: {
    name: "ironore",
    displayName: "Iron ore",
    levelReqMining: 10,
    durability: 120,
    hardness: 5,
    xpMultiplier: 0.68,
    value: 25,
  },
  coalore: {
    name: "coalore",
    displayName: "Coal ore",
    levelReqMining: 20,
    durability: 140,
    hardness: 15,
    xpMultiplier: 0.7,
    value: 42,
  },
  mithrilore: {
    name: "mithrilore",
    displayName: "Mithril ore",
    levelReqMining: 30,
    durability: 240,
    hardness: 30,
    xpMultiplier: 0.72,
    value: 59,
  },
  goldore: {
    name: "goldore",
    displayName: "Gold ore",
    levelReqMining: 40,
    durability: 200,
    hardness: 50,
    xpMultiplier: 0.74,
    value: 150,
  },
  adamantiteore: {
    name: "adamantiteore",
    displayName: "Adamantite ore",
    levelReqMining: 40,
    durability: 380,
    hardness: 50,
    xpMultiplier: 0.74,
    value: 84,
  },
  luminiteore: {
    name: "luminiteore",
    displayName: "Luminite ore",
    levelReqMining: 40,
    durability: 380,
    hardness: 50,
    xpMultiplier: 0.74,
    value: 84,
  },
  runiteore: {
    name: "runiteore",
    displayName: "Runite ore",
    levelReqMining: 50,
    durability: 600,
    hardness: 75,
    xpMultiplier: 0.76,
    value: 209,
  },
  orichalciteore: {
    name: "orichalciteore",
    displayName: "Orichalcite ore",
    levelReqMining: 60,
    durability: 1400,
    hardness: 105,
    xpMultiplier: 0.78,
    value: 417,
  },
  drakolithore: {
    name: "drakolithore",
    displayName: "Drakolith ore",
    levelReqMining: 60,
    durability: 1400,
    hardness: 105,
    xpMultiplier: 0.78,
    value: 417,
  },
  necriteore: {
    name: "necriteore",
    displayName: "Necrite ore",
    levelReqMining: 70,
    durability: 1300,
    hardness: 140,
    xpMultiplier: 0.8,
    value: 834,
  },
  phasmatiteore: {
    name: "phasmatiteore",
    displayName: "Phasmatite ore",
    levelReqMining: 70,
    durability: 1300,
    hardness: 140,
    xpMultiplier: 0.8,
    value: 834,
  },
  baniteore: {
    name: "baniteore",
    displayName: "Banite ore",
    levelReqMining: 80,
    durability: 1700,
    hardness: 185,
    xpMultiplier: 0.82,
    value: 1067,
  },
  lightAnimicaore: {
    name: "lightAnimicaore",
    displayName: "Light animica ore",
    levelReqMining: 90,
    durability: 2000,
    hardness: 235,
    xpMultiplier: 0.84,
    value: 1734,
  },
  darkAnimicaore: {
    name: "darkAnimicaore",
    displayName: "Dark animica ore",
    levelReqMining: 90,
    durability: 2000,
    hardness: 235,
    xpMultiplier: 0.84,
    value: 1734,
  },
};

// if the player is mining, and the game interval has ticked, run this function
/**
 * Calculates the damage the player does to an ore rock, and the experience gained as a result.
 *
 * Returns an object:
 *  { damage: number, experience: number}
 *
 * @param ore - The ore the player is mining as Types.IOre
 * @param pickaxe - The pickaxe the player is using as Types.IPickaxe
 */
export const resolveMining = (ore: Types.IOre, pickaxe: Types.IPickaxe, miningXP: number, strengthXP: number) => {
  let resultObj = {
    damage: 0,
    experience: 0,
  };

  // calculate the player's mining and strength levels
  const miningLevel = getLevel(miningXP);
  const strengthLevel = getLevel(strengthXP);

  // calcualte the random amount of damage above the minimum damage, then add the minimum
  const damageRoll = Math.floor(Math.random() * (pickaxe.damageMax - pickaxe.damageMin)) + pickaxe.damageMin;

  // calculate the net hardness - a penalty IF the player is using a lower level pickaxe on a higher tier ore
  const netHardness = pickaxe.penetration - ore.hardness >= 0 ? 0 : pickaxe.penetration - ore.hardness;

  // calculate the the damage the player will do to the rock
  const damage = miningLevel + Math.floor(strengthLevel / 10) + damageRoll + netHardness;

  // update the damage value of the resultObj
  resultObj.damage = damage;

  // calculate the the experience the player gains on each hit
  const experience = Math.floor(damage * ore.xpMultiplier * 0.4);

  // update the experience value of the resultObj
  resultObj.experience = experience;

  // finally, return the resultObj
  return resultObj;
};
