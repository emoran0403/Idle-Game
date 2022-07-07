import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { headSlot } from "../../../../Constants/Equipment/HeadSlot";
import { useSelector } from "react-redux";

const WornEquipment = (props: Types.NoProps) => {
  // headsFromState is the state object containing the booleans signifying if the player owns an item
  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;

  // headsFromConstants is an array of each headpiece for the head slot
  let headsFromConstants: Types.IArmorItem[] = [
    ...Object.values(headSlot.melee),
    ...Object.values(headSlot.magic),
    ...Object.values(headSlot.ranged),
  ];
  // console.log(headsFromConstants);

  let compositeHeads: Types.ICompositeArmorItem[] = [];

  for (let i = 0; i < headsFromConstants.length; i++) {
    // i goes thru each head from constants...

    // allowing us to use the name property as the key to the state object...
    let playerOwnsThisItem: boolean = headsFromState[`playerOwns${headsFromConstants[i].name}` as keyof Types.IHeadSlotSlice];

    // so that we can make a composite head object from the constant info and the stateful info
    let tempHead: Types.ICompositeArmorItem = { ...headsFromConstants[i], playerOwnsThisItem };

    // push the items into an array so that we can map over it to make selector options
    compositeHeads.push(tempHead);
  }

  // console.log(compositeHeads);

  // done i need to get each slot's worth of equipment, and shuffle them together with their counterpart in state to add the playerOwns- property
  // once that property is added, i can then selectively add a disabled tag
  // i also need to add a disabled tag based on the level requirements of the item

  useEffect(() => {}, []);
  return (
    <div className="border border-dark border-2 rounded-3">
      <h5 className="card-header text-center">WornEquipment</h5>
      <div>
        {/* Head Equipment Slot */}
        <select>{}</select>
      </div>
    </div>
  );
};

export default WornEquipment;
