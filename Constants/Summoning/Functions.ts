import * as Types from "../../Types";

// (must ensure that the sum of the values in the charm object is equal to 100)
// need an entry on the IEnemySummary indicating how many charms are dropped at once
// need an entry on the IEnemySummary indicating the charm percentages

/**
 * This function determines if a player receives a charm from defeating an enemy, and dispatches the charm to state.
 * @param enemy The player's current target
 */
export const handleCharmDrops = (enemy: Types.IEnemySummary) => {};

//# option 1
// define an object containing percentages
let tempobj = {
  nothing: 45,
  gold: 10,
  green: 20,
  crimson: 20,
  blue: 5,
};
// define an array holding the outcomes
// insert each key into the charmArray a number of times equal to the key's value
// choose a random number between 0 and 100
// find the drop using the random number as the charmArray index
// execute business logic based upon the result

//# option 2
// define 'thresholds / cut-off-points' for each outcome
// choose a random number between 0 and 100
// if there is a threshold that equals the random number, outcome is that threshold (min => nothing && max => blue)
// otherwise iterate throught the thresholds in pairs starting at i=0 & i=1
// if the random number is greater than the low threshold and lower than the high threshold, outcome is the low threshold
// find the closest threshold that does not exceed the random number
// that threshold corresponds to the outcome
// E.X.
// randNum = 78 => green = 75 < randNum => outcome = green
// randNum2 = 12 => min < randNum => outcome = no charm
// randNum3 = 100 => random number => outcome = blue
let tempObj2 = {
  min: 0,
  nothing: 45,
  gold: 55,
  green: 75,
  crimson: 95,
  blue: 100,
  max: 101,
};
