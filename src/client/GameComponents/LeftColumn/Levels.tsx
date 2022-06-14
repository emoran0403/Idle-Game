import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";
import { getLevel } from "../../../../Constants/XP Levels";

const Levels = (props: Types.NoProps) => {
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-header text-center">Levels</h5>
        <div>Woodcutting Xp: {Experience.Woodcutting}</div>
        <div>Woodcutting Lv: {getLevel(Experience.Woodcutting)}</div>

        <div>Firemaking Xp: {Experience.Firemaking}</div>
        <div>Firemaking Xp: {getLevel(Experience.Firemaking)}</div>
      </div>
    </div>
  );
};

export default Levels;

//! how can i convert an object to an array, so that i can map over the keys and display their values?
//! I want to eventually map over the experience, dynamically calculate levels, and show a bar graph of progress to the next level
