// use this to grab information from the wiki
// must be from the https://runescape.wiki/ site, not the fandom wiki

/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the armor info object.
 */

// Value isn't standard, so I will need to enter it manually

(() => {
  let WEAPONINFO = {
    name: document.title.replaceAll(` `, ``).split(`-`)[0].toLowerCase(),

    levelReqAttack: Number(document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[1].textContent),
    levelReqStrength: 123,
    levelReqMagic: 123,
    levelReqRanged: 123,
    tier: Number(document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[5].textContent),

    damage: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[7].children[1].textContent
    ),
    accuracy: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[8].children[1].textContent
    ),

    lifePointsExtra: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[14].children[1].textContent
    ),

    prayerPointsExtra: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[15].children[1].textContent
    ),

    damageReduction: Number(
      document
        .getElementsByClassName("plainlinks infobox-bonuses wikitable")[0]
        .children[0].children[13].children[2].textContent.slice(5, -1)
    ),

    styleBonusMelee: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[15].children[2].textContent
    ),
    styleBonusRanged: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[15].children[3].textContent
    ),
    styleBonusMagic: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[15].children[4].textContent
    ),
    staffElement: `none`,

    value: 0,
  };

  console.log(WEAPONINFO);
})();
