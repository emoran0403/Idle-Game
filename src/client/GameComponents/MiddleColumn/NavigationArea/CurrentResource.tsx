import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentResource = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentResource.Current);
  console.log(state);
  useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3">
      <div>Collecting {state}</div>
    </div>
  );
};

export default CurrentResource;
