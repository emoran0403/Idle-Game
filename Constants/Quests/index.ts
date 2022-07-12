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
