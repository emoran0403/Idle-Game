import * as Types from "../../Types";

const listOfMeleeRings = {
  warriorring: {
    name: "warriorring",
    levelReqDefence: 0,
    tier: 0,
    armor: 0,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 17.3,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 10000,
  },
};
const listOfMagicRings = {
  seersring: {
    name: "seersring",
    levelReqDefence: 0,
    tier: 0,
    armor: 0,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 17.3,
    value: 10000,
  },
};
const listOfRangedRings = {
  archerring: {
    name: "archerring",
    levelReqDefence: 0,
    tier: 0,
    armor: 0,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 0,
    styleBonusRanged: 17.3,
    styleBonusMagic: 0,
    value: 10000,
  },
};
const listOfTypelessRings = {
  ringofpotency: {
    name: "ringofpotency",
    levelReqDefence: 0,
    tier: 20,
    armor: 3.0,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 1.2,
    styleBonusRanged: 1.2,
    styleBonusMagic: 1.2,
    value: 350,
  },
  ringofwealth: {
    name: "ringofwealth",
    levelReqDefence: 0,
    tier: 40,
    armor: 0,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 10.7,
    styleBonusRanged: 10.7,
    styleBonusMagic: 10.7,
    value: 17625,
  },
  berserkerring: {
    name: "berserkerring",
    levelReqDefence: 0,
    tier: 30,
    armor: 5.1,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0,
    styleBonusMelee: 12.0,
    styleBonusRanged: 12.0,
    styleBonusMagic: 12.0,
    value: 10000,
  },
};

export const neckSlot: Types.IArmorSlotRing = {
  melee: listOfMeleeRings,
  magic: listOfMagicRings,
  ranged: listOfRangedRings,
  hybrid: listOfTypelessRings,
};
