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

const WornEquipment = (props: Types.NoProps) => {
  const constants = [HeadSlot, BodySlot, LegsSlot, HandsSlot, FeetSlot, TwoHandSlot];

  type constantswow =
    | Types.IArmorSlotBody
    | Types.IArmorSlotHead
    | Types.IArmorSlotLegs
    | Types.IArmorSlotHands
    | Types.IArmorSlotFeet
    | Types.IArmorSlotTwoHand;

  const [currentEquipment, setCurrentEquipment] = useState<{}>({
    BackSlot: `none`,
    BodySlot: `none`,
    FeetSlot: `none`,
    HandsSlot: `none`,
    HeadSlot: `none`,
    LegsSlot: `none`,
    NeckSlot: `none`,
    RingSlot: `none`,
    TwoHandSlot: `none`,
  });

  // X - FromState is the state object containing the booleans signifying if the player owns X
  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;
  const bodiesFromState = useSelector((state: Types.AllState) => state.BodySlot) as Types.IBodySlotSlice;
  const legsFromState = useSelector((state: Types.AllState) => state.LegsSlot) as Types.ILegsSlotSlice;
  const handsFromState = useSelector((state: Types.AllState) => state.HandSlot) as Types.IHandSlotSlice;
  const feetFromState = useSelector((state: Types.AllState) => state.FeetSlot) as Types.IFeetSlotSlice;
  const twoHandFromState = useSelector((state: Types.AllState) => state.TwoHandSlot) as Types.ITwoHandSlotSlice;

  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  const handleSelectorStyle = (equipment: Types.ICompositeArmorItem | Types.ICompositeWeaponItem) => {
    if (`levelReqDefence` in equipment) {
      // if the equipment is a piece of armor, it will have a defence level
      if (equipment.playerOwnsThisItem && getLevel(Experience.Defense) >= equipment.levelReqDefence) {
        // has levels and owns item = green background

        return `bg-success`;
      } else if (equipment.playerOwnsThisItem.valueOf() == false && getLevel(Experience.Defense) >= equipment.levelReqDefence) {
        // missing levels and owns item = yellow background

        return `bg-yellowlol`;
      } else if (equipment.playerOwnsThisItem && getLevel(Experience.Defense) < equipment.levelReqDefence) {
        // has levels and does not own item = orange background

        return `bg-orangelol`;
      } else if (equipment.playerOwnsThisItem.valueOf() == false && getLevel(Experience.Defense) < equipment.levelReqDefence) {
        // missing levels and does not own item = red background
        return `bg-danger`;
      }
    } else if (equipment) {
      //! based on the style, determine if the player has the appropriate offensive levels
    }
  };

  const displaySelectorTag = (itemsFromState: Types.AllSliceKeys, slotName: constantswow, slotString: string) => {
    let compositeItems: Types.ICompositeArmorItem[] = [EmptyItem];

    let itemsFromConstants: Types.IArmorItem[] = [
      ...Object.values(slotName.melee),
      ...Object.values(slotName.magic),
      ...Object.values(slotName.ranged),
    ];
    console.log(itemsFromState);
    console.log();

    for (let i = 0; i < itemsFromConstants.length; i++) {
      let playerOwnsThisItem: boolean = itemsFromState[`playerOwns${itemsFromConstants[i].name}` as keyof Types.AllSliceKeys];
      let tempItem: Types.ICompositeArmorItem = { ...itemsFromConstants[i], playerOwnsThisItem };
      compositeItems.push(tempItem);
    }

    return (
      <select
        onChange={(e) => setCurrentEquipment({ ...currentEquipment, [e.target.name]: e.target.value })}
        className="form-select"
        name={`${slotString}`}
      >
        {compositeItems.map((Item) => (
          <option
            value={Item.name}
            disabled={!(Item.playerOwnsThisItem && getLevel(Experience.Defense) >= Item.levelReqDefence)}
            key={`Slot-Item-${Item.name}`}
            className={`${handleSelectorStyle(Item)}`}
          >
            {Item.displayName}
          </option>
        ))}
      </select>
    );
  };

  useEffect(() => {}, []);
  return (
    <div className="border border-dark border-2 rounded-3">
      <h5 className="card-header text-center">WornEquipment</h5>
      <div className="d-flex flex-column">
        Head Equipment Slot
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
