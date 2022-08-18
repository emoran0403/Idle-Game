import * as Types from "../../Types";
/**
 * EXPERIENCE REWARDS
 * sometimes reward a prismatic lamp, allowing the player to choose the skill in which they gain xp
 * ANY: any skill
 * MAINCOMBAT: attack, strength, defence, constitution, magic, range
 * ANYCOMBAT: attack, strength, defence, constitution, magic, range, prayer, summoning
 */

export const WizardTowerQuests: Types.IQuestInfo[] = [
  {
    name: "Rune Mysteries",
    location: "WizardTower",
    stepsTotal: 39,
    questPoints: 1,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      Magic: 250,
      Runecrafting: 250,
    },
    itemRewards: {},
  },
  {
    name: "Rune Memories",
    location: "WizardTower",
    stepsTotal: 49,
    questPoints: 1,
    combatRequirements: 0,
    questRequirements: ["Rune Mysteries"],
    levelRequirements: {},
    experienceRewards: {
      Magic: 300,
      Runecrafting: 300,
    },
    itemRewards: {},
  },
  {
    name: "Heart of Stone",
    location: "WizardTower",
    stepsTotal: 49,
    questPoints: 1,
    combatRequirements: 56,
    questRequirements: ["Carnillean Rising", "The Blood Pact", "Hazeel Cult", "Rune Memories", "Rune Mysteries"],
    levelRequirements: {
      Runecrafting: 25,
      Magic: 35,
    },
    experienceRewards: {
      Magic: 1500,
      Runecrafting: 1500,
    },
    itemRewards: {},
  },
  {
    name: "Beneath Cursed Tides",
    location: "WizardTower",
    stepsTotal: 60,
    questPoints: 1,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {
      Attack: 30,
      Strength: 30,
      Magic: 30,
      Mining: 30,
      Smithing: 30,
      Woodcutting: 30,
      Firemaking: 30,
      Cooking: 30,
    },
    experienceRewards: {
      Cooking: 5000,
      Fishing: 5000,
    },
    itemRewards: {},
  },
];
