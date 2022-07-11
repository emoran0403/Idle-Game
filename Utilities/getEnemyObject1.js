// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the enemy info object.
 */

(() => {
  let ENEMYINFO = {
    name: `man`,
    level: 4,
    lifePoints: 150,
    XPGivenCombatStyle: 25,
    XPGivenConstitution: 8,
    affinities: {
      explicitWeakness: `spells-fire`,
      weakStyle: `magic`,
      ownStyle: `melee`,
      strongStyle: `ranged`,
    },
    armor: 130,
    defence: 3,
    accuracy: 130,
  };

  console.log(ENEMYINFO);
})();

const exampleEnemyInfo = {
  name: `man`,
  level: 4,
  lifePoints: 150,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: `spells-fire`,
    weakStyle: `magic`,
    ownStyle: `melee`,
    strongStyle: `ranged`,
  },
  armor: 130,
  defence: 3,
  accuracy: 130,
};

/**
 * table document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0]
 * table Body document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0]
 * list of table rows = document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0].children
 * list of table rows = document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0].children
 *
 */
