import * as Types from "../../Types";

import { BackSlot } from "../Equipment/BackSlot";
import { BodySlot } from "../Equipment/BodySlot";
import { FeetSlot } from "../Equipment/FeetSlot";
import { HandsSlot } from "../Equipment/HandsSlot";
import { HeadSlot } from "../Equipment/HeadSlot";
import { LegsSlot } from "../Equipment/LegsSlot";
import { NeckSlot } from "../Equipment/NeckSlot";
import { RingSlot } from "../Equipment/RingSlot";
import { TwoHandSlot } from "../Equipment/TwoHandSlot";
import { getLevel } from "../XP Levels";
import {
  chicken,
  cow,
  farmer,
  ghost25,
  giantrat,
  giantspider,
  goblin,
  man,
  rat,
  skeleton15,
  skeleton32,
  spider,
  swampfrog,
  zombie12,
  zombie29,
  blackknight,
  bigfrog,
  rockslug42,
  rockslug49,
  cavebug8,
  cavebug12,
  caveslime,
  wallbeast,
  cavecrawler53,
  cavecrawler78,
  giantfrog,
  warpedcockroach,
  corpsespider,
  warpedfly,
  crawlingcorpsetorso,
  warpedrat,
  warpedbat,
  corpsearcher,
  skoblin,
  corpsemage,
} from "./AllEnemies";

// collecting all enemies within each location lets us access each location and their enemies via dynamic keys
//@ when adding new locations, also add to types under I<Location> Enemies => (ILumbridgeEnemies)
export const Draynor: Types.IDraynorEnemies = {
  man,
  farmer,
  rat,
  skeleton15,
  skeleton32,
  zombie12,
  zombie29,
  ghost25,
  blackknight,
};
export const Lumbridge: Types.ILumbridgeEnemies = {
  man,
  goblin,
  giantspider,
  chicken,
  cow,
  spider,
  giantrat,
  swampfrog,
};
export const LumbridgeSwampCave: Types.ILumbridgeSwampCaveEnemies = {
  bigfrog,
  rockslug42,
  rockslug49,
  cavebug8,
  cavebug12,
  caveslime,
  wallbeast,
  cavecrawler53,
  cavecrawler78,
  giantfrog,
};
export const LumbridgeCatacombs: Types.ILumbridgeCatacombsEnemies = {
  warpedcockroach,
  corpsespider,
  warpedfly,
  crawlingcorpsetorso,
  warpedrat,
  skeleton15,
  warpedbat,
  corpsearcher,
  skoblin,
  corpsemage,
};
export const Enemies: Types.IAllEnemies = {
  Lumbridge,
  Draynor,
  LumbridgeSwampCave,
  LumbridgeCatacombs,
};

