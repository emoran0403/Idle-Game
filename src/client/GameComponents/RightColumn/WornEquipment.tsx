import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";

import { HeadSlot } from "../../../../Constants/Equipment/HeadSlot";
import { BodySlot } from "../../../../Constants/Equipment/BodySlot";
import { LegsSlot } from "../../../../Constants/Equipment/LegsSlot";
import { HandsSlot } from "../../../../Constants/Equipment/HandsSlot";
import { FeetSlot } from "../../../../Constants/Equipment/FeetSlot";
import { TwoHandSlot } from "../../../../Constants/Equipment/TwoHandSlot";

import { useSelector } from "react-redux";
import { EmptyItem } from "../../../../Constants/Equipment/EmptyItem";
import { getLevel } from "../../../../Constants/XP Levels";

const WornEquipment = (props: Types.WornEquipmentCompProps) => {
  // X - FromState is the state object containing the booleans signifying if the player owns X
  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;
  const bodiesFromState = useSelector((state: Types.AllState) => state.BodySlot) as Types.IBodySlotSlice;
  const legsFromState = useSelector((state: Types.AllState) => state.LegsSlot) as Types.ILegsSlotSlice;
  const handsFromState = useSelector((state: Types.AllState) => state.HandSlot) as Types.IHandSlotSlice;
  const feetFromState = useSelector((state: Types.AllState) => state.FeetSlot) as Types.IFeetSlotSlice;
  const twoHandFromState = useSelector((state: Types.AllState) => state.TwoHandSlot) as Types.ITwoHandSlotSlice;

  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  const handleSelectorStyle = (equipment: Types.ICompositeArmorItem | Types.ICompositeWeaponItem) => {
    // if the equipment is a piece of armor, it will have a defence level
    // based on the style, determine if the player has the appropriate offensive levels

    const playerOwnsItem = equipment.playerOwnsThisItem;
    if (`levelReqDefence` in equipment) {
      const canWear = getLevel(Experience.Defence) >= equipment.levelReqDefence;
      // check if the player owns the armor, and has the appropriate defence level
      if (playerOwnsItem && canWear) {
        // has levels and owns item = green background

        return `bg-success`;
      } else if (!playerOwnsItem && canWear) {
        // missing levels and owns item = yellow background

        return `bg-yellowlol`;
      } else if (playerOwnsItem && !canWear) {
        // has levels and does not own item = orange background

        return `bg-orangelol`;
      } else if (!playerOwnsItem && !canWear) {
        // missing levels and does not own item = red background
        return `bg-danger`;
      }
    } else if (equipment.thisWeaponStyle === `melee`) {
      const canWearAtk = getLevel(Experience.Defence) >= equipment.levelReqAttack;

      if (playerOwnsItem && canWearAtk) {
        // has levels and owns item = green background

        return `bg-success`;
      } else if (!playerOwnsItem && canWearAtk) {
        // missing levels and owns item = yellow background

        return `bg-yellowlol`;
      } else if (playerOwnsItem && !canWearAtk) {
        // has levels and does not own item = orange background

        return `bg-orangelol`;
      } else if (!playerOwnsItem && !canWearAtk) {
        // missing levels and does not own item = red background
        return `bg-danger`;
      }
    } else if (equipment.thisWeaponStyle === `magic`) {
      const canWearMagic = getLevel(Experience.Defence) >= equipment.levelReqMagic;

      if (playerOwnsItem && canWearMagic) {
        // has levels and owns item = green background

        return `bg-success`;
      } else if (!playerOwnsItem && canWearMagic) {
        // missing levels and owns item = yellow background

        return `bg-yellowlol`;
      } else if (playerOwnsItem && !canWearMagic) {
        // has levels and does not own item = orange background

        return `bg-orangelol`;
      } else if (!playerOwnsItem && !canWearMagic) {
        // missing levels and does not own item = red background
        return `bg-danger`;
      }
    } else if (equipment.thisWeaponStyle === `ranged`) {
      const canWearRange = getLevel(Experience.Defence) >= equipment.levelReqRanged;
      if (playerOwnsItem && canWearRange) {
        // has levels and owns item = green background

        return `bg-success`;
      } else if (!playerOwnsItem && canWearRange) {
        // missing levels and owns item = yellow background

        return `bg-yellowlol`;
      } else if (playerOwnsItem && !canWearRange) {
        // has levels and does not own item = orange background

        return `bg-orangelol`;
      } else if (!playerOwnsItem && !canWearRange) {
        // missing levels and does not own item = red background
        return `bg-danger`;
      }
    }
  };

  const displaySelectorTag = (itemsFromState: Types.AllSliceKeys, slotName: Types.IEquipmentSlotOptions, slotString: string) => {
    let compositeItems: Types.ICompositeArmorItem[] = [EmptyItem];

    let itemsFromConstants: Types.IArmorItem[] = [...Object.values(slotName)];
    // console.log(itemsFromState);
    // console.log();

    for (let i = 0; i < itemsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = itemsFromState[`playerOwns${itemsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...itemsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    const itemHasBeenEquipped = (e: React.ChangeEvent<HTMLSelectElement>) => {
      //! string type is `ok` since they can be keys of Types.ICurrentEquipment
      /**
       * this can be better described by stating the possible options of each slot in Types.ICurrentEquipment
       *
       */
      let newlyEquippedItemDisplayName: string = ``;
      let oldEquippedItemDisplayName: string = ``;

      // go thru all the composite items so we can set the context of the old and new items
      for (let i = 0; i < compositeItems.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositeItems[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositeItems[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositeItems[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositeItems[i].displayName;
        }
      }

      // if slot is none, we are equipping an item
      if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] === `none`) {
        props.newChatLog(`Equipped ${newlyEquippedItemDisplayName}`, `Equipment Swap`);

        // if slot is not none, and e.target.value is none, we are unequipping an item
      } else if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value === `none`) {
        props.newChatLog(`Unequipped ${oldEquippedItemDisplayName}`, `Equipment Swap`);

        //if slot is not none, and e.target.value is not none, we are swapping to a new item
      } else if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value !== `none`) {
        props.newChatLog(`Swapped to ${newlyEquippedItemDisplayName}`, `Equipment Swap`);
      }

      props.setCurrentEquipment({ ...props.currentEquipment, [e.target.name as keyof Types.ICurrentEquipment]: e.target.value });
    };

    return (
      <select onChange={(e) => itemHasBeenEquipped(e)} className="form-select" name={`${slotString}`}>
        {compositeItems.map((Item) => (
          <option value={Item.name} disabled={applyDisabledAttribute(Item)} key={`Slot-Item-${Item.name}`} className={`${handleSelectorStyle(Item)}`}>
            {Item.displayName}
          </option>
        ))}
      </select>
    );
  };

  const applyDisabledAttribute = (item: Types.ICompositeArmorItem | Types.ICompositeWeaponItem) => {
    if (!item.playerOwnsThisItem) {
      // if the player does not own the item, return true to disable the item
      // this can let us avoid checking the levels for each item
      return true;
    }

    // check this to type guard and infer Types.ICompositeArmorItem | Types.ICompositeWeaponItem
    if (`levelReqDefence` in item) {
      // if the item is armor
      if (getLevel(Experience.Defence) < item.levelReqDefence) {
        // if the armor is a higher level than the player has, return true to disable the item
        return true;
      }
      // if the item is a weapon, check the style and relevant level
    } else if (item.thisWeaponStyle === `melee` && getLevel(Experience.Attack) < item.levelReqAttack) {
      return true;
    } else if (item.thisWeaponStyle === `magic` && getLevel(Experience.Magic) < item.levelReqMagic) {
      return true;
    } else if (item.thisWeaponStyle === `ranged` && getLevel(Experience.Ranged) < item.levelReqRanged) {
      return true;
      // if none of the disqualifiers are present, then do not disable the item
    } else return false;
  };

  // useEffect(() => {}, []);
  return (
    <div className="border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "45%" }}>
      <h5 className="card-header text-center">WornEquipment</h5>
      <div className="d-flex flex-column">
        <div className="text-center">Head Slot:</div>
        {displaySelectorTag(headsFromState, HeadSlot, `HeadSlot`)}
        <div className="text-center">Body Slot:</div>
        {displaySelectorTag(bodiesFromState, BodySlot, `BodySlot`)}
        <div className="text-center">Legs Slot:</div>
        {displaySelectorTag(legsFromState, LegsSlot, `LegsSlot`)}
        <div className="text-center">Hands Slot:</div>
        {displaySelectorTag(handsFromState, HandsSlot, `HandsSlot`)}
        <div className="text-center">Feet Slot:</div>
        {displaySelectorTag(feetFromState, FeetSlot, `FeetSlot`)}
        <div className="text-center">TwoHand Slot:</div>
        {displaySelectorTag(twoHandFromState, TwoHandSlot, `TwoHandSlot`)}
      </div>
    </div>
  );
};

export default WornEquipment;
// gotta love truth tables lol
//  tt = t -> f
//  tf = f -> t
//  ft = f -> t
//  ff = f -> t
