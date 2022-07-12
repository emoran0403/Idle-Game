import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Enemies } from "../../../../Constants/Enemies";
import { setResource } from "../../Redux/Slices/CurrentResource";
import { setSkill } from "../../Redux/Slices/CurrentSkill";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setTarget } from "../../Redux/Slices/CurrentTarget";

//@ for simplicity, i'm not keeping track of ammunition / runes

//! need a piece of state to hold which enemy is the current target
//! need to conditionally display instead of the current resource based on combat or skilling

const CombatPanel = (props: Types.CombatPanelProps) => {
  const arrayOfCombatStyleSkills = [`Attack`, `Strength`, `Defence`, `Ranged`, `Magic`];
  const dispatch = useDispatch();

  // This grabs the current location from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;
  const { CurrentSkill } = useSelector((state: Types.AllState) => state.Skill) as Types.ListOfSkills;
  const { CurrentTarget } = useSelector((state: Types.AllState) => state.Target) as Types.ICurrentTarget;
  // console.log(Current);
  // console.log(Enemies[Current as keyof Types.IAllEnemies]);
  //@ Enemies[Current as keyof Types.IAllEnemies] is the list of enemies at the current location

  // useEffect(() => {}, []);

  const panelHeaderJSX = () => {
    // returns the JSX for the panel header
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-3 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <div className="col-lg-9 justify-content-lg-center">Combat in {CurrentLocation}</div>
      </div>
    );
  };

  const combatOptionsJSX = (enemyObject: Types.IEnemyLocations) => {
    // spread out the enemies into an array, then sort them by their level in ascending order
    let arrayOfEnemies: Types.IEnemySummary[] = [...Object.values(enemyObject)].sort((a, b) => a.level - b.level);

    console.log(arrayOfEnemies);

    //@ we don't need to disable enemies until a slayer level is implemented
    return (
      <div onClick={() => {}} className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Enemies in {CurrentLocation}</h6>
        <div className="d-flex flex-row flex-wrap">
          {arrayOfEnemies.map((enemy) => (
            <button
              onClick={(e) => {
                console.log(`${enemy.displayName} was clicked`);

                if (!arrayOfCombatStyleSkills.includes(CurrentSkill) || CurrentTarget === `none`) {
                  // if the player is currently not training a combat skill, set skill to none
                  // - the player cannot train a noncombat skill while in combat
                  dispatch(setSkill(`none`));
                }
                dispatch(setActivity(`In combat`));
                dispatch(setTarget(enemy.displayName));
                handleChatLogEnemy(`${enemy.displayName}`);

                if (CurrentSkill === `none`) {
                  props.newChatLog(`Choose a combat style!`, `Nonfilterable`);
                  // if player chooses to enter combat without selecting a combat style, send a chatlog
                  // not choosing a combat style means combat will not continue, and the player should be notified
                }
              }}
              key={`enemy-list-${enemy.displayName}`}
              className={`btn border mb-3`}
            >
              <div className="card-body text">
                <h5 className="card-title">{enemy.displayName}</h5>
                <div className="card-text">
                  <div>Lvl {enemy.level}</div>
                  <div>LP {enemy.lifePoints}</div>
                  {/* <div>{ListOfLogs[enemy as keyof Types.IListOfLogs].XPGivenWoodcutting} XP</div> */}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const handleChatLogSkill = (skill: string) => {
    if (skill === props.chatLogArray[props.chatLogArray.length - 1].message.substring(13)) {
      return;
    }
    props.newChatLog(`Now training ${skill}`, `Activity Swap`);
  };

  const handleChatLogEnemy = (monster: string) => {
    if (monster === props.chatLogArray[props.chatLogArray.length - 1].message.substring(13)) {
      return;
    }
    props.newChatLog(`Now fighting ${monster}`, `Activity Swap`);
  };

  const combatStyleButtonJSX = () => {
    return (
      <div className="d-flex justify-content-evenly mt-2">
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Attack`));
            handleChatLogSkill(`Attack`);
          }}
        >
          Attack
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Strength`));
            handleChatLogSkill(`Strength`);
          }}
        >
          Strength
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Defence`));
            handleChatLogSkill(`Defence`);
          }}
        >
          Defence
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Ranged`));
            handleChatLogSkill(`Ranged`);
          }}
        >
          Ranged
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Air Spells
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Water Spells
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Earth Spells
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Fire Spells
        </button>
      </div>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          {combatStyleButtonJSX()}
          <div className="card-body">{combatOptionsJSX(Enemies[CurrentLocation as keyof Types.IAllEnemies])}</div>
        </div>
      </div>
    </div>
  );
};

export default CombatPanel;
