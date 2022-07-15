import * as Types from "../../Types";
import { getLevel } from "../XP Levels";

// low and high roll data from https://runescape.wiki/w/Module:Fishing_chance_calculator/data

export const ListOfFish: Types.IListOfFish = {
  raw_shrimp: {
    name: `shrimp`,
    levelReqFishing: 1,
    XPGivenFishing: 10,
    levelReqCooking: 1,
    XPGivenCooking: 30,
    stopBurnLevel: 34,
    value: 6,
    low: 48,
    high: 256,
  },
  raw_crayfish: {
    name: `crayfish`,
    levelReqFishing: 1,
    XPGivenFishing: 10,
    levelReqCooking: 1,
    XPGivenCooking: 30,
    stopBurnLevel: 34,
    value: 5,
    low: 48,
    high: 256,
  },
  raw_anchovies: {
    name: `anchovies`,
    levelReqFishing: 15,
    XPGivenFishing: 40,
    levelReqCooking: 1,
    XPGivenCooking: 30,
    stopBurnLevel: 34,
    value: 16,
    low: 24,
    high: 128,
  },
  raw_trout: {
    name: `trout`,
    levelReqFishing: 20,
    XPGivenFishing: 50,
    levelReqCooking: 15,
    XPGivenCooking: 70,
    stopBurnLevel: 50,
    value: 20,
    low: 32,
    high: 192,
  },
  raw_salmon: {
    name: `salmon`,
    levelReqFishing: 30,
    XPGivenFishing: 70,
    levelReqCooking: 25,
    XPGivenCooking: 94,
    stopBurnLevel: 58,
    value: 92,
    low: 16,
    high: 96,
  },
  raw_pike: {
    name: `pike`,
    levelReqFishing: 25,
    XPGivenFishing: 60,
    levelReqCooking: 20,
    XPGivenCooking: 80,
    stopBurnLevel: 53,
    value: 25,
    low: 16,
    high: 96,
  },
  raw_sardine: {
    name: `sardine`,
    levelReqFishing: 5,
    XPGivenFishing: 20,
    levelReqCooking: 1,
    XPGivenCooking: 40,
    stopBurnLevel: 38,
    value: 10,
    low: 32,
    high: 192,
  },
  raw_herring: {
    name: `herring`,
    levelReqFishing: 25,
    XPGivenFishing: 60,
    levelReqCooking: 20,
    XPGivenCooking: 80,
    stopBurnLevel: 41,
    value: 16,
    low: 24,
    high: 128,
  },
};

// if the player is fishing, and the game interval has ticked, run this function
export const playerEarnsFish = (fish: Types.IFish, FishEXP: number) => {
  //? adjust function to account for buffs and boosts later
  // calculate the player's Fishing level
  let FishingLevel = getLevel(FishEXP);

  // calculate the rawRoll needed for the player to catch a fish - formula obtained from wiki: https://runescape.wiki/w/Fishing#Mechanics
  let playerRoll = Math.floor(((99 - FishingLevel) * Number(fish.low) + (FishingLevel - 1) * Number(fish.high)) / 98);

  // roll in the range 0-255 inclusive
  let gameRoll = Math.floor(Math.random() * 256);

  // if the player rolled higher than the game, return true
  console.log({ playerRoll, gameRoll });
  if (playerRoll >= gameRoll) {
    return true;
  } else {
    return false;
  }
};
