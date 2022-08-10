import * as Types from "../../Types";

//@ enemies with a number in their name indicates that their combat level varies, as well as their stats

export const man: Types.IEnemySummary = {
  name: `man`,
  displayName: `Man`,
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 0,
  levelReqSlayer: 0,
  slayerClass: [``],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: `fire`,
    weakStyle: `magic`,
    neutralStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 130,
  defence: 3,
  accuracy: 130,
  maxHit: 12,
};
export const goblin: Types.IEnemySummary = {
  name: `goblin`,
  displayName: `Goblin`,
  level: 2,
  lifePoints: 100,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 6.4,
  levelReqSlayer: 0,
  slayerClass: [`goblins`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: `air`,
    weakStyle: `magic`,
    neutralStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 120,
  defence: 2,
  accuracy: 120,
  maxHit: 8,
};
export const giantspider: Types.IEnemySummary = {
  name: "giantspider",
  displayName: "Giant spider",
  level: 2,
  lifePoints: 100,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 0,
  XPGivenSlayer: 6.4,
  levelReqSlayer: 0,
  slayerClass: [`spiders`],
  monsterStyle: `ranged`,
  drops: [],

  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 120,
  defence: 2,
  accuracy: 120,
  maxHit: 12,
};
export const chicken: Types.IEnemySummary = {
  name: "chicken",
  displayName: "Chicken",
  level: 1,
  lifePoints: 50,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 6.4,
  levelReqSlayer: 0,
  slayerClass: [`birds`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "fire",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 110,
  defence: 1,
  accuracy: 110,
  maxHit: 4,
};
export const cow: Types.IEnemySummary = {
  name: "cow",
  displayName: "Cow",
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 26,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 3.3,
  levelReqSlayer: 0,
  slayerClass: [`cows`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 130,
  defence: 3,
  accuracy: 130,
  maxHit: 12,
};
export const spider: Types.IEnemySummary = {
  name: "spider",
  displayName: "Spider",
  level: 1,
  lifePoints: 50,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 0,
  XPGivenSlayer: 6.4,
  levelReqSlayer: 0,
  slayerClass: [`spiders`],
  monsterStyle: `ranged`,
  drops: [],

  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 110,
  defence: 1,
  accuracy: 10,
  maxHit: 4,
};
export const giantrat: Types.IEnemySummary = {
  name: "giantrat",
  displayName: "Giant rat",
  level: 7,
  lifePoints: 250,
  XPGivenCombatStyle: 27,
  XPGivenConstitution: 9,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 8.2,
  levelReqSlayer: 0,
  slayerClass: [`rats`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 150,
  defence: 5,
  accuracy: 150,
  maxHit: 20,
};
export const swampfrog: Types.IEnemySummary = {
  name: "swampfrog",
  displayName: "Swamp frog",
  level: 16,
  lifePoints: 650,
  XPGivenCombatStyle: 36,
  XPGivenConstitution: 12,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 10,
  levelReqSlayer: 0,
  slayerClass: [`frogs`],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 223,
  defence: 12,
  accuracy: 223,
  maxHit: 172,
};
export const farmer: Types.IEnemySummary = {
  name: "farmer",
  displayName: "Farmer",
  level: 7,
  lifePoints: 250,
  XPGivenCombatStyle: 27,
  XPGivenConstitution: 9,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 0,
  levelReqSlayer: 0,
  slayerClass: [``],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "fire",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 150,
  defence: 5,
  accuracy: 150,
  maxHit: 30,
};
export const rat: Types.IEnemySummary = {
  name: "rat",
  displayName: "Rat",
  level: 1,
  lifePoints: 50,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 4.5,
  levelReqSlayer: 0,
  slayerClass: [`rats`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 110,
  defence: 1,
  accuracy: 110,
  maxHit: 4,
};
export const skeleton15: Types.IEnemySummary = {
  name: "skeleton15",
  displayName: "Skeleton",
  level: 15,
  lifePoints: 550,
  XPGivenCombatStyle: 34,
  XPGivenConstitution: 11,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 8.8,
  levelReqSlayer: 0,
  slayerClass: [`skeletons`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 213,
  defence: 11,
  accuracy: 213,
  maxHit: 44,
};
export const skeleton32: Types.IEnemySummary = {
  name: "skeleton32",
  displayName: "Skeleton",
  level: 32,
  lifePoints: 1150,
  XPGivenCombatStyle: 50,
  XPGivenConstitution: 17,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 13,
  levelReqSlayer: 0,
  slayerClass: [`skeletons`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 354,
  defence: 23,
  accuracy: 354,
  maxHit: 92,
};
export const zombie12: Types.IEnemySummary = {
  name: "zombie12",
  displayName: "Zombie",
  level: 12,
  lifePoints: 900,
  XPGivenCombatStyle: 31,
  XPGivenConstitution: 10,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 8,
  levelReqSlayer: 0,
  slayerClass: [`zombies`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "fire",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 191,
  defence: 9,
  accuracy: 191,
  maxHit: 36,
};
export const zombie29: Types.IEnemySummary = {
  name: "zombie29",
  displayName: "Zombie",
  level: 29,
  lifePoints: 1050,
  XPGivenCombatStyle: 47,
  XPGivenConstitution: 15,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 12,
  levelReqSlayer: 0,
  slayerClass: [`zombies`],
  monsterStyle: `melee`,
  drops: [],

  affinities: {
    explicitWeakness: "fire",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 329,
  defence: 21,
  accuracy: 329,
  maxHit: 105,
};
export const ghost25: Types.IEnemySummary = {
  name: "ghost25",
  displayName: "Ghost",
  level: 25,
  lifePoints: 90,
  XPGivenCombatStyle: 41,
  XPGivenConstitution: 13,
  XPGivenPrayer: 0,
  XPGivenSlayer: 10.6,
  levelReqSlayer: 0,
  slayerClass: [`ghosts`],
  monsterStyle: `magic`,
  drops: [],

  affinities: {
    explicitWeakness: "ranged",
    weakStyle: "ranged",
    neutralStyle: "melee",
    strongStyle: "magic",
  },
  armor: 292,
  defence: 18,
  accuracy: 292,
  maxHit: 72,
};
export const blackknight: Types.IEnemySummary = {
  name: "blackknight",
  displayName: "Black Knight",
  level: 30,
  lifePoints: 1100,
  XPGivenCombatStyle: 49,
  XPGivenConstitution: 16,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 0,
  levelReqSlayer: 0,
  slayerClass: [``],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 341,
  defence: 22,
  accuracy: 341,
  maxHit: 110,
};
export const giantbat: Types.IEnemySummary = {
  name: "giantbat",
  displayName: "Giant bat",
  level: 44,
  lifePoints: 1600,
  XPGivenCombatStyle: 73,
  XPGivenConstitution: 24,
  XPGivenPrayer: 5.3,
  XPGivenSlayer: 18.8,
  levelReqSlayer: 0,
  slayerClass: [`bats`],
  monsterStyle: `magic`,
  drops: [],
  affinities: {
    explicitWeakness: "ranged",
    weakStyle: "ranged",
    neutralStyle: "magic",
    strongStyle: "melee",
  },
  armor: 486,
  defence: 32,
  accuracy: 486,
  maxHit: 128,
};
export const warpedbat: Types.IEnemySummary = {
  name: "warpedbat",
  displayName: "Warped bat",
  level: 16,
  lifePoints: 600,
  XPGivenCombatStyle: 35.7,
  XPGivenConstitution: 11.7,
  XPGivenPrayer: 5.3,
  XPGivenSlayer: 9.2,
  levelReqSlayer: 0,
  slayerClass: [`bats`],
  monsterStyle: `magic`,
  drops: [],
  affinities: {
    explicitWeakness: "ranged",
    weakStyle: "ranged",
    neutralStyle: "magic",
    strongStyle: "melee",
  },
  armor: 223,
  defence: 12,
  accuracy: 223,
  maxHit: 48,
};
export const cavebug8: Types.IEnemySummary = {
  name: "cavebug8",
  displayName: "Cave bug",
  level: 8,
  lifePoints: 300,
  XPGivenCombatStyle: 28,
  XPGivenConstitution: 9,
  XPGivenPrayer: 0,
  XPGivenSlayer: 7,
  levelReqSlayer: 7,
  slayerClass: ["cavebugs"],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 160,
  defence: 6,
  accuracy: 160,
  maxHit: 24,
};
export const cavebug12: Types.IEnemySummary = {
  name: "cavebug12",
  displayName: "Cave bug",
  level: 12,
  lifePoints: 450,
  XPGivenCombatStyle: 31,
  XPGivenConstitution: 10,
  XPGivenPrayer: 0,
  XPGivenSlayer: 8,
  levelReqSlayer: 7,
  slayerClass: ["cavebugs"],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 191,
  defence: 9,
  accuracy: 191,
  maxHit: 36,
};
export const caveslime: Types.IEnemySummary = {
  name: "caveslime",
  displayName: "Cave slime",
  level: 26,
  lifePoints: 950,
  XPGivenCombatStyle: 42.6,
  XPGivenConstitution: 14,
  XPGivenPrayer: 0,
  XPGivenSlayer: 11,
  levelReqSlayer: 17,
  slayerClass: ["caveslimes"],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 304,
  defence: 19,
  accuracy: 304,
  maxHit: 76,
};
export const bigfrog: Types.IEnemySummary = {
  name: "bigfrog",
  displayName: "Big frog",
  level: 36,
  lifePoints: 1300,
  XPGivenCombatStyle: 56,
  XPGivenConstitution: 19,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 14.4,
  levelReqSlayer: 1,
  slayerClass: [`frogs`],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 395,
  defence: 26,
  accuracy: 395,
  maxHit: 104,
};
export const giantfrog: Types.IEnemySummary = {
  name: "giantfrog",
  displayName: "Giant frog",
  level: 44,
  lifePoints: 1600,
  XPGivenCombatStyle: 73,
  XPGivenConstitution: 24,
  XPGivenPrayer: 15,
  XPGivenSlayer: 18.8,
  levelReqSlayer: 1,
  slayerClass: [`frogs`],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 486,
  defence: 32,
  accuracy: 486,
  maxHit: 128,
};
export const cavecrawler53: Types.IEnemySummary = {
  name: "cavecrawler53",
  displayName: "Cave crawler",
  level: 53,
  lifePoints: 1900,
  XPGivenCombatStyle: 95,
  XPGivenConstitution: 31,
  XPGivenPrayer: 0,
  XPGivenSlayer: 24.5,
  levelReqSlayer: 10,
  slayerClass: ["cavecrawlers"],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 590,
  defence: 38,
  accuracy: 590,
  maxHit: 152,
};
export const cavecrawler78: Types.IEnemySummary = {
  name: "cavecrawler78",
  displayName: "Cave crawler",
  level: 74,
  lifePoints: 2650,
  XPGivenCombatStyle: 192,
  XPGivenConstitution: 63,
  XPGivenPrayer: 0,
  XPGivenSlayer: 49.5,
  levelReqSlayer: 10,
  slayerClass: ["cavecrawlers"],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 928,
  defence: 53,
  accuracy: 928,
  maxHit: 224,
};
export const rockslug42: Types.IEnemySummary = {
  name: "rockslug42",
  displayName: "Rock slug",
  level: 42,
  lifePoints: 1750,
  XPGivenCombatStyle: 67,
  XPGivenConstitution: 22,
  XPGivenPrayer: 0,
  XPGivenSlayer: 20,
  levelReqSlayer: 20,
  slayerClass: ["rockslugs"],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 454,
  defence: 30,
  accuracy: 454,
  maxHit: 120,
};
export const rockslug49: Types.IEnemySummary = {
  name: "rockslug49",
  displayName: "Rock slug",
  level: 49,
  lifePoints: 1750,
  XPGivenCombatStyle: 83,
  XPGivenConstitution: 27,
  XPGivenPrayer: 0,
  XPGivenSlayer: 22,
  levelReqSlayer: 20,
  slayerClass: ["rockslugs"],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 536,
  defence: 35,
  accuracy: 536,
  maxHit: 140,
};
export const wallbeast: Types.IEnemySummary = {
  name: "wallbeast",
  displayName: "Wall Beast",
  level: 47,
  lifePoints: 1700,
  XPGivenCombatStyle: 80,
  XPGivenConstitution: 26,
  XPGivenPrayer: 0,
  XPGivenSlayer: 20.6,
  levelReqSlayer: 35,
  slayerClass: ["wallbeasts"],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 519,
  accuracy: 519,
  defence: 34,
  maxHit: 136,
};
export const warpedcockroach: Types.IEnemySummary = {
  name: "warpedcockroach",
  displayName: "Warped cockroach",
  level: 1,
  lifePoints: 50,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 0,
  levelReqSlayer: 0,
  slayerClass: [""],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 110,
  accuracy: 110,
  defence: 1,
  maxHit: 110,
};
export const corpsespider: Types.IEnemySummary = {
  name: "corpsespider",
  displayName: "Corpse spider",
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 26,
  XPGivenConstitution: 8,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 6.6,
  levelReqSlayer: 1,
  slayerClass: ["spiders", `zombies`],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 130,
  accuracy: 130,
  defence: 3,
  maxHit: 12,
};
export const warpedfly: Types.IEnemySummary = {
  name: "warpedfly",
  displayName: "Warped fly",
  level: 7,
  lifePoints: 250,
  XPGivenCombatStyle: 27,
  XPGivenConstitution: 9,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 0,
  levelReqSlayer: 0,
  slayerClass: [""],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 150,
  accuracy: 150,
  defence: 5,
  maxHit: 20,
};
export const crawlingcorpsetorso: Types.IEnemySummary = {
  name: "crawlingcorpsetorso",
  displayName: "Crawling corpse torso",
  level: 9,
  lifePoints: 350,
  XPGivenCombatStyle: 28,
  XPGivenConstitution: 9,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 10,
  levelReqSlayer: 1,
  slayerClass: [`zombies`],
  monsterStyle: `magic`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 171,
  accuracy: 171,
  defence: 7,
  maxHit: 28,
};
export const warpedrat: Types.IEnemySummary = {
  name: "warpedrat",
  displayName: "Warped rat",
  level: 12,
  lifePoints: 450,
  XPGivenCombatStyle: 30.9,
  XPGivenConstitution: 10.1,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 8,
  levelReqSlayer: 1,
  slayerClass: [`rats`],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "fire",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 191,
  accuracy: 191,
  defence: 9,
  maxHit: 36,
};
export const corpsearcher: Types.IEnemySummary = {
  name: "corpsearcher",
  displayName: "Corpse archer",
  level: 18,
  lifePoints: 650,
  XPGivenCombatStyle: 35.7,
  XPGivenConstitution: 11.7,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 10,
  levelReqSlayer: 1,
  slayerClass: [`zombies`],
  monsterStyle: `ranged`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 234,
  accuracy: 234,
  defence: 13,
  maxHit: 52,
};
export const skoblin: Types.IEnemySummary = {
  name: "skoblin",
  displayName: "Skoblin",
  level: 19,
  lifePoints: 700,
  XPGivenCombatStyle: 36.6,
  XPGivenConstitution: 12,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 9.4,
  levelReqSlayer: 1,
  slayerClass: [`skeletons`, `zombies`],
  monsterStyle: `melee`,
  drops: [],
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 245,
  accuracy: 245,
  defence: 14,
  maxHit: 56,
};
export const corpsemage: Types.IEnemySummary = {
  name: "corpsemage",
  displayName: "Corpse mage",
  level: 21,
  lifePoints: 750,
  XPGivenCombatStyle: 37.2,
  XPGivenConstitution: 12.2,
  XPGivenPrayer: 4.5,
  XPGivenSlayer: 9,
  levelReqSlayer: 1,
  slayerClass: [`zombies`],
  monsterStyle: `magic`,
  drops: [],
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 257,
  accuracy: 257,
  defence: 15,
  maxHit: 60,
};

export const AllEnemiesArray = [
  man,
  goblin,
  giantspider,
  chicken,
  cow,
  spider,
  giantrat,
  swampfrog,
  rat,
  farmer,
  zombie12,
  skeleton15,
  zombie29,
  skeleton32,
  ghost25,
  blackknight,
  giantbat,
  warpedbat,
  cavebug8,
  cavebug12,
  caveslime,
  bigfrog,
  giantfrog,
  cavecrawler53,
  cavecrawler78,
  rockslug42,
  rockslug49,
  wallbeast,
  warpedcockroach,
  corpsespider,
  warpedfly,
  crawlingcorpsetorso,
  warpedrat,
  corpsearcher,
  skoblin,
  corpsemage,
];
