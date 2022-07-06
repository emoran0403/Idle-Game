// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the armor info object.
 */

// Value isn't standard, so I will need to enter it manually

(() => {
  let ARMORINFO = {
    name: document.title.replaceAll(` `, ``).split(`-`)[0].toLowerCase(),

    levelReqDefence: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[2].children[0].textContent
    ),
    tier: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[2].children[1].textContent
    ),

    armor: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[4].children[3].textContent
    ),

    lifePointsExtra: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[5].children[1].textContent
    ),

    prayerPointsExtra: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[6].children[4].textContent
    ),

    damageReduction: Number(
      document
        .getElementsByClassName("plainlinks infobox-bonuses wikitable")[0]
        .children[0].children[8].children[3].textContent.slice(5, -1)
    ),

    styleBonusMelee: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[10].children[2].textContent
    ),
    styleBonusRanged: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[10].children[3].textContent
    ),
    styleBonusMagic: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[10].children[4].textContent
    ),

    value: 0,
  };

  console.log(ARMORINFO);
})();

let exampleArmorInfo = {
  name: "bronzefullhelm",
  levelReqDefence: 1,
  tier: 5,
  armor: 30,
  lifePointsExtra: 0,
  prayerPointsExtra: 0,
  damageReduction: 0.02,
  styleBonusMelee: 0,
  styleBonusRanged: 0,
  styleBonusMagic: 0,
  value: 168,
};
/**
 * table document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0]
 * table Body document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0]
 * list of table rows = document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0].children
 * list of table rows = document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0].children
 *
 */
