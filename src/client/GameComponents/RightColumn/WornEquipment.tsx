import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { headSlot } from "../../../../Constants/Equipment/HeadSlot";
import { useSelector } from "react-redux";

const WornEquipment = (props: Types.NoProps) => {
  // headsFromState is the state object containing the booleans signifying if the player owns an item
  const headsFromState = useSelector((state: Types.AllState) => state.HeadSlot) as Types.IHeadSlotSlice;
  //headSlot is a collecting opbject - further divides into combat style
  //headSlot.melee holds all the melee headSlot items

  let meleeItems = [...Object.values(headSlot.melee)];
  let magicItems = [...Object.values(headSlot.magic)];
  let rangedItems = [...Object.values(headSlot.ranged)];
  console.log(meleeItems);
  console.log(magicItems);
  console.log(rangedItems);
  let headsFromConstants = [
    ...[...Object.values(headSlot.melee)],
    ...[...Object.values(headSlot.magic)],
    ...[...Object.values(headSlot.ranged)],
  ];
  //! make a new type for this for that sweet autocomplete
  console.log(headsFromConstants);

  for (let i = 0; i < headsFromConstants.length; i++) {
    console.log(headsFromConstants[i].name);
  }

  // i need to get each slot's worth of equipment, and shuffle them together with their counterpart in state to add the playerOwns- property
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
