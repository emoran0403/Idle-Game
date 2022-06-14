import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentLocation = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  useEffect(() => {}, []);
  return (
    <div>
      <div>This is CurrentLocation</div>
      <div></div>
    </div>
  );
};

export default CurrentLocation;
