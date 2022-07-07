import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { headSlot } from "../../../../Constants/Equipment/HeadSlot";
import { useSelector } from "react-redux";

const WornEquipment = (props: Types.NoProps) => {
  const stateLocation = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

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

{
  /* <div className="card">
  <div className="card-body">
    <h5 className="card-title">Stuff</h5>
    <div>stuff map here</div>
  </div>
</div> */
}
