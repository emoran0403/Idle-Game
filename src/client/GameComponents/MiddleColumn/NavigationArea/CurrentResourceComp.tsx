import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ListOfLogs } from "../../../../../Constants/Items/Logs";
import { ListOfFish } from "../../../../../Constants/Items/Fish";

const CurrentResourceComp = (props: Types.NoProps) => {
  const Resource = useSelector((state: Types.AllState) => state.Resource.CurrentResource as Types.ICurrentResourceOptions);
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget as Types.ICurrentTargetOptions);
  const Activity = useSelector((state: Types.AllState) => state.Activity.CurrentActivity as Types.ICurrentActivityOptions);
  const Skill = useSelector((state: Types.AllState) => state.Skill.CurrentSkill);

  // console.log(Target);
  // useEffect(() => {}, []);

  const displayResource = () => {
    // this function shows the display name of the current resource
    console.log(Skill);
    if (Skill) {
      switch (Skill) {
        case `Woodcutting`: {
          return <div>{ListOfLogs[Resource as keyof Types.IListOfLogs].displayName}</div>;
        }
        case `Fishing`: {
          return <div>{ListOfFish[Resource as keyof Types.IListOfFish].displayName}</div>;
        }
        default:
          return <div>none</div>;
      }
    }
  };

  return (
    <div className="text-center border border-dark border-2 rounded-3" style={{ width: `130px` }}>
      {Activity === `In combat` ? (
        <div>
          <div>Fighting </div>
          <div>{Target}</div>
        </div>
      ) : (
        <div>
          <div>Collecting</div>
          {displayResource()}
        </div>
      )}
    </div>
  );
};

export default CurrentResourceComp;
