import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentSkillComp = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.Skill.CurrentSkill);
  const Quest = useSelector((state: Types.AllState) => state.Quest.CurrentQuest);
  const Activity = useSelector((state: Types.AllState) => state.Activity.CurrentActivity);
  console.log(Activity);
  console.log(Quest);

  // useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3">
      {Activity === `Questing` ? <div>Current Quest: {Quest}</div> : <div>Training {state}</div>}
    </div>
  );
};

export default CurrentSkillComp;
