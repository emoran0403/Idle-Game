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
import { getLevel } from "../../../../Constants/XP Levels";
import { setQuest } from "../../Redux/Slices/CurrentQuest";
import { setStyle } from "../../Redux/Slices/CurrentCombatStyle";
import { TwoHandSlot } from "../../../../Constants/Equipment/TwoHandSlot";

//@ for simplicity, i'm not keeping track of ammunition / runes

const CombatPanel = (props: Types.CombatPanelProps) => {
  const arrayOfCombatStyleSkills = [`Attack`, `Strength`, `Defence`, `Ranged`, `Magic`];
  const dispatch = useDispatch();

  // These grab info from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;
  const { CurrentSkill } = useSelector((state: Types.AllState) => state.Skill) as Types.ListOfSkills;
  const { CurrentTarget } = useSelector((state: Types.AllState) => state.Target) as Types.ICurrentTarget;
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  //@ Enemies[Current as keyof Types.IAllEnemies] is the list of enemies at the current location

  //@ rerender when the player equips a new weapon
  useEffect(() => {}, [props.currentEquipment.TwoHandSlot]);

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

  const enemyButtonsJSX = (enemyObject: Types.IEnemyLocations) => {
    // spread out the enemies into an array, then sort them by their level in ascending order
    let arrayOfEnemies: Types.IEnemySummary[] = [...Object.values(enemyObject)].sort((a, b) => a.level - b.level);

    // console.log(arrayOfEnemies);

    //@ we don't need to disable enemies until a slayer level is implemented
    return (
      <div onClick={() => {}} className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Enemies in {CurrentLocation}</h6>
        <div className="d-flex flex-row flex-wrap">
          {arrayOfEnemies.map((enemy: Types.IEnemySummary) => (
            <button
              onClick={(e) => {
                // console.log(`${enemy.displayName} was clicked`);

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
              key={`enemy-list-${enemy.displayName}`}
              className={`btn border mb-3 bg-${handleEnemyButtonsStyling(enemy.level)}`}
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

  const handleEnemyButtonsStyling = (enemyLevel: number) => {
    // conditionally return the appropriate background color for the enemy buttons based on the player and enemy combat levels
    let lvlDifference: number = showCombatLevel() - enemyLevel; // player - enemy

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
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          {combatStyleButtonsJSX()}
          <div className="card-body">{enemyButtonsJSX(Enemies[CurrentLocation as keyof Types.IAllEnemies])}</div>
        </div>
      </div>
    </div>
  );
};

export default CombatPanel;
