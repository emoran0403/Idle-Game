import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";

import { Enemies } from "../../../../Constants/Enemies";
import { setResource } from "../../Redux/Slices/CurrentResource";
import { setSkill } from "../../Redux/Slices/CurrentSkill";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setTarget } from "../../Redux/Slices/CurrentTarget";
import { getLevel } from "../../../../Constants/XP Levels";
import { setQuest } from "../../Redux/Slices/CurrentQuest";
import { setStyle } from "../../Redux/Slices/CurrentCombatStyle";
import { TwoHandSlot } from "../../../../Constants/Equipment/TwoHandSlot";
import { AllLocations } from "../../../../Constants/LocationInfo";
import { ListOfSlayerMasters } from "../../../../Constants/Slayer/SlayerMasters";

//@ for simplicity, i'm not keeping track of ammunition / runes

const CombatPanel = (props: Types.CombatPanelProps) => {
  const arrayOfCombatStyleSkills = [`Attack`, `Strength`, `Defence`, `Ranged`, `Magic`];
  const dispatch = useDispatch();

  // These grab info from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;
  const { CurrentSkill } = useSelector((state: Types.AllState) => state.Skill) as Types.ListOfSkills;
  const { CurrentTarget } = useSelector((state: Types.AllState) => state.Target) as Types.ICurrentTarget;
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  const SlayerTask = useSelector((state: Types.AllState) => state.SlayerTask);

  // multiple functions use slayer level, define it here for scoping purposes
  let slayerLevel = getLevel(Experience.Slayer);

  //@ rerender when the player equips a new weapon, the player defeats an assigned task enemy, upon lifepoint changes
  useEffect(() => {}, [props.currentEquipment.TwoHandSlot, SlayerTask[`amount`], props.playerLifePoints, props.targetLifePoints]);

  const panelHeaderJSX = () => {
    // returns the JSX for the panel header
    return (
      <div className="row justify-content-lg-center d-flex ">
        <div className="col-lg-2 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <h1 className="col-lg-10 justify-content-lg-center">Combat in {AllLocations[CurrentLocation as keyof Types.IAllLocations].displayName}</h1>
      </div>
    );
  };

  /**
   * conditionally disables the enemy button based on the player's slayer level and the required slayer level of the enemy
   * @param enemy The enemy summary of the current target
   * @returns Returns a boolean, enabling or disabling the current target's button
   */
  const checkSlayerReqs = (enemy: Types.IEnemySummary) => {
    return slayerLevel < enemy.levelReqSlayer;
  };

  const enemyButtonsJSX = (enemyObject: Types.IEnemyLocations) => {
    // spread out the enemies into an array, then sort them by their level in ascending order
    let arrayOfEnemies: Types.IEnemySummary[] = [...Object.values(enemyObject)].sort((a, b) => a.level - b.level);

    // console.log(arrayOfEnemies);

    //@ we don't need to disable enemies until a slayer level is implemented
    return (
      <div onClick={() => {}} className="card-title border border-dark border-1 rounded-3">
        <div className="d-flex flex-row flex-wrap">
          {arrayOfEnemies.map((enemy: Types.IEnemySummary, i) => (
            <button
              disabled={checkSlayerReqs(enemy)}
              onClick={(e) => {
                console.log({ enemy, CurrentLocation });

                if (!arrayOfCombatStyleSkills.includes(CurrentSkill) || CurrentSkill === `none`) {
                  // if the player is currently not training a combat skill, set skill to none
                  // - the player cannot train a noncombat skill while in combat
                  console.log(CurrentSkill);
                  dispatch(setSkill(`none`));
                }
                dispatch(setTarget(enemy.name));
                dispatch(setActivity(`In combat`));
                dispatch(setResource(`none`));
                dispatch(setQuest(`none`));
                handleChatLogEnemy(`${enemy.displayName}`);

                if (CurrentSkill === `none`) {
                  props.newChatLog(`Choose a combat style!`, `Nonfilterable`);
                  // if player chooses to enter combat without selecting a combat style, send a chatlog
                  // not choosing a combat style means combat will not continue, and the player should be notified
                }
              }}
              key={`enemy-list-${enemy.displayName}-${i}`}
              className={`btn border mb-3 bg-${handleEnemyButtonsStyling(enemy)}`}
            >
              <div className="card-body text">
                <h5 className="card-title">{enemy.displayName}</h5>
                <div className="card-text">
                  <div>Lvl {enemy.level}</div>
                  <div>LP {enemy.lifePoints}</div>
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

  const handleChatLogEnemy = (enemy: string) => {
    //@ prevent spamming the chat window
    // if the enemy mayches that of the most recent chat log, dont send a new message to the chat window
    if (enemy === props.chatLogArray[props.chatLogArray.length - 1].message.substring(13)) {
      return;
    }
    props.newChatLog(`Now fighting ${enemy}`, `Activity Swap`);
  };

  const combatStyleButtonsJSX = () => {
    // reference the current weapon
    // TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle;
    //@ conditionally disable the buttons if they do not match the style of the currently equipped weapon
    return (
      <div className="d-flex justify-content-evenly mt-2">
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `melee` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Attack`));
            dispatch(setStyle(`melee`));
            handleChatLogSkill(`Attack`);
          }}
        >
          Attack
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `melee` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Strength`));
            dispatch(setStyle(`melee`));
            handleChatLogSkill(`Strength`);
          }}
        >
          Strength
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `melee` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Defence`));
            dispatch(setStyle(`melee`));
            handleChatLogSkill(`Defence`);
          }}
        >
          Defence
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `ranged` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Ranged`));
            dispatch(setStyle(`ranged`));
            handleChatLogSkill(`Ranged`);
          }}
        >
          Ranged
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `magic` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            dispatch(setStyle(`air`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Air Spells
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `magic` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            dispatch(setStyle(`water`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Water Spells
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `magic` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            dispatch(setStyle(`earth`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Earth Spells
        </button>
        <button
          disabled={TwoHandSlot[props.currentEquipment.TwoHandSlot as keyof Types.IArmorSlotTwoHand].thisWeaponStyle !== `magic` ? true : false}
          className="btn btn-primary"
          onClick={() => {
            dispatch(setActivity(`In combat`));
            dispatch(setResource(`none`));
            dispatch(setSkill(`Magic`));
            dispatch(setStyle(`fire`));
            handleChatLogSkill(`Magic`);
          }}
        >
          Fire Spells
        </button>
      </div>
    );
  };

  const showCombatLevel = () => {
    let att: number = getLevel(Experience.Attack);
    let str: number = getLevel(Experience.Strength);
    let mag: number = getLevel(Experience.Magic);
    let rng: number = getLevel(Experience.Ranged);
    let def: number = getLevel(Experience.Defence);
    let con: number = getLevel(Experience.Constitution);
    let pray: number = getLevel(Experience.Prayer);
    let summ: number = getLevel(Experience.Summoning);

    const combatLevel = Math.floor(((13 / 10) * Math.max(att + str, 2 * mag, 2 * rng) + def + con + Math.floor(0.5 * pray) + Math.floor(0.5 * summ)) / 4);
    return combatLevel;
  };

  const handleEnemyButtonsStyling = (enemy: Types.IEnemySummary) => {
    // conditionally return the appropriate background color for the enemy buttons based on the player and enemy combat levels
    let lvlDifference: number = showCombatLevel() - enemy.level; // player - enemy

    // check the player's slayer level against the enemy's slayer level requirement
    if (slayerLevel < enemy.levelReqSlayer) {
      // if the player does not have a high enough slayer level, style the button gray
      return `cbGray`;
    } else {
      // otherwise, style the button based on the difference in combat levels
      if (lvlDifference > 5) {
        return `cbGreen`;
      } else if (lvlDifference > 0 && lvlDifference <= 5) {
        return `cbYellow-Green`;
      } else if (lvlDifference === 0) {
        return `cbYellow`;
      } else if (lvlDifference < 0 && lvlDifference >= -5) {
        return `cbOrange`;
      } else if (lvlDifference < -5) {
        return `cbRed`;
      }
    }
  };

  const showSlayerMessage = () => {
    // if there curently is a slayer task, display the information
    if (SlayerTask[`taskMaster`].length) {
      const [assigningMaster] = ListOfSlayerMasters.filter((master) => master.name === SlayerTask[`taskMaster`]);

      return (
        <h4 className="text-center mt-3">
          Current Slayer Task: {SlayerTask[`amount`]} {SlayerTask[`task`]}, assigned by {assigningMaster[`displayName`]}
        </h4>
      );
    } else {
      // otherwise inform the player they do not currently have a task
      return <h4 className="text-center mt-3">You do not currently have a Slayer task assigned</h4>;
    }
  };

  const showLifePointBars = () => {
    if (Enemies[CurrentLocation as keyof Types.IAllEnemies][CurrentTarget as keyof Types.IEnemyLocations]) {
      let thisEnemy = Enemies[CurrentLocation as keyof Types.IAllEnemies][CurrentTarget as keyof Types.IEnemyLocations];
      let enemyLifepointsMax: number = thisEnemy[`lifePoints`];
      return (
        <div>
          <div className="d-flex my-1">
            <div className="col-3">
              <h5>Your Lifepoints: </h5>
            </div>
            <div className="col-9">
              <ProgressBar style={{ height: 25 }} className="border border-dark border-2">
                <ProgressBar
                  style={{ fontSize: `1.25rem` }}
                  variant="success"
                  label={`${props.playerLifePoints.toLocaleString("en-US")}`}
                  now={Number(props.playerLifePoints)}
                  key={`playerLifePoints-green-progress-bar`}
                  min={0}
                  max={getLevel(Experience[`Constitution`]) * 100}
                />

                <ProgressBar
                  variant="danger"
                  now={getLevel(Experience[`Constitution`]) * 100 - props.playerLifePoints}
                  key={`playerLifePoints-red-progress-bar`}
                  min={0}
                  max={getLevel(Experience[`Constitution`]) * 100}
                />
              </ProgressBar>
            </div>
          </div>

          <div className="d-flex my-1">
            <div className="col-3">
              <h5>{thisEnemy[`displayName`]} Lifepoints: </h5>
            </div>
            <div className="col-9">
              <ProgressBar style={{ height: 25 }} className="border border-dark border-2">
                <ProgressBar
                  variant="success"
                  style={{ fontSize: `1.25rem` }}
                  label={`${props.targetLifePoints}`}
                  now={props.targetLifePoints}
                  key={`targetLifePoints-green-progress-bar`}
                  min={0}
                  max={enemyLifepointsMax}
                />
                <ProgressBar
                  variant="danger"
                  now={enemyLifepointsMax - props.targetLifePoints}
                  key={`targetLifePoints-red-progress-bar`}
                  min={0}
                  max={enemyLifepointsMax}
                />
              </ProgressBar>
            </div>
          </div>

          {/* <div>No Target Selected</div> */}
        </div>
      );
    } else {
      return (
        <div>
          <div className="d-flex my-1">
            <div className="col-3">
              <h5>Your Lifepoints: </h5>
            </div>
            <div className="col-9">
              <ProgressBar style={{ height: 25 }} className="border border-dark border-2">
                <ProgressBar
                  variant="success"
                  style={{ fontSize: `1.25rem` }}
                  label={`${props.playerLifePoints.toLocaleString("en-US")}`}
                  now={props.playerLifePoints}
                  key={`playerLifePoints-green-progress-bar`}
                  min={0}
                  max={getLevel(Experience[`Constitution`]) * 100}
                />
                <ProgressBar
                  variant="danger"
                  now={getLevel(Experience[`Constitution`]) * 100 - props.playerLifePoints}
                  key={`playerLifePoints-red-progress-bar`}
                  min={0}
                  max={getLevel(Experience[`Constitution`]) * 100}
                />
              </ProgressBar>
            </div>
          </div>

          <div className="d-flex my-1">
            <h5>No Target Selected</h5>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          {combatStyleButtonsJSX()}
          {showSlayerMessage()}
          {showLifePointBars()}
          <div className="card-body">{enemyButtonsJSX(Enemies[CurrentLocation as keyof Types.IAllEnemies])}</div>
        </div>
      </div>
    </div>
  );
};

export default CombatPanel;
