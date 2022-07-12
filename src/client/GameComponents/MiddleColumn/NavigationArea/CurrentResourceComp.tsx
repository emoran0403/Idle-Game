import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentResourceComp = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.Resource.CurrentResource);
  // console.log(state);
  useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3">
      <div>Collecting {state}</div>
    </div>
  );
};

export default CurrentResourceComp;

//! need a piece of state to hold which enemy is the current target
//! need to conditionally display instead of the current resource based on combat or skilling
