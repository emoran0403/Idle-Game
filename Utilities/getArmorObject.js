// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the armor info object.
 */

(() => {
  // the value in the table may be off a little, so we need to do some checking
  //! this is not quite right yet :/
  let valueat15 = Number(
    document
      .getElementsByClassName(`plainlinks rsw-infobox no-parenthesis-style infobox-item`)[0]
      .children[0].children[15].textContent.slice(5, -6)
  );

  let valueat16 = Number(
    document
      .getElementsByClassName(`plainlinks rsw-infobox no-parenthesis-style infobox-item`)[0]
      .children[0].children[16].textContent.slice(5, -6)
  );

  let finalValue = `manualdataentryughhghh`;

  if (!isNaN(valueat15)) {
    // this happens when valueat15 returns NaN
    finalValue = valueat16;
  }
  if (!isNaN(valueat16)) {
    // this happens when valueat16 returns NaN
    finalValue = valueat15;
  }

  const armorInfo = {
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
    // the damage reduction number has a variable length, so cut from the start and end of the string to get the number
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

    //! child 15 or 16
    value: finalValue,
  };

  console.log(armorInfo);
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
