import * as Types from "../../Types";
/**
 * EXPERIENCE REWARDS
 * sometimes reward a prismatic lamp, allowing the player to choose the skill in which they gain xp
 * ANY: any skill
 * MAINCOMBAT: attack, strength, defence, constitution, magic, range
 * ANYCOMBAT: attack, strength, defence, constitution, magic, range, prayer, summoning
 */

export const LumbridgeQuests: Types.IQuestInfo[] = [
  {
    name: "Cook's Assistant",
    location: "Lumbridge",
    stepsTotal: 20,
    questPoints: 1,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      Cooking: 300,
    },
    itemRewards: { Coins: 500 },
  },
  //! myths does not have any quest requirements, this was just for testing purposes
  {
    name: "Myths of the White Lands",
    location: "Lumbridge",
    stepsTotal: 113,
    questPoints: 2,
    combatRequirements: 0,
    questRequirements: ["Cook's Assistant"],
    levelRequirements: {},
    experienceRewards: { ANY: 500 },
    itemRewards: { Coins: 5000 },
  },
  {
    name: "The Restless Ghost",
    location: "Lumbridge",
    stepsTotal: 14,
    questPoints: 1,
    combatRequirements: 7,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      Prayer: 1125,
    },
    itemRewards: { Coins: 0 },
  },
  {
    name: "The Lost Tribe",
    location: "Lumbridge",
    stepsTotal: 33,
    questPoints: 1,
    combatRequirements: 0,
    questRequirements: ["Goblin Diplomacy"],
    levelRequirements: {
      Agility: 13,
      Mining: 17,
      Thieving: 13,
    },
    experienceRewards: {
      Mining: 3000,
    },
    itemRewards: { Coins: 0 },
  },
  //! blood pact does not have anyquest requirements, this was just for testing purposes

  {
    name: "The Blood Pact",
    location: "Lumbridge",
    stepsTotal: 17,
    questPoints: 1,
    combatRequirements: 1,
    questRequirements: ["The Restless Ghost"],
    levelRequirements: {},
    experienceRewards: {
      Attack: 100,
      Strength: 100,
      Defence: 100,
      Ranged: 100,
      Magic: 100,
    },
    itemRewards: { Coins: 2500 },
  },
  {
    name: "Buyers and Cellars",
    location: "Lumbridge",
    stepsTotal: 15,
    questPoints: 1,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {
      Thieving: 5,
    },
    experienceRewards: {
      Thieving: 1025,
    },
    itemRewards: { Coins: 0 },
  },
  {
    name: "Lost City",
    location: "Lumbridge",
    stepsTotal: 26,
    questPoints: 3,
    combatRequirements: 63,
    questRequirements: [],
    levelRequirements: {
      Crafting: 31,
      Woodcutting: 36,
    },
    experienceRewards: {},
    itemRewards: { Coins: 0 },
  },
];
