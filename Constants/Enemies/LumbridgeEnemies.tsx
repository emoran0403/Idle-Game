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
//! need a way to calculate the stats from armor
// calculate affinity
//?added to big function
// const calcAffinity = (enemy: Types.IEnemySummary, playerStyle: Types.ICurrentStyleOptions) => {
//   // if the player is using the monsters weakness
//   if (playerStyle === enemy.affinities.explicitWeakness) {
//     return 90;
//   }
//   // if the player is using a neutralStyle, or has not chosen a style
//   if (playerStyle === enemy.affinities.neutralStyle || playerStyle === `none`) {
//     return 55;
//   }
//   // if the player is using a spell the monster is not weak to
//   // stab / crush / slash and bolt / arrow types are not implemented, which would go here
//   // Ex: the player is using fire spells, when the monster is weak to water spells, wont give the 90, but it is still the same style
//   let spellTypes = [`air`, `fire`, `water`, `earth`];
//   let playerIsUsingMagic = spellTypes.includes(playerStyle);

//   if (playerStyle === enemy.affinities.weakStyle || (playerIsUsingMagic && enemy.affinities.weakStyle === `magic`)) {
//     return 65;
//   }
//   // if the player is using a style the monster is strong against
//   return 45;
// };

// // calculate accuracy
// //?added to big function
// const calcAccuracy = (playerStyle: Types.ICurrentStyleOptions, level: number, weaponTier: number, Experience: Types.ISkillList) => {
//   let levelBonus: number = 0;
//   levelBonus = Math.floor((1 / 1250) * Math.pow(level, 3) + 4 * level + 40);
//   switch (playerStyle) {
//     case `melee`:
//       levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Attack), 3) + 4 * getLevel(Experience.Attack) + 40);
//       break;
//     case `none`:
//       levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Attack), 3) + 4 * getLevel(Experience.Attack) + 40);
//       break;
//     case `ranged`:
//       levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Ranged), 3) + 4 * getLevel(Experience.Ranged) + 40);
//       break;
//     default:
//       levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Magic), 3) + 4 * getLevel(Experience.Magic) + 40);
//       break;
//   }
//   let weaponTierBonus: number = Math.floor(2.5 * Math.floor((1 / 1250) * Math.pow(weaponTier, 3) + 4 * weaponTier + 40));
//   return levelBonus + weaponTierBonus;
// };

// // calculate enemy defence
// //?added to big function
// const calcTargetDefence = (enemy: Types.IEnemySummary) => {
//   return enemy.defence + enemy.armor;
// };

// // calculate the hitchance based on affinity, accuracy, and targetDefence
// //?added to big function
// const calcHitChance = (affinity: number, accuracy: number, targetDefence: number) => {
//   let hitChance = affinity * (accuracy / targetDefence);
//   return hitChance;
// };

// // determine if the player scored a hit
// const didPlayerHit = (hitchance: number) => {
//   // the player may have a hitchance greater than 100%, so return true if that occurs
//   // OR, roll 1-100, and if the player hitchance is greater, return true
//   if (hitchance >= 100 || Math.floor(Math.random() * 100) < hitchance) {
//     return true;
//   }
//   // if the game rolled higher than the hitchance, the player missed, so return false
//   return false;
// };

// // determine the damage
// //?added to big function

// const calcDamage = (playerStyle: Types.ICurrentStyleOptions, Experience: Types.ISkillList, boosts: number = 0, Equipment: Types.ICurrentEquipment) => {
//   //? boosts are available on capes and certain jewellery, default to 0 if no boosts present
//   // if the player is unarmed, use melee
//   switch (playerStyle) {
//     case `melee`:
//       return Math.floor(3.75 * getLevel(Experience.Strength) + 1.5 * boosts);
//     case `none`:
//       return Math.floor(3.75 * getLevel(Experience.Strength) + 1.5 * boosts);
//     case `ranged`:
//       return Math.floor(3.75 * getLevel(Experience.Ranged) + 1.5 * boosts);
//     default:
//       return Math.floor(3.75 * getLevel(Experience.Magic) + 1.5 * boosts);
//   }
// };

//! need a way to store the player's hit points and the enemies hitpoints in state, maybe in the component?
//! apply the damage to the enemy, if it is killed, award xp, if not, do another round of combat
