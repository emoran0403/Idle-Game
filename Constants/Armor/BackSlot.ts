import * as Types from "../../Types";

const listOfMeleeCapes = {
  bladestormdrape: {
    name: "bladestormdrape",
    levelReqDefence: 0,
    tier: 10,
    armor: 4.5,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 1.5,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 250,
  },
};
const listOfMagicCapes = {
  spellstormdrape: {
    name: "spellstormdrape",
    levelReqDefence: 0,
    tier: 10,
    armor: 4.5,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 1.5,
    value: 250,
  },
};
const listOfRangedCapes = {
  arrowstormdrape: {
    name: "arrowstormdrape",
    levelReqDefence: 0,
    tier: 10,
    armor: 4.5,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 0,
    styleBonusRanged: 1.5,
    styleBonusMagic: 0,
    value: 250,
  },
};
const listOfTypelessCapes = {
  pathfindercape: {
    name: "pathfindercape",
    levelReqDefence: 0,
    tier: 21,
    armor: 4.8,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 1,
  },
  teamcape: {
    name: "teamcape",
    levelReqDefence: 0,
    tier: 21,
    armor: 3.3,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 1.5,
    styleBonusRanged: 1.5,
    styleBonusMagic: 1.5,
    value: 50,
  },
  obsidiancape: {
    name: "obsidiancape",
    levelReqDefence: 0,
    tier: 55,
    armor: 18.8,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 13.4,
    styleBonusRanged: 13.4,
    styleBonusMagic: 13.4,
    value: 60000,
  },
};

export const backSlot: Types.IArmorSlotBack = {
  melee: listOfMeleeCapes,
  magic: listOfMagicCapes,
  ranged: listOfRangedCapes,
  hybrid: listOfTypelessCapes,
};
