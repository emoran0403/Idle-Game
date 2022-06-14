import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentLocation = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;
  let locationToDisplay: string = "";

  for (let [key, value] of Object.entries(state)) {
    if (value === true) {
      locationToDisplay = key;
    }
  }
  useEffect(() => {}, []);
  return (
    <div>
      {locationToDisplay === "Lumbridge" && <div>You are in {locationToDisplay}</div>}
      {locationToDisplay === "Bank" && <div>You are at a {locationToDisplay}</div>}
    </div>
  );
};

export default CurrentLocation;
