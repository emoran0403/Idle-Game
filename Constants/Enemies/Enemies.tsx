import * as Types from "../../Types";

const man: Types.IEnemySummary = {
  name: `man`,
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: `fire`,
    weakStyle: `magic`,
    ownStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 130,
  defence: 3,
  accuracy: 130,
};

const goblin: Types.IEnemySummary = {
  name: `goblin`,
  level: 2,
  lifePoints: 100,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: `air`,
    weakStyle: `magic`,
    ownStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 120,
  defence: 2,
  accuracy: 120,
};

/**
 * coins
 * ammunition
 * runes
 * fish
 * logs
 */

//!
/**
 * add a drop function to roll drops
 * define tables for drops based on ammunition, runes, fish...
 *
 *
 *
 * needs offensive stats
 * needs a combat style used
 *
 * needs defensive stats
 * will change based on player combat style choice
 *
 *hit chance = affinity * (accuracy / target armor rating)
 affinity =
  90 for explicit weakness
  65 for weakness style
  55 for own style
  45 for strong style 
 *

 * accuracy from level = 0.0008 * L^3 +4L +40
 * accuracy from weapon tier bonus = 0.0008 * T^3 +4T +40
 *
 *
 *
 *
 *
 *
 */

const hitchance = (
  affinity: number,
  armorRating: number,
  accuracy: number,
  additiveAccuracyBoosts: number = 0,
  multiplicativeAccuracyBoosts: number = 1
) => {
  // calculates the hitchance based on combat variables
  let hitChance: number = affinity * Math.round((accuracy * multiplicativeAccuracyBoosts + additiveAccuracyBoosts) / armorRating);
  return hitChance;
};

const executeHit = () => {
  // calculates the hitchance, determines if a hit happens, rolls for damage
};

let strengthLevel: number = 1;

const damageDealt = (
  style: string,
  mainHand: boolean,
  damageMainHand: number,
  offHand: boolean,
  damageOffHand: number,
  twoHanded: boolean,
  damageTwoHanded: number,
  boosts: number = 1
) => {
  // calculates the potential damageDealt based on combat variables
  // abilities deal between 20% to 100% of their maximum damage - use this with the random number
  // will need to pull levels from state
  let damage: number = 0;

  switch (style) {
    case `melee`: {
      if (mainHand) {
        // if there is a mainhand weapon equipped, use the expression to add to the damage
        damage += (2.5 * strengthLevel + damageMainHand) * boosts;
      }
      if (offHand) {
        // if there is a offhand weapon equipped, use the expression to add to the damage
        damage += (1.25 * strengthLevel + damageOffHand) * (0.5 * boosts);
      }
      if (twoHanded) {
        // if there is a twohanded weapon equipped, use the expression to add to the damage
        damage += (3.75 * strengthLevel + damageTwoHanded) * (1.5 * boosts);
      }
      if (!mainHand && !offHand && !twoHanded) {
        // if there is no weapon equipped, use the expression to add to the damage
        damage += 3.75 * strengthLevel * boosts;
      }
      break;
    }
    case `magic`: {
      // magic
      break;
    }
    case `ranged`: {
      // ranged
    }
  }
};

/**
 * calculate hitchance for both parties
 * calculate damage for both parties
 *
 * apply damage if random number passes the hitchance threshold
 * if damage is enough to kill, then reward drops
 */
