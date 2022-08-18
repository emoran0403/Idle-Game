import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentSkillComp = (props: Types.NoProps) => {
  const Skill = useSelector((state: Types.AllState) => state.Skill.CurrentSkill);
  const Quest = useSelector((state: Types.AllState) => state.Quest.CurrentQuest);
  const Activity = useSelector((state: Types.AllState) => state.Activity.CurrentActivity);
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget);

  const arrayOfCombatStyleSkills = [`Attack`, `Strength`, `Defence`, `Ranged`, `Magic`];

  // console.log(Activity);
  // console.log(Quest);

  //@ this sets the background color if a target has been selected, but a combat style has not been selected
  const returnBackgroundColor = () => {
    // if an enemy is chosen, but an attack style has not been chosen
    if (Activity === `In combat` && !arrayOfCombatStyleSkills.includes(Skill)) {
      return `bg-danger`;
    }
    // else if (Activity === `In combat` && Target === `none`) {
    //   return `bg-danger`;
    // }
    else {
      return ``;
    }
  };

  // useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3 h-100">
      {Activity === `Questing` ? (
        <div>
          <div>Current Quest:</div>
          <div>{Quest}</div>
          {/* <div>A Fairy Tale II - Cure a Queen</div> */}
        </div>
      ) : (
        <div className={returnBackgroundColor()}>
          <div>Training</div>
          <div>{Skill}</div>
        </div>
      )}
    </div>
  );
};

export default CurrentSkillComp;

// style={{ width: `210px` }}
