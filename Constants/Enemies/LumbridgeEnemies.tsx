import { Enemies } from ".";
import WornEquipment from "../../src/client/GameComponents/RightColumn/WornEquipment";
import * as Types from "../../Types";

const man: Types.IEnemySummary = {
  name: `man`,
  displayName: `Man`,
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: `fire`,
    weakStyle: `magic`,
    neutralStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 130,
  defence: 3,
  accuracy: 130,
};
const goblin: Types.IEnemySummary = {
  name: `goblin`,
  displayName: `Goblin`,
  level: 2,
  lifePoints: 100,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: `air`,
    weakStyle: `magic`,
    neutralStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 120,
  defence: 2,
  accuracy: 120,
};
const giantspider: Types.IEnemySummary = {
  name: "giantspider",
  displayName: "Giant spider",
  level: 2,
  lifePoints: 100,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 120,
  defence: 2,
  accuracy: 120,
};
const chicken: Types.IEnemySummary = {
  name: "chicken",
  displayName: "Chicken",
  level: 1,
  lifePoints: 50,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: "fire",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 110,
  defence: 1,
  accuracy: 110,
};
const cow: Types.IEnemySummary = {
  name: "cow",
  displayName: "Cow",
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 26,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 130,
  defence: 3,
  accuracy: 130,
};
const spider: Types.IEnemySummary = {
  name: "spider",
  displayName: "Spider",
  level: 1,
  lifePoints: 50,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: "melee",
    weakStyle: "melee",
    neutralStyle: "ranged",
    strongStyle: "magic",
  },
  armor: 110,
  defence: 1,
  accuracy: 10,
};
const giantrat: Types.IEnemySummary = {
  name: "giantrat",
  displayName: "Giant rat",
  level: 7,
  lifePoints: 250,
  XPGivenCombatStyle: 27,
  XPGivenConstitution: 9,
  affinities: {
    explicitWeakness: "earth",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 150,
  defence: 5,
  accuracy: 150,
};
const swampfrog: Types.IEnemySummary = {
  name: "swampfrog",
  displayName: "Swamp frog",
  level: 16,
  lifePoints: 650,
  XPGivenCombatStyle: 36,
  XPGivenConstitution: 12,
  affinities: {
    explicitWeakness: "water",
    weakStyle: "magic",
    neutralStyle: "melee",
    strongStyle: "ranged",
  },
  armor: 223,
  defence: 12,
  accuracy: 223,
};

export const Lumbridge = {
  man,
  goblin,
  giantspider,
  chicken,
  cow,
  spider,
  giantrat,
  swampfrog,
};

/**
 * coins
 * ammunition
 * runes
 * fish
 * logs
 */

//! ill eventually need a way to deal with drops