export const playerAttacksTarget = (
  Target: Types.ICurrentTargetOptions,
  playerStyle: Types.ICurrentStyleOptions,
  playerLocation: Types.ICurrentLocationOptions,
  Experience: Types.ISkillList,
  Equipment: Types.ICurrentEquipment
) => {
  // define the enemy
  let Enemy: Types.IEnemySummary = Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations];
  // console.log(Enemies);
  // console.log(playerLocation);
  // console.log(Target);
  // console.log(`filler lol`);
  // console.log({ q: `current enemy:`, Enemy });

  // #1 calculate affinity
  // set the default to 55 just in case
  let affinity: number = 55;

  // if the player is using the monsters weakness
  if (playerStyle === Enemy.affinities.explicitWeakness) {
    affinity = 90;
  }
  // if the player is using a neutralStyle, or has not chosen a style
  if (playerStyle === Enemy.affinities.neutralStyle || playerStyle === `none`) {
    affinity = 55;
  }
  // if the player is using a spell the monster is not weak to
  // stab / crush / slash and bolt / arrow types are not implemented, which would go here
  // Ex: the player is using fire spells, when the monster is weak to water spells, wont give the 90, but it is still the same style
  let spellTypes = [`air`, `fire`, `water`, `earth`];
  let playerIsUsingMagic = spellTypes.includes(playerStyle);

  if (playerStyle === Enemy.affinities.weakStyle || (playerIsUsingMagic && Enemy.affinities.weakStyle === `magic`)) {
    affinity = 65;
  }
  /******************************************************************************************************* */
  // #2 calculate accuracy
  // set the levelBonus to 0 to start
  let levelBonus: number = 0;
  switch (playerStyle) {
    case `melee`:
      levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Attack), 3) + 4 * getLevel(Experience.Attack) + 40);
      break;
    // case `none`:
    //   levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Attack), 3) + 4 * getLevel(Experience.Attack) + 40);
    //   break;
    case `ranged`:
      levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Ranged), 3) + 4 * getLevel(Experience.Ranged) + 40);
      break;
    default:
      levelBonus = Math.floor((1 / 1250) * Math.pow(getLevel(Experience.Magic), 3) + 4 * getLevel(Experience.Magic) + 40);
      break;
  }
  // assign the weapon tier from equipment, then calculate the bonus
  let weaponTier: number = 0;

  //! i need to add up the stats for the equipment, this is a problem when we can mix and match armor
  //! - some  numbers wont be defined, which means we cant add them

  //! this happens here when checking for the tier of a non equipped item

  if (TwoHandSlot[Equipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand]) {
    weaponTier = TwoHandSlot[Equipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].tier;
  }

  let weaponTierBonus: number = Math.floor(2.5 * Math.floor((1 / 1250) * Math.pow(weaponTier, 3) + 4 * weaponTier + 40));

  let accuracy: number = levelBonus + weaponTierBonus;
  /******************************************************************************************************* */

  // #3 calculate enemy defence
  let enemyDefence: number = Enemy.defence + Enemy.armor;
  /******************************************************************************************************* */

  // #4 calculate hitChance
  let hitChance: number = affinity * (accuracy / enemyDefence);
  /******************************************************************************************************* */

  // #5 determine if the player hits the enemy
  // the player may have a hitchance greater than 100%, so return true if that occurs
  // OR, roll 1-100, and if the player hitchance is greater, return true
  if (hitChance >= 100 || Math.floor(Math.random() * 100) < hitChance) {
    // #6 calculate the damage done to the target
    //? boosts are available on capes and certain jewellery, default to 0 if no boosts present
    //? if the player is unarmed, use melee
    let boosts: number = 0;

    // this gives a random between 0 and 1, which is then used to reduce the max damage
    // damage = randomDamageScaler * maxHit
    let randomDamageScaler: number = Math.random();

    switch (playerStyle) {
      case `melee`:
        boosts =
          BackSlot[Equipment.BackSlot as keyof Types.IArmorSlotBack].styleBonusMelee +
          BodySlot[Equipment.BodySlot as keyof Types.IArmorSlotBody].styleBonusMelee +
          FeetSlot[Equipment.FeetSlot as keyof Types.IArmorSlotFeet].styleBonusMelee +
          HandsSlot[Equipment.HandsSlot as keyof Types.IArmorSlotHands].styleBonusMelee +
          HeadSlot[Equipment.HeadSlot as keyof Types.IArmorSlotHead].styleBonusMelee +
          LegsSlot[Equipment.LegsSlot as keyof Types.IArmorSlotLegs].styleBonusMelee +
          NeckSlot[Equipment.NeckSlot as keyof Types.IArmorSlotNeck].styleBonusMelee +
          RingSlot[Equipment.RingSlot as keyof Types.IArmorSlotRing].styleBonusMelee +
          TwoHandSlot[Equipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].styleBonusMelee;

        if (Math.floor(randomDamageScaler * (3.75 * getLevel(Experience.Strength) + 1.5 * boosts))) {
          return Math.floor(randomDamageScaler * ((3.75 * getLevel(Experience.Strength) + 1.5 * boosts) * 10));
        } else {
          return 1;
        }

      case `ranged`:
        boosts =
          BackSlot[Equipment.BackSlot as keyof Types.IArmorSlotBack].styleBonusRanged +
          BodySlot[Equipment.BodySlot as keyof Types.IArmorSlotBody].styleBonusRanged +
          FeetSlot[Equipment.FeetSlot as keyof Types.IArmorSlotFeet].styleBonusRanged +
          HandsSlot[Equipment.HandsSlot as keyof Types.IArmorSlotHands].styleBonusRanged +
          HeadSlot[Equipment.HeadSlot as keyof Types.IArmorSlotHead].styleBonusRanged +
          LegsSlot[Equipment.LegsSlot as keyof Types.IArmorSlotLegs].styleBonusRanged +
          NeckSlot[Equipment.NeckSlot as keyof Types.IArmorSlotNeck].styleBonusRanged +
          RingSlot[Equipment.RingSlot as keyof Types.IArmorSlotRing].styleBonusRanged +
          TwoHandSlot[Equipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].styleBonusRanged;

        if (Math.floor(randomDamageScaler * (3.75 * getLevel(Experience.Ranged) + 1.5 * boosts))) {
          return Math.floor(randomDamageScaler * ((3.75 * getLevel(Experience.Ranged) + 1.5 * boosts) * 10));
        } else {
          return 1;
        }
      default:
        boosts =
          BackSlot[Equipment.BackSlot as keyof Types.IArmorSlotBack].styleBonusMagic +
          BodySlot[Equipment.BodySlot as keyof Types.IArmorSlotBody].styleBonusMagic +
          FeetSlot[Equipment.FeetSlot as keyof Types.IArmorSlotFeet].styleBonusMagic +
          HandsSlot[Equipment.HandsSlot as keyof Types.IArmorSlotHands].styleBonusMagic +
          HeadSlot[Equipment.HeadSlot as keyof Types.IArmorSlotHead].styleBonusMagic +
          LegsSlot[Equipment.LegsSlot as keyof Types.IArmorSlotLegs].styleBonusMagic +
          NeckSlot[Equipment.NeckSlot as keyof Types.IArmorSlotNeck].styleBonusMagic +
          RingSlot[Equipment.RingSlot as keyof Types.IArmorSlotRing].styleBonusMagic +
          TwoHandSlot[Equipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].styleBonusMagic;

        if (Math.floor(randomDamageScaler * (3.75 * getLevel(Experience.Magic) + 1.5 * boosts))) {
          return Math.floor(randomDamageScaler * ((3.75 * getLevel(Experience.Magic) + 1.5 * boosts) * 10));
        } else {
          return 1;
        }
    }
  }
  // if the game rolled higher than the hitchance, the player missed, so return 0 damage
  return 0;
};
