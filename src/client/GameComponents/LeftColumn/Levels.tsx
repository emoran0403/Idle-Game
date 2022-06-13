import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Levels = (props: Types.NoProps) => {
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  useEffect(() => {}, []);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-header text-center">Levels</h5>
        <div>Woodcutting XP: {Experience.Woodcutting}</div>
        <div>Firemaking XP: {Experience.Firemaking}</div>
      </div>
    </div>
  );
};

export default Levels;

//! how can i convert an object to an array, so that i can map over the keys and display their values?
//! I want to eventually map over the experience, dynamically calculate levels, and show a bar graph of progress to the next level
