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
