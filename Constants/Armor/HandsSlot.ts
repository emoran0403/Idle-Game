import * as Types from "../../Types";

const listOfMeleeHands = {};
const listOfMagicHands = {};
const listOfRangedHands = {
  leathervambraces: {
    name: "leathervambraces",
    levelReqDefence: 0,
    tier: 1,
    armor: 5.5,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0.02,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 18,
  },
  hardleathergloves: {
    name: "hardleathergloves",
    levelReqDefence: 10,
    tier: 10,
    armor: 10.1,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0.2,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 200,
  },
  studdedleathergloves: {
    name: "studdedleathergloves",
    levelReqDefence: 20,
    tier: 20,
    armor: 15.8,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0.4,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 300,
  },
  carapacegloves: {
    name: "carapacegloves",
    levelReqDefence: 30,
    tier: 30,
    armor: 22.7,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0.6,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 200,
  },
  greendragonhidevambraces: {
    name: "greendragonhidevambraces",
    levelReqDefence: 40,
    tier: 40,
    armor: 31.4,
    lifePointsExtra: 0,
    prayerPointsExtra: 0,
    damageReduction: 0.8,
    styleBonusMelee: 0,
    styleBonusRanged: 0,
    styleBonusMagic: 0,
    value: 2500,
  },
};

export const handsSlot: Types.IArmorSlotHands = {
  melee: listOfMeleeHands,
  magic: listOfMagicHands,
  ranged: listOfRangedHands,
};
