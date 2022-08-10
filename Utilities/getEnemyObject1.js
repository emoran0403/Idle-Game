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
        return document.getElementsByTagName(`tbody`)[0].children[1].textContent.replaceAll(" ", "").toLowerCase();
      } catch (error) {
        return null;
      }
    })(),
    displayName: (() => {
      try {
        return document.getElementsByTagName(`tbody`)[0].children[1].textContent;
      } catch (error) {
        return null;
      }
    })(),
    level: (() => {
      try {
        let spot1 = Number(document.getElementsByTagName(`tbody`)[0].children[11].children[0].textContent);
        if (!isNaN(spot1)) {
          return spot1;
        }
        let spot2 = Number(document.getElementsByTagName(`tbody`)[0].children[12].children[0].textContent);

        if (!isNaN(spot2)) {
          return spot2;
        }
        return null;
      } catch (error) {
        return null;
      }
    })(),
    lifePoints: (() => {
      try {
        let spot1 = Number(document.getElementsByTagName(`tbody`)[0].children[11].children[1].textContent.replace(",", ""));
        if (!isNaN(spot1)) {
          return spot1;
        }
        let spot2 = Number(document.getElementsByTagName(`tbody`)[0].children[12].children[1].textContent.replace(",", ""));
        if (!isNaN(spot2)) {
          return spot2;
        }
        return null;
      } catch (error) {
        return null;
      }
    })(),
    XPGivenCombatStyle: (() => {
      try {
        let spot1 = Number(document.getElementsByTagName(`tbody`)[0].children[11].children[2].textContent);
        if (!isNaN(spot1)) {
          return spot1;
        }
        let spot2 = Number(document.getElementsByTagName(`tbody`)[0].children[12].children[2].textContent);

        if (!isNaN(spot2)) {
          return spot2;
        }
        return null;
      } catch (error) {
        return null;
      }
    })(),
    XPGivenConstitution: (() => {
      try {
        let spot1 = Number(document.getElementsByTagName(`tbody`)[0].children[11].children[3].textContent);
        if (!isNaN(spot1)) {
          return spot1;
        }
        let spot2 = Number(document.getElementsByTagName(`tbody`)[0].children[12].children[3].textContent);

        if (!isNaN(spot2)) {
          return spot2;
        }
        return null;
      } catch (error) {
        return null;
      }
    })(),
    XPGivenPrayer: (() => {
      try {
        let boneDrop = document.getElementsByClassName(
          `wikitable sortable filterable sticky-header item-drops autosort=1,a jquery-tablesorter rsw-dropsline-hidealch`
        )[0].children[1].children[0].children[1].textContent;
        if (!boneDrop) {
          return 0;
        }

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
    slayerClass: [""],
    monsterStyle: (() => {
      try {
        if (
          document.getElementsByTagName(`tbody`)[0].children[28].children[0].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[28].children[1].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[28].children[2].textContent.replace(",", "").length > 0
        ) {
          let melee = Number(document.getElementsByTagName(`tbody`)[0].children[28].children[0].textContent.replace(",", ""));
          let ranged = Number(document.getElementsByTagName(`tbody`)[0].children[28].children[1].textContent.replace(",", ""));
          let magic = Number(document.getElementsByTagName(`tbody`)[0].children[28].children[2].textContent.replace(",", ""));
          if (melee > ranged && melee > magic) {
            return `melee`;
          } else if (ranged > magic) {
            return `ranged`;
          } else {
            return `magic`;
          }
        }
        if (
          document.getElementsByTagName(`tbody`)[0].children[32].children[0].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[32].children[1].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[32].children[2].textContent.replace(",", "").length > 0
        ) {
          let melee = Number(document.getElementsByTagName(`tbody`)[0].children[32].children[0].textContent.replace(",", ""));
          let ranged = Number(document.getElementsByTagName(`tbody`)[0].children[32].children[1].textContent.replace(",", ""));
          let magic = Number(document.getElementsByTagName(`tbody`)[0].children[32].children[2].textContent.replace(",", ""));
          if (melee > ranged && melee > magic) {
            return `melee`;
          } else if (ranged > magic) {
            return `ranged`;
          } else {
            return `magic`;
          }
        }
      } catch (error) {
        return null;
      }
    })(),
    drops: [],

    affinities: {
      explicitWeakness: null,
      weakStyle: null,
      neutralStyle: null,
      strongStyle: null,
    },

    armor: (() => {
      try {
        if (document.getElementsByTagName(`tbody`)[0].children[35].children[0].textContent.replace(",", "").length > 0) {
          if (!isNaN(Number(document.getElementsByTagName(`tbody`)[0].children[35].children[0].textContent.replace(",", "")))) {
            return Number(document.getElementsByTagName(`tbody`)[0].children[35].children[0].textContent.replace(",", ""));
          }
        }

        return null;
      } catch (error) {
        return null;
      }
    })(),

    accuracy: (() => {
      try {
        if (
          document.getElementsByTagName(`tbody`)[0].children[28].children[0].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[28].children[1].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[28].children[2].textContent.replace(",", "").length > 0
        ) {
          let spot1 = Math.max(
            Number(document.getElementsByTagName(`tbody`)[0].children[28].children[0].textContent.replace(",", "")),
            Number(document.getElementsByTagName(`tbody`)[0].children[28].children[1].textContent.replace(",", "")),
            Number(document.getElementsByTagName(`tbody`)[0].children[28].children[2].textContent.replace(",", ""))
          );
          if (!isNaN(spot1)) {
            return spot1;
          }
        }
        if (
          document.getElementsByTagName(`tbody`)[0].children[32].children[0].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[32].children[1].textContent.replace(",", "").length > 0 &&
          document.getElementsByTagName(`tbody`)[0].children[32].children[2].textContent.replace(",", "").length > 0
        ) {
          let spot2 = Math.max(
            Number(document.getElementsByTagName(`tbody`)[0].children[32].children[0].textContent.replace(",", "")),
            Number(document.getElementsByTagName(`tbody`)[0].children[32].children[1].textContent.replace(",", "")),
            Number(document.getElementsByTagName(`tbody`)[0].children[32].children[2].textContent.replace(",", ""))
          );
          if (!isNaN(spot2)) {
            return spot2;
          }
        }

        return null;
      } catch (error) {
        return null;
      }
    })(),
    defence: (() => {
      try {
        if (document.getElementsByTagName(`tbody`)[0].children[31].children[1].textContent.replace(",", "").length > 0) {
          if (!isNaN(Number(document.getElementsByTagName(`tbody`)[0].children[31].children[1].textContent.replace(",", "")))) {
            return Number(document.getElementsByTagName(`tbody`)[0].children[31].children[1].textContent.replace(",", ""));
          }
        }

        if (document.getElementsByTagName(`tbody`)[0].children[35].children[1].textContent.replace(",", "").length > 0) {
          if (!isNaN(Number(document.getElementsByTagName(`tbody`)[0].children[35].children[1].textContent.replace(",", "")))) {
            return Number(document.getElementsByTagName(`tbody`)[0].children[35].children[1].textContent.replace(",", ""));
          }
        }

        return null;
      } catch (error) {
        return null;
      }
    })(),
    maxHit: null,
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
