import * as Types from "../../Types";

export const EmptyArmorItemComposite: Types.ICompositeArmorItem = {
  name: "none",
  displayName: `None`,
  playerOwnsThisItem: true,
  levelReqDefence: -1,
  tier: 0,
  armor: 0,
  lifePointsExtra: 0,
  prayerPointsExtra: 0,
  damageReduction: 0,
  styleBonusMelee: 0,
  styleBonusRanged: 0,
  styleBonusMagic: 0,
  value: 0,
};

export const EmptyArmorItem: Types.IArmorItem = {
  name: "none",
  displayName: `None`,
  levelReqDefence: -1,
  tier: 0,
  armor: 0,
  lifePointsExtra: 0,
  prayerPointsExtra: 0,
  damageReduction: 0,
  styleBonusMelee: 0,
  styleBonusRanged: 0,
  styleBonusMagic: 0,
  value: 0,
};

export const EmptyWeaponItem: Types.IWeaponItem = {
  thisWeaponStyle: `melee`,
  levelReqAttack: 0,
  levelReqStrength: 0,
  levelReqMagic: 0,
  levelReqRanged: 0,
  damage: 0,
  accuracy: 0,
  staffElement: `air`,
  name: `none`,
  displayName: `None`,
  tier: 0,
  armor: 0,
  lifePointsExtra: 0,
  prayerPointsExtra: 0,
  damageReduction: 0,
  styleBonusMelee: 0,
  styleBonusRanged: 0,
  styleBonusMagic: 0,
  value: 0,
};

export const EmptyWeaponItemComposite: Types.ICompositeWeaponItem = {
  thisWeaponStyle: `melee`,
  playerOwnsThisItem: true,
  levelReqAttack: 0,
  levelReqStrength: 0,
  levelReqMagic: 0,
  levelReqRanged: 0,
  damage: 0,
  accuracy: 0,
  staffElement: `air`,
  name: `none`,
  displayName: `None`,
  tier: 0,
  armor: 0,
  lifePointsExtra: 0,
  prayerPointsExtra: 0,
  damageReduction: 0,
  styleBonusMelee: 0,
  styleBonusRanged: 0,
  styleBonusMagic: 0,
  value: 0,
};

//! i need an empty armor, and empty weapon item, and their composites
