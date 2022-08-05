import * as Types from "../../Types";
import { getLevel } from "../XP Levels";

/**
 * This function determines if the player succeeds or fails thieving.
 * If the player is Thieving, and the game interval has ticked, run this function.
 * @param target The thieving target as Types.IThievingTarget.
 * @param ThievingXP The player's Thieving Experience.
 * @returns Returns an object containing a boolean indicating success or failure, and the amount of coins stolen.
 * Result Object =
 * {
 * outcome: boolean,
 * coins: number,
 * }
 */
export const resolveThieving = (target: Types.IThievingTarget, ThievingXP: number, AgilityXP: number) => {
  //? adjust function to account for buffs and boosts later

  interface IResultObject {
    outcome: boolean;
    coins: number;
  }

  //* define the result object with a false outcome and 0 coins, which will be updated below
  // stalls do not reward coins, so we can start with 0 and not need to reassign coins
  let resultObj: IResultObject = {
    outcome: false,
    coins: 0,
  };

  //* calculate the player's Thieving and Agility level

  let ThievingLevel = getLevel(ThievingXP);
  let AgilityLevel = getLevel(AgilityXP);

  //* determing the outcome of the thieving attempt
  // if the player's level is greater than 5 times the levelReqThieving plus 8, set the outcome to true
  if (ThievingLevel >= (target.levelReqThieving + 8) * 5) {
    resultObj.outcome = true;
  }

  // define the starting roll as 20
  let playerRoll = 20;

  // add a third of the difference of the player's level and the levelReqThieving rounded down
  playerRoll += Math.floor((ThievingLevel - target.levelReqThieving) / 3);

  // roll in the range 0-100 inclusive
  let gameRoll = Math.floor(Math.random() * 100);

  // if the player rolled higher than the game, set the outcome to true
  // console.log({ playerRoll, gameRoll });
  if (playerRoll >= gameRoll) {
    resultObj.outcome = true;
  } else {
    // otherwise, set the outcome to false
    resultObj.outcome = false;
  }

  //* determing the number of coins the player will receive
  // check if the player's target is a pickpocketing option via typeguarding so we can assign the coins
  if (`doubleloot` in target) {
    // each is<X> will be either false or the multiplier we want to use
    const isDouble = ThievingLevel >= target.doubleloot.levelReqThieving && AgilityLevel >= target.doubleloot.levelReqAgility && 2;
    const isTriple = isDouble && ThievingLevel >= target.tripleloot.levelReqThieving && AgilityLevel >= target.tripleloot.levelReqAgility && 3;
    const isQuad = isTriple && ThievingLevel >= target.quadloot.levelReqThieving && AgilityLevel >= target.quadloot.levelReqAgility && 4;

    // set the multiplier as the largest true result, which will the be multiplier to use
    const multiplier = isQuad || isTriple || isDouble || 1;

    // set the coin reward
    resultObj.coins = target.loot.Coins * multiplier;
  }

  return resultObj;
};
