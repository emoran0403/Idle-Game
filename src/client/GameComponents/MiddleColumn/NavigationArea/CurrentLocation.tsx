import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentLocation = (props: Types.NoProps) => {
  const stateLocation = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  useEffect(() => {}, []);

  return (
    <div className="text-center border border-dark border-2 rounded-3">
      <div>You are in {stateLocation.Current}</div>
    </div>
  );
};

export default CurrentLocation;
