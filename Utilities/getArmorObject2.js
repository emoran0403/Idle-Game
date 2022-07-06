(() => {
  let ARMORINFO = {
    name: document.title.replaceAll(` `, ``).split(`-`)[0].toLowerCase(),

    levelReqDefence: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[1].children[0].textContent
    ),

    tier: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[5].children[0].textContent
    ),

    armor: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[12].children[1].textContent
    ),

    lifePointsExtra: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[13].children[1].textContent
    ),

    prayerPointsExtra: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[14].children[1].textContent
    ),

    damageReduction: Number(
      document
        .getElementsByClassName("plainlinks infobox-bonuses wikitable")[0]
        .children[0].children[12].children[2].children[1].textContent.substring(
          document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[12].children[2].children[1]
            .textContent.length - 1,
          0
        )
    ),

    styleBonusMelee: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[14].children[2].textContent
    ),

    styleBonusRanged: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[14].children[3].textContent
    ),

    styleBonusMagic: Number(
      document.getElementsByClassName("plainlinks infobox-bonuses wikitable")[0].children[0].children[14].children[4].textContent
    ),

    value: 0,
  };

  console.log(ARMORINFO);
})();
