// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the armor info object.
 */

const armorInfo = {
  name: `bronzeFullHelm`,

  levelReqDefence: Number(
    document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[2].children[0].textContent
  ),
  tier: 5,

  armor: 5,

  lifePointsExtra: 0,

  prayerPointsExtra: 0,

  damageReduction: 0.02,

  styleBonus: 0,

  value: 168,
};

/**
 * table document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0]
 * table Body document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0]
 * list of table rows = document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0].children
 * list of table rows = document.getElementsByClassName('plainlinks infobox-bonuses wikitable')[0].children[0].children
 */
