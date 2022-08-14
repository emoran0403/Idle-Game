import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ListOfLogs } from "../../../../../Constants/Items/Logs";
import { ListOfFish } from "../../../../../Constants/Items/Fish";
import { Enemies } from "../../../../../Constants/Enemies";
import { ListOfOres } from "../../../../../Constants/Items/Ores";

import { ListOfPickpocketNPC } from "../../../../../Constants/Thieving/Pickpocketing";
import { ListOfPickpocketStalls } from "../../../../../Constants/Thieving/Stalls";

const CurrentResourceComp = (props: Types.NoProps) => {
  const Resource = useSelector((state: Types.AllState) => state.Resource.CurrentResource as Types.ICurrentResourceOptions);
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget as Types.ICurrentTargetOptions);
  const Activity = useSelector((state: Types.AllState) => state.Activity.CurrentActivity as Types.ICurrentActivityOptions);
  const Skill = useSelector((state: Types.AllState) => state.Skill.CurrentSkill);
  const playerLocation = useSelector((state: Types.AllState) => state.Location.CurrentLocation as Types.ICurrentLocationOptions);

  // useEffect(() => {}, []);

  //@ this sets the background color if a combat style has been selected, but a target has not been selected
  const returnBackgroundColor = () => {
    if (Activity === `In combat` && Target === `none`) {
      return `bg-danger`;
    } else {
      return ``;
    }
  };

  const displayResource = () => {
    // this function shows the display name of the current resource
    // console.log(Skill);
    if (Skill) {
      switch (Skill) {
        case `Woodcutting`: {
          return <div>{ListOfLogs[Resource as keyof Types.IListOfLogs].displayName}</div>;
        }
        case `Firemaking`: {
          return <div>{ListOfLogs[Resource as keyof Types.IListOfLogs].displayName}</div>;
        }
        case `Fishing`: {
          return <div>{ListOfFish[Resource as keyof Types.IListOfFish].displayName}</div>;
        }
        case `Mining`: {
          return <div>{ListOfOres[Resource as keyof Types.IListOfOres].displayName}</div>;
        }
        case `Thieving`: {
          if (ListOfPickpocketNPC[Resource as keyof Types.IListOfPickpocketNPC]) {
            return <div>{ListOfPickpocketNPC[Resource as keyof Types.IListOfPickpocketNPC].displayName}</div>;
          } else {
            return <div>{ListOfPickpocketStalls[Resource as keyof Types.IListOfPickpocketStall].displayName}</div>;
          }
        }
        default:
          return <div>none</div>;
      }
    }
  };
  // Types.IEnemyLocations

  const ThievingJSX = () => {
    return <div>Stealing from</div>;
  };
  const FiremakingJSX = () => {
    return <div>Burning</div>;
  };
  return (
    <div className="text-center border border-dark border-2 rounded-3 h-100">
      {Activity === `In combat` ? (
        <div className={returnBackgroundColor()}>
          <div>Fighting </div>
          {Enemies[playerLocation as keyof Types.IAllEnemies] && Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations] ? (
            <div>{Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations][`displayName`]}</div>
          ) : (
            <div>none</div>
          )}
        </div>
      ) : (
        <div>
          {Skill === `Thieving` && ThievingJSX()}
          {Skill === `Firemaking` && FiremakingJSX()}

          {displayResource()}
        </div>
      )}
    </div>
  );
};

export default CurrentResourceComp;

// style={{ width: `130px` }}
