import * as Types from "../../Types";

export const Lumbridge: Types.ILocationSummary = {
  Quests: ["Cook's Assistant", "Myths of the White Lands", "The Restless Ghost", "The Lost Tribe", "The Blood Pact", "Buyers and Cellars"],
  Skills: {
    Woodcutting: [`logs`, `oak`, `willow`, `yew`],
    Mining: [`tin`, `copper`],
    Fishing: [`crayfish`, `shrimp`, `anchovies`, `trout`, `pike`, `salmon`],
  },
  Combat: [`man`, `woman`, `giant spider`, `goblin`, `chicken`, `cow`, `spider`, `giant rat`, `swamp frog`],
};

//! collect and export all the information about Lumbridge here so we can import it elsewhere
