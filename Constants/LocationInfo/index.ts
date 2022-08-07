import * as Types from "../../Types";
import { LumbridgeSummary } from "./LumbridgeSummary";
import { DraynorSummary } from "./DraynorSummary";
import { LumbridgeSwampCaveSummary } from "./LumbridgeSwampCaveSummary.ts";

export const AllLocations: Types.IAllLocations = {
  Lumbridge: LumbridgeSummary,
  Draynor: DraynorSummary,
  LumbridgeSwampCave: LumbridgeSwampCaveSummary,
};
