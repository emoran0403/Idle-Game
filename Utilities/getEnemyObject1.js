// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the enemy info object.
 */

//@ table body -    document.getElementsByTagName(`tbody`)[0].children

(() => {
  let ENEMYINFO = {
    name: document.getElementById(`firstHeading`).textContent.toLowerCase(),
    level: Number(document.getElementsByTagName(`tbody`)[0].children[12].children[0].textContent),
    lifePoints: Number(document.getElementsByTagName(`tbody`)[0].children[12].children[1].textContent),
    XPGivenCombatStyle: Math.round(Number(document.getElementsByTagName(`tbody`)[0].children[12].children[2].textContent)),
    XPGivenConstitution: Math.round(Number(document.getElementsByTagName(`tbody`)[0].children[12].children[3].textContent)),

    affinities: { explicitWeakness: `enterManually`, weakStyle: `enterManually`, ownStyle: `enterManually`, strongStyle: `enterManually` },

    armor: Number(document.getElementsByTagName(`tbody`)[0].children[31].children[0].textContent),
    defence: Number(document.getElementsByTagName(`tbody`)[0].children[31].children[1].textContent),
    accuracy: Number(document.getElementsByTagName(`tbody`)[0].children[28].children[0].textContent),
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
