import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { headSlot } from "../../../../Constants/Equipment/HeadSlot";
import { bodySlot } from "../../../../Constants/Equipment/BodySlot";
import { useSelector } from "react-redux";
import { emptyItem } from "../../../../Constants/Equipment/EmptyItem";
import { getLevel } from "../../../../Constants/XP Levels";

const WornEquipment = (props: Types.NoProps) => {
  const [currentHeadSlotItem, setCurrentHeadSlotItem] = useState<string>();
  const [currentBodySlotItem, setCurrentBodySlotItem] = useState<string>();

  // headsFromState is the state object containing the booleans signifying if the player owns an item
  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;
  const bodiesFromState = useSelector((state: Types.AllState) => state.BodySlot) as Types.IBodySlotSlice;

  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  // headsFromConstants is an array of each headpiece for the head slot
  let headsFromConstants: Types.IArmorItem[] = [
    ...Object.values(headSlot.melee),
    ...Object.values(headSlot.magic),
    ...Object.values(headSlot.ranged),
  ];

  // bodiesFromConstants is an array of each headpiece for the head slot
  let bodiesFromConstants: Types.IArmorItem[] = [
    ...Object.values(bodySlot.melee),
    ...Object.values(bodySlot.magic),
    ...Object.values(bodySlot.ranged),
  ];

  let compositeHeads: Types.ICompositeArmorItem[] = [emptyItem];
  let compositeBodies: Types.ICompositeArmorItem[] = [emptyItem];

  for (let i = 0; i < headsFromConstants.length; i++) {
    // i goes thru each head from constants...

    // allowing us to use the name property as the key to the state object...
    let playerOwnsThisItem: boolean = headsFromState[`playerOwns${headsFromConstants[i].name}` as keyof Types.IHeadSlotSlice];

    // so that we can make a composite head object from the constant info and the stateful info
    let tempHead: Types.ICompositeArmorItem = { ...headsFromConstants[i], playerOwnsThisItem };

    // push the items into an array so that we can map over it to make selector options
    compositeHeads.push(tempHead);
  }

  for (let i = 0; i < bodiesFromConstants.length; i++) {
    let playerOwnsThisItem: boolean = bodiesFromState[`playerOwns${bodiesFromConstants[i].name}` as keyof Types.IBodySlotSlice];
    let tempBody: Types.ICompositeArmorItem = { ...bodiesFromConstants[i], playerOwnsThisItem };
    compositeBodies.push(tempBody);
  }

  const handleSelectorStyle = (equipment: Types.ICompositeArmorItem) => {
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
  };

  useEffect(() => {}, []);
  return (
    <div className="border border-dark border-2 rounded-3">
      <h5 className="card-header text-center">WornEquipment</h5>
      <div className="d-flex flex-column">
        {/* Head Equipment Slot */}
        <label className="text-center" htmlFor="headSlot">
          Head Slot:
        </label>
        <select onChange={(e) => setCurrentHeadSlotItem(e.target.value)} className="form-select" name="headSlot" id="headSlot">
          {compositeHeads.map((headItem) => (
            <option
              value={headItem.name}
              disabled={!(headItem.playerOwnsThisItem && getLevel(Experience.Defense) >= headItem.levelReqDefence)}
              key={`Head-Item-${headItem.name}`}
              className={`${handleSelectorStyle(headItem)}`}
            >
              {headItem.displayName}
            </option>
          ))}
        </select>

        {/* Body Equipment Slot */}
        <label className="text-center" htmlFor="bodySlot">
          Body Slot:
        </label>
        <select onChange={(e) => setCurrentBodySlotItem(e.target.value)} className="form-select" name="bodySlot" id="bodySlot">
          {compositeBodies.map((bodyItem) => (
            <option
              value={bodyItem.name}
              disabled={!(bodyItem.playerOwnsThisItem && getLevel(Experience.Defense) >= bodyItem.levelReqDefence)}
              key={`Body-Item-${bodyItem.name}`}
              className={`${handleSelectorStyle(bodyItem)}`}
            >
              {bodyItem.displayName}
            </option>
          ))}
        </select>
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
