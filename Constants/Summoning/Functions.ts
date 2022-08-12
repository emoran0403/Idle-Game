import * as Types from "../../Types";

// (must ensure that the sum of the values in the charm object is equal to 100)
// need an entry on the IEnemySummary indicating how many charms are dropped at once
// need an entry on the IEnemySummary indicating the charm percentages

/**
 * This function determines if a player receives a charm from defeating an enemy, and dispatches the charm to state.
 * @param enemy The player's current target
 */
export const handleCharmDrops = (enemy: Types.IEnemySummary) => {
  // define an object containing percentages

  let tempobj = {
    nothing: 45,
    gold: 10,
    green: 20,
    crimson: 20,
    blue: 5,
  };

  // define an array holding the outcomes
  let charmArray = [];
  // insert each key into the charmArray a number of times equal to the key's value

  // choose a random number between 0 and 100

  // find the charm name using the random number as the charmArray index

  // if a charm was chosen, then dispatch the chosen charm and quantity to the summoning charm slice
};
