import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentLocationComp = (props: Types.NoProps) => {
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;

  useEffect(() => {}, []);

  return (
    <div className="text-center border border-dark border-2 rounded-3" style={{ width: `105px` }}>
      <div>You are in </div>
      <div>{CurrentLocation}</div>
    </div>
  );
};

export default CurrentLocationComp;
