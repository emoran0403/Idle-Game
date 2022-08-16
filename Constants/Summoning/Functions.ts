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
  max: 101 / 25,
};

let wow = {
  drop1: 25,
  drop2: 50,
  drop3: 20,
  // drop4: 4.55,
  // drop5: 0.45,
};
let wowadjusted = {
  drop1: 25,
  drop2: 75,
  drop3: 95,
};
// 24 - drop1
// 25 - drop1
// 26 - drop2

const getDrop = (lootTable: Types.IFlatObjectOfNums) => {
  // create a tuple array from the loot Table
  let tupleArrayFromInput = Object.entries(lootTable);
  // define an empty object to place the drops and their adjusted values
  let adjustedLootTable: Types.IFlatObjectOfNums = {};
  // define a running sum to calculate relative weights
  let currentSum = 0;
  // iterate through each tuple, adding the current drop and its relative weight to the adjustedLootTable,
  for (const [drop, rate] of tupleArrayFromInput) {
    // increment the current sum
    currentSum += rate;
    // add to the adjustedLootTable object, giving it the drop property and the adjust value
    adjustedLootTable[`${drop}`] = currentSum + rate;
  }
  // define a random number between 0 and the current sum - this allows us to weight the table relatively
  let randNum = Math.floor(Math.random() * currentSum);
  // sort the array to ensure the first element has the lowest value
  let sortedTupleArrayFromAdjustedLootTable = Object.entries(adjustedLootTable).sort((a, b) => a[1] - b[1]);
  // filter the array, leaving only tuples whose value is greater than randNum
  sortedTupleArrayFromAdjustedLootTable.filter((tuple) => tuple[1] >= randNum);
  // return the drop
  return sortedTupleArrayFromAdjustedLootTable[0][0];
};
