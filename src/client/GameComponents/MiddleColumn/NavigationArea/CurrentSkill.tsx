import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentSkill = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentSkill.Current);

  useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3">
      <div>Training {state}</div>
    </div>
  );
};

export default CurrentSkill;
