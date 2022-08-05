import * as Types from "../../Types";
import { getLevel } from "../XP Levels";

/**
 * This function determines if the player succeeds or fails thieving.
 * If the player is Thieving, and the game interval has ticked, run this function.
 * @param target The thieving target as Types.IThievingTarget.
 * @param ThievingXP The player's Thieving Experience.
 * @returns Returns a boolean indicating success or failure in thieving.
 */
export const resolveThieving = (target: Types.IThievingTarget, ThievingXP: number) => {
  //? adjust function to account for buffs and boosts later
  // calculate the player's Thieving level

  let ThievingLevel = getLevel(ThievingXP);

  // if the player's level is greater than 5 times the levelReqThieving plus 8, return true
  if (ThievingLevel >= (target.levelReqThieving + 8) * 5) {
    return true;
  }

  // define the starting roll as 20
  let playerRoll = 20;

  // add a third of the difference of the player's level and the levelReqThieving rounded down
  playerRoll += Math.floor((ThievingLevel - target.levelReqThieving) / 3);

  // roll in the range 0-100 inclusive
  let gameRoll = Math.floor(Math.random() * 100);

  // if the player rolled higher than the game, return true
  // console.log({ playerRoll, gameRoll });
  if (playerRoll >= gameRoll) {
    return true;
  } else {
    return false;
  }
};
