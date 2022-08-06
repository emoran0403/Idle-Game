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
        return null;
      }
    })(),
    displayName: (() => {
      try {
        return document.title.split(` `)[0];
      } catch (error) {
        return null;
      }
    })(),
    level: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[12].children[0].textContent);
      } catch (error) {
        return null;
      }
    })(),
    lifePoints: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[12].children[1].textContent);
      } catch (error) {
        return null;
      }
    })(),
    XPGivenCombatStyle: (() => {
      try {
        return Math.round(Number(document.getElementsByTagName(`tbody`)[0].children[12].children[2].textContent));
      } catch (error) {
        return null;
      }
    })(),
    XPGivenConstitution: (() => {
      try {
        return Math.round(Number(document.getElementsByTagName(`tbody`)[0].children[12].children[3].textContent));
      } catch (error) {
        return null;
      }
    })(),
    XPGivenPrayer: (() => {
      try {
        let boneDrop = document.getElementsByClassName(
          `wikitable sortable filterable sticky-header item-drops autosort=1,a jquery-tablesorter rsw-dropsline-hidealch`
        )[0].children[1].children[0].children[1].textContent;

        switch (boneDrop) {
          case "Bones":
            return 4.5;
          case "Bat bones":
            return 5.3;
          case "Big bones":
            return 15;
          default:
            return `ADD NEW SWITCH CASE TO ENEMY UTILITY`;
        }
      } catch (error) {
        return null;
      }
    })(),
    XPGivenSlayer: (() => {
      try {
        return Number(document.getElementsByTagName(`TBODY`)[0].children[18].children[1].textContent);
      } catch (error) {
        return null;
      }
    })(),

    levelReqSlayer: (() => {
      try {
        return Number(document.getElementsByTagName(`TBODY`)[0].children[18].children[0].textContent);
      } catch (error) {
        return null;
      }
    })(),
    slayerClass: null,

    affinities: {
      explicitWeakness: null,
      weakStyle: null,
      neutralStyle: null,
      strongStyle: null,
    },

    armor: (() => {
      try {
        if (isNaN(Number(document.getElementsByTagName(`tbody`)[0].children[31].children[0].textContent))) {
          throw new error();
        }
        return Number(document.getElementsByTagName(`tbody`)[0].children[31].children[0].textContent);
      } catch (error) {
        return null;
      }
    })(),

    defence: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[31].children[1].textContent);
      } catch (error) {
        return null;
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
        return null;
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
//     return null;
//   }
// })();

let exampleEnemyInfo2 = {
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
