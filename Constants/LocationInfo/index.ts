import * as Types from "../../Types";
import { LumbridgeSummary } from "./LumbridgeSummary";
import { DraynorSummary } from "./DraynorSummary";

export const AllLocations: Types.IAllLocations = {
  Lumbridge: LumbridgeSummary,
  Draynor: DraynorSummary,
};

/**
 * 
 * 
 * import * as Types from "../../Types";

export const TOWNNAMEHERE: Types.ILocationSummary = {
  Quests: [],
  Skills: {
    Woodcutting: [],
    Mining: [],
    Fishing: [],
  },
  Combat: [],
};

 */
