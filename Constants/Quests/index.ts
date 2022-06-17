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
