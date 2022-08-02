//collect all the quests here and export it
import * as Types from "../../Types";
import { VarrockQuests } from "./VarrockQuests";
import { LumbridgeQuests } from "./LumbridgeQuests";
import { DraynorQuests } from "./DraynorQuests";

export const AllQuests: Types.IAllQuests = {
  Lumbridge: LumbridgeQuests,
  Draynor: DraynorQuests,
  Varrock: VarrockQuests,
};

export const EmptyQuestRewards: Types.IQuestInfo = {
  name: `Empty Quest - I should never be completed lol`,
  location: `empty`,
  stepsTotal: 0,
  questPoints: 0,
  combatRequirements: 0,
  questRequirements: [],
  levelRequirements: {},
  experienceRewards: {},
  itemRewards: { Coins: 0 },
};
/**
 *
 * import * as Types from "../../Types";
 *
 * EXPERIENCE REWARDS
 * sometimes reward a prismatic lamp, allowing the player to choose the skill in which they gain xp
 * ANY: any skill
 * MAINCOMBAT: attack, strength, defence, constitution, magic, range
 * ANYCOMBAT: attack, strength, defence, constitution, magic, range, prayer, summoning
 *
 * export const LOCATIONNAMEHEREQuests: Types.IQuestInfo[] = []
 * const temp = {};
 */
