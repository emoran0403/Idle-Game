import * as Types from "../../Types";

export const DraynorSummary: Types.ILocationSummary = {
  name: `DraynorSummary`,
  displayName: `Draynor Village`,
  Quests: [
    "A Fairy Tale I - Growing Pains",
    "A Fairy Tale II - Cure a Queen",
    "Vampyre Slayer",
    "Ernest the Chicken",
    "Animal Magnetism",
    "Love Story",
    "Swept Away",
    "Missing My Mummy",
    "Stolen Hearts",
  ],
  Skills: {
    Woodcutting: [`logs`, `oak`, `willow`, `yew`],
    Mining: [`clay`],
    Fishing: [`raw_shrimp`, `raw_sardine`, `raw_anchovies`, `raw_herring`],
    Thieving: {
      stalls: [`stallwine`, `stallseed`],
      pickpocketing: [`pickpocketman`, `pickpocketfarmer`, `pickpocketmasterfarmer`],
    },
    Farming: [],
    Firemaking: [],
    Hunter: [],
    Divination: [],
    Archaeology: [],
    Runecrafting: [`waterrune`],
    Construction: [],
    Summoning: [],
    Agility: [],
  },
  Combat: [`man`, `farmer`, `rat`, `skeleton15`, `skeleton32`, `zombie12`, `zombie29`, `ghost25`, `blackknight`],
  Bosses: [],
};
