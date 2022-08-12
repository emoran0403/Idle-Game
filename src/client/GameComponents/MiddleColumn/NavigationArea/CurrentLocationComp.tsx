import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AllLocations } from "../../../../../Constants/LocationInfo";

const CurrentLocationComp = (props: Types.NoProps) => {
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;

  // useEffect(() => {}, []);

  return (
    <div className="text-center border border-dark border-2 rounded-3 h-100">
      <div>You are in </div>
      <div className="text-wrap">{AllLocations[CurrentLocation as keyof Types.IAllLocations][`displayName`]}</div>
    </div>
  );
};

export default CurrentLocationComp;

// style={{ width: `105px` }}
