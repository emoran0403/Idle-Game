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

  useEffect(() => {}, [Resource, Target, Activity, Skill, playerLocation]);

  /**
   * This function sets the background color based on the current state.
   * @returns Returns a classname to set the background color if a combat style has been selected, but a target has not been selected.
   */
  const returnBackgroundColor = () => {
    if (Activity === `In combat` && Target === `none`) {
      return `bg-danger`;
    } else {
      return ``;
    }
  };
  /**
   * ! when adding new skills that consume resources, add an if else block like firemaking.
   * Displays a conditional message based on the current resource the player is gathering / using.
   * @returns Returns a conditional message based on the current resource the player is gathering / using.
   */
  const displayResource = () => {
    // this function shows the display name of the current resource
    // console.log(Skill);
    if (Skill) {
      switch (Skill) {
        case `Woodcutting`: {
          return <div>{ListOfLogs[Resource as keyof Types.IListOfLogs].displayName}</div>;
        }
        case `Firemaking`: {
          if (ListOfLogs[Resource as keyof Types.IListOfLogs]) {
            return <div>{ListOfLogs[Resource as keyof Types.IListOfLogs].displayName}</div>;
          } else {
            return <div>none</div>;
          }
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
  const MiningJSX = () => {
    return (
      <div>
        <div>Mining</div>
        {displayResource()}
      </div>
    );
  };
  const FishingJSX = () => {
    return (
      <div>
        <div>Fishing</div>
        {displayResource()}
      </div>
    );
  };
  const WoodcuttingJSX = () => {
    return (
      <div>
        <div>Cutting</div>
        {displayResource()}
      </div>
    );
  };
  const ThievingJSX = () => {
    return (
      <div>
        <div>Stealing from</div>
        {displayResource()}
      </div>
    );
  };
  const FiremakingJSX = () => {
    return (
      <div>
        <div>Burning</div>
        {displayResource()}
      </div>
    );
  };
  const CombatJSX = () => {
    return (
      <div className={returnBackgroundColor()}>
        {Enemies[playerLocation as keyof Types.IAllEnemies] && Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations] ? (
          <div>
            <div>Fighting</div>
            <div>{Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations][`displayName`]}</div>
          </div>
        ) : (
          <div>No Target Selected</div>
        )}
      </div>
    );
  };
  const AllJSX = () => {
    switch (Activity) {
      case `In combat`:
        return CombatJSX();
        break;
      case `Questing`:
        return <div>You are Questing</div>;
        break;
      case `Skilling`:
        switch (Skill) {
          case `Fishing`:
            return FishingJSX();
            break;
          case `Woodcutting`:
            return WoodcuttingJSX();
            break;
          case `Thieving`:
            return ThievingJSX();
            break;
          case `Firemaking`:
            return FiremakingJSX();
            break;
          case `Mining`:
            return MiningJSX();
            break;
        }
        break;
      default:
        return <div>You are Idle</div>;
    }
  };

  return <div className="text-center border border-dark border-2 rounded-3 h-100">{AllJSX()}</div>;
};

export default CurrentResourceComp;

// style={{ width: `130px` }}

// questing;
// Combat;
// skilling;

{
}
