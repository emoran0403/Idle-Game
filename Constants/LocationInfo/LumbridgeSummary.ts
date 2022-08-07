import * as Types from "../../Types";

export const LumbridgeSummary: Types.ILumbridgeLocationSummary = {
  name: `LumbridgeSummary`,
  displayName: `Lumbridge`,
  Quests: ["Cook's Assistant", "Myths of the White Lands", "The Restless Ghost", "The Lost Tribe", "The Blood Pact", "Buyers and Cellars"],
  Skills: {
    Woodcutting: [`logs`, `oak`, `willow`, `yew`],
    Mining: [`clay`, `tinore`, `copperore`, `ironore`, `coalore`],
    Fishing: [`raw_crayfish`, `raw_shrimp`, `raw_sardine`, `raw_anchovies`, `raw_trout`, `raw_herring`, `raw_pike`, `raw_salmon`],
    Thieving: {
      stalls: [`stallvegetable`, `stallcrafting`],
      pickpocketing: [`pickpocketman`, `pickpocketfarmer`, `pickpockethamfemale`, `pickpockethammale`, `pickpocketmasterfarmer`],
    },
    Farming: [],
    Firemaking: [],
    Hunter: [],
    Divination: [],
    Archaeology: [],
    Runecrafting: [],
    Construction: [],
    Summoning: [],
    Agility: [],
  },
  Combat: [`man`, `giant spider`, `goblin`, `chicken`, `cow`, `spider`, `giant rat`, `swamp frog`],
  Bosses: [],
};
