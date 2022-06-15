import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector } from "react-redux";
import { getLevel, percentToNextLevel } from "../../../../Constants/XP Levels";
import { useEffect, useState } from "react";

const Levels = (props: Types.NoProps) => {
  const [toolTipText, setToolTipText] = useState<string>("");
  const [tipsToShow, setTipsToShow] = useState<Types.IFlatObjectOfBooleans>({});
  const [totalExperience, setTotalExperience] = useState<number>(0);
  const [totalLevel, setTotalLevel] = useState<number>(0);

  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  const showCombatLevel = () => {
    let att: number = getLevel(Experience.Attack);
    let str: number = getLevel(Experience.Strength);
    let mag: number = getLevel(Experience.Magic);
    let rng: number = getLevel(Experience.Ranged);
    let def: number = getLevel(Experience.Defense);
    let con: number = getLevel(Experience.Consitution);
    let pray: number = getLevel(Experience.Prayer);
    let summ: number = getLevel(Experience.Summoning);

    const combatLevel = Math.floor(
      ((13 / 10) * Math.max(att + str, 2 * mag, 2 * rng) + def + con + Math.floor(0.5 * pray) + Math.floor(0.5 * summ)) / 4
    );
    return combatLevel;
  };

  const handleSetToolTip = (name: string, XP: number) => {
    const XPBarPercent = percentToNextLevel(XP);
    const text = `${name} ${XPBarPercent}%`;

    const temp: Types.IFlatObjectOfBooleans = {};
    for (let key of Object.keys(Experience)) {
      temp[key] = false;
    }
    temp[name] = true;

    setToolTipText(text);
    setTipsToShow(temp);
  };

  const handleRemoveToolTip = () => {
    const temp: Types.IFlatObjectOfBooleans = {};
    for (let key of Object.keys(Experience)) {
      temp[key] = false;
    }
    setTipsToShow(temp);
  };

  useEffect(() => {
    let localTotalLevel: number = 0;
    let localTotalExperience: number = 0;

    for (let value of Object.values(Experience)) {
      localTotalExperience += value;
      localTotalLevel += getLevel(value);
    }
    setTotalExperience(localTotalExperience);
    setTotalLevel(localTotalLevel);

    const temp: Types.IFlatObjectOfBooleans = {};
    for (let key of Object.keys(Experience)) {
      temp[key] = false;
    }
    setTipsToShow(temp);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-header text-center">Levels</h5>

        <div className="d-flex row">
          <h6 className="card-subtitle text-muted">Combat Level {showCombatLevel()}</h6>
          <h6 className="card-subtitle text-muted">Total Levels {totalLevel}</h6>
          <h6 className="card-subtitle text-muted">Total Experience {totalExperience.toLocaleString("en-US")}</h6>
        </div>

        {Object.entries(Experience).map(([skill, xp]) => (
          <div
            key={`skill-minicomponent-${skill}`}
            onMouseEnter={() => {
              handleSetToolTip(skill, xp);
            }}
            onMouseLeave={handleRemoveToolTip}
          >
            {tipsToShow[skill] ? (
              <div className="d-flex">
                <div style={{ position: "absolute", zIndex: 999, color: "#f0ae40", fontWeight: "bold", textShadow: "2px 2px 4px black" }}>
                  {toolTipText}
                </div>

                <span
                  style={{
                    backgroundColor: "#00ff00",
                    width: `${percentToNextLevel(xp)}%`,
                    display: "inline-block",
                    color: "#00ff00",
                  }}
                >
                  -
                </span>
                <span
                  style={{
                    backgroundColor: "red",
                    width: `${100 - percentToNextLevel(xp)}%`,
                    display: "inline-block",
                    color: "red",
                  }}
                >
                  _
                </span>
              </div>
            ) : (
              <div>
                <div>icon Lv: {getLevel(xp)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Levels;

//! once we have icons, we wrap the parent with the icon dimensions
