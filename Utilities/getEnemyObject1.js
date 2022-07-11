// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the enemy info object.
 */

//@ table body -    document.getElementsByTagName(`tbody`)[0].children

(() => {
  let ENEMYINFO = {
    name: (() => {
      try {
        return document.getElementById(`firstHeading`).textContent.toLowerCase();
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    level: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[12].children[0].textContent);
      } catch (error) {
        return `enterLEVELmanually`;
      }
    })(),

    lifePoints: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[12].children[1].textContent);
      } catch (error) {
        return `enterlifepointsmanually`;
      }
    })(),
    XPGivenCombatStyle: (() => {
      try {
        return Math.round(Number(document.getElementsByTagName(`tbody`)[0].children[12].children[2].textContent));
      } catch (error) {
        return `enterXPGivenCombatStylemanually`;
      }
    })(),
    XPGivenConstitution: (() => {
      try {
        return Math.round(Number(document.getElementsByTagName(`tbody`)[0].children[12].children[3].textContent));
      } catch (error) {
        return `enterXPGivenConstitutionmanually`;
      }
    })(),

    affinities: {
      explicitWeakness: `enterManually`,
      weakStyle: `enterManually`,
      neutralStyle: `enterManually`,
      strongStyle: `enterManually`,
    },

    armor: (() => {
      try {
        if (isNaN(Number(document.getElementsByTagName(`tbody`)[0].children[31].children[0].textContent))) {
          throw new error();
        }
        return Number(document.getElementsByTagName(`tbody`)[0].children[31].children[0].textContent);
      } catch (error) {
        return `enterArmorManually`;
      }
    })(),

    defence: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[31].children[1].textContent);
      } catch (error) {
        return `enterDefenceManually`;
      }
    })(),

    accuracy: (() => {
      try {
        return Math.max(
          Number(document.getElementsByTagName(`tbody`)[0].children[28].children[0].textContent),
          Number(document.getElementsByTagName(`tbody`)[0].children[28].children[1].textContent),
          Number(document.getElementsByTagName(`tbody`)[0].children[28].children[2].textContent)
        );
      } catch (error) {
        return `enterAccuracyManually`;
      }
    })(),
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

// (() => {
//   try {
//     return `statementhere`;
//   } catch (error) {
//     return `enterTHISmanually`;
//   }
// })();

let wow = {
  name: "giant spider",
  level: 2,
  lifePoints: 100,
  XPGivenCombatStyle: 25,
  XPGivenConstitution: 8,
  affinities: {
    explicitWeakness: "enterManually",
    weakStyle: "enterManually",
    ownStyle: "enterManually",
    strongStyle: "enterManually",
  },
  armor: "enterArmorManually",
  defence: "enterDefenceManually",
  accuracy: "enterAccuracyManually",
};
