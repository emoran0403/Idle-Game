import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";
import { getLevel, percentToNextLevel } from "../../../../Constants/XP Levels";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

//! use a useeffect to 'animate' the progress bars

const Levels = (props: Types.NoProps) => {
  const [totalExperience, setTotalExperience] = useState<number>(0);
  const [totalLevel, setTotalLevel] = useState<number>(0);

  // gets the player's experience
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  const showCombatLevel = () => {
    let att: number = getLevel(Experience.Attack);
    let str: number = getLevel(Experience.Strength);
    let mag: number = getLevel(Experience.Magic);
    let rng: number = getLevel(Experience.Ranged);
    let def: number = getLevel(Experience.Defence);
    let con: number = getLevel(Experience.Consitution);
    let pray: number = getLevel(Experience.Prayer);
    let summ: number = getLevel(Experience.Summoning);

    const combatLevel = Math.floor(((13 / 10) * Math.max(att + str, 2 * mag, 2 * rng) + def + con + Math.floor(0.5 * pray) + Math.floor(0.5 * summ)) / 4);
    return combatLevel;
  };

  useEffect(() => {
    // totals the experience and levels of the player.
    // sets state for tooltips
    let localTotalLevel: number = 0;
    let localTotalExperience: number = 0;

    for (let value of Object.values(Experience)) {
      localTotalExperience += value;
      localTotalLevel += getLevel(value);
    }
    setTotalExperience(localTotalExperience);
    setTotalLevel(localTotalLevel);
  }, []);

  return (
    <div className="card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "33%" }}>
      <div className="card-body">
        <h5 className="card-header text-center">
          Levels
          <div className="d-flex row">
            <h6 className="card-subtitle text-muted">Combat Level: {showCombatLevel()}</h6>
            <h6 className="card-subtitle text-muted">Total Levels: {totalLevel.toLocaleString("en-US")}</h6>
            <h6 className="card-subtitle text-muted">Total Experience: {totalExperience.toLocaleString("en-US")}</h6>
          </div>
        </h5>

        {Object.entries(Experience).map(([skill, xp]) => (
          <div key={`${skill}-progress-bar-div`}>
            <div>{`${skill} Lv. ${getLevel(xp)}`}</div>
            <ProgressBar className="border border-dark border-2">
              <ProgressBar
                striped
                variant="success"
                label={`${percentToNextLevel(xp)}%`}
                now={percentToNextLevel(xp)}
                key={`${skill}-progress-bar`}
                min={0}
                max={100}
              />
              <ProgressBar variant="danger" now={100 - percentToNextLevel(xp)} key={2} min={0} max={100} />
            </ProgressBar>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;

//! once we have icons, display it to the left of the div holding the name and the progress bar - almost like the icon as a bullet point
//! https://getbootstrap.com/docs/5.1/components/progress/
