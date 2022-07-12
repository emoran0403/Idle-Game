import * as Types from "../../Types";
/**
 * EXPERIENCE REWARDS
 * sometimes reward a prismatic lamp, allowing the player to choose the skill in which they gain xp
 * ANY: any skill
 * MAINCOMBAT: attack, strength, defence, constitution, magic, range
 * ANYCOMBAT: attack, strength, defence, constitution, magic, range, prayer, summoning
 */

export const VarrockQuests: Types.IQuestInfo[] = [
  {
    name: "Dragon Slayer",
    location: "Varrock",
    stepsTotal: 53,
    questPoints: 2,
    combatRequirements: 63,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      Strength: 18650,
      Defence: 18650,
    },
    itemRewards: {},
  },
];

const temp = {};
