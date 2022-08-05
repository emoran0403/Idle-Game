import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AllQuests } from "../../../../Constants/Quests";
import { getLevel } from "../../../../Constants/XP Levels";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setResource } from "../../Redux/Slices/CurrentResource";
import { setSkill } from "../../Redux/Slices/CurrentSkill";
import { setQuest } from "../../Redux/Slices/CurrentQuest";
import { setTarget } from "../../Redux/Slices/CurrentTarget";

//! handleQuestStyle and handleQuestButtonDisplay have repeated logic that could be improved
//! composing the constant quest info and state info can be improved by relegating that to a function, which then returns jsx

const QuestPanel = (props: Types.QuestPanelCompProps) => {
  const dispatch = useDispatch();

  // This grabs the current location from state
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;

  // gets the player's experience
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  // This represents all the quests coming from constants as a flat array
  const AllQuestsFlat: Types.IQuestInfo[] = [...Object.values(AllQuests)].flat();

  // this represents all the Lumbridge quests coming from state
  const { LumbridgeQuestArray } = useSelector((state: Types.AllState) => state.Quests_Lumbridge);

  // this represents all the Draynor quests coming from state
  const { DraynorQuestArray } = useSelector((state: Types.AllState) => state.Quests_Draynor);

  // spread out all the quests from state into a flat array
  //@spread out future quests into the AllQuestsFromStateFlat array
  const AllQuestsFromStateFlat = [...LumbridgeQuestArray, ...DraynorQuestArray];
  // console.log({ allquests: AllQuestsFromStateFlat });

  // we establish an array of composite quests, pulling in the progress from state, and the static info from the summary
  const [compositeQuestArray, setCompositeQuestArray] = useState<Types.ICompositeQuestInfo[]>([]);

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
        <div className="col-lg-9 justify-content-lg-center">Quests in {CurrentLocation}</div>
      </div>
    );
  };

  //@ conditionally styles the quest's background color
  const handleQuestStyle = (quest: Types.ICompositeQuestInfo) => {
    /**
     * based on the players level and quests complete, this function will style the background color
     * of each quest card to indicate met or missing requirements
     */
    let meetsLevelRequirements = true; // this gets set to false if the player does not meet the level requirements
    let meetsQuestRequirements = true; // this gets set to false if the player does not meet the requirements

    //@ check if the player has a reasonable combat level
    let combatLevel = showCombatLevel();
    // if the player's combat level is more than 10 levels below the combat requirements of the quest, set to false
    if (combatLevel <= quest.combatRequirements - 10) {
      meetsLevelRequirements = false;
    }
    const arrayOfSkillNamesFromQuestReqs = Object.keys(quest.levelRequirements);
    /**
     * we initialize arrayOfSkillNamesFromQuestReqs to get an array of skill names.
     * we use this to index the Experience from state, and the quest level requirements
     * if a quest has no level requirements, it will be an empty array
     */

    //@ check if the player meets the level requirements
    // if the player fails combat requirements, skip the skill requirements
    if (meetsLevelRequirements) {
      try {
        if (arrayOfSkillNamesFromQuestReqs.length) {
          // run through each level requirement
          arrayOfSkillNamesFromQuestReqs.forEach((levelReq) => {
            // find the player's level in that skill
            const mylevel = getLevel(Experience[levelReq as keyof Types.ISkillList]);

            // find the level requirement from that quest
            const reqlevel = quest.levelRequirements[levelReq];

            if (mylevel <= reqlevel) {
              // if just 1 level requirement is not met, set to false and break out of the loop
              meetsLevelRequirements = false;
              // throwing an error allows us to 'break' out of this forEach, since we cannot 'continue' across the function boundary
              throw new Error(`Player does not meet a level requirement`);
            }
          });
        }
      } catch (error) {}
    }

    //@ check if the player meets the quest requirements
    if (quest.questRequirements) {
      // if there are quest requirements, we need to check if the player meets the requirements
      // if not, then we can just skip the quest requirements section

      // a list of all quest names from state - we initialize the list to see if a quest reuqirement is available in state
      const AllQuestNamesFromState = AllQuestsFromStateFlat.map((quest) => quest.name);

      for (const questName of quest.questRequirements) {
        // iterate over all quests from the requirements

        for (let i = 0; i < AllQuestsFromStateFlat.length; i++) {
          // iterate over all quests from state

          /**
           * If the quest is not available in the game, (it is not found in list of quests in state)
           * Or if we find that quest in state, and it is not complete,
           * then we fail the quest requirements and may break for effeciency
           */
          if (!AllQuestNamesFromState.includes(questName) || (AllQuestsFromStateFlat[i].name === questName && !AllQuestsFromStateFlat[i].complete)) {
            // if we find a quest from state and the quest is not complete
            meetsQuestRequirements = false;
            break;
          }
        }
      }
    }
    //@ based on the conditions, return a background color
    if (meetsLevelRequirements.toString() === "true" && meetsQuestRequirements.toString() === "true") {
      // has levels and has quests = green background

      return `bg-success`;
    } else if (meetsLevelRequirements.toString() === "false" && meetsQuestRequirements.toString() === "true") {
      // missing levels and has quests = yellow background

      return `bg-yellowlol`;
    } else if (meetsLevelRequirements.toString() === "true" && meetsQuestRequirements.toString() === "false") {
      // has levels and missing quests = orange background

      return `bg-orangelol`;
    } else if (meetsLevelRequirements.toString() === "false" && meetsQuestRequirements.toString() === "false") {
      // missing levels and missing quests = red background
      return `bg-danger`;
    }
  };

  //@ sends a message to the chat window when beginnign or resuming a quest
  const handleQuestChatMessage = (quest: Types.ICompositeQuestInfo) => {
    // send a contextual message to the chat window

    // if the last log contains the quest name, don't send it
    if (quest.name === props.chatLogArray[props.chatLogArray.length - 1].message.substring(9)) {
      return;
    } else {
      if (quest.stepsComplete) {
        props.newChatLog(`Resuming ${quest.name}`, `Misc`);
      } else {
        props.newChatLog(`Starting ${quest.name}`, `Misc`);
      }
    }
  };

  //@ displays the `begin` and `resume` buttons as appropriate
  const handleQuestButtonJSX = (quest: Types.ICompositeQuestInfo) => {
    // console.log({ compositeQuestArray });

    /**
     * based on the players level and quests complete, this function will style the background color
     * of each quest card to indicate met or missing requirements
     */
    let meetsLevelRequirements = true; // this gets set to false if the player does not meet the level requirements
    let meetsQuestRequirements = true; // this gets set to false if the player does not meet the requirements

    //@ check if the player has a reasonable combat level
    let combatLevel = showCombatLevel();
    // if the player's combat level is more than 10 levels below the combat requirements of the quest, set to false
    if (combatLevel <= quest.combatRequirements - 10) {
      meetsLevelRequirements = false;
    }

    const arrayOfSkillNamesFromQuestReqs = Object.keys(quest.levelRequirements);
    /**
     * we initialize arrayOfSkillNamesFromQuestReqs to get an array of skill names.
     * we use this to index the Experience from state, and the quest level requirements
     * if a quest has no level requirements, it will be an empty array
     */
    //@ check if the player meets the level requirements
    if (meetsLevelRequirements) {
      try {
        if (arrayOfSkillNamesFromQuestReqs.length) {
          // run through each level requirement
          arrayOfSkillNamesFromQuestReqs.forEach((levelReq) => {
            // find the player's level in that skill
            const mylevel = getLevel(Experience[levelReq as keyof Types.ISkillList]);

            // find the level requirement from that quest
            const reqlevel = quest.levelRequirements[levelReq];

            if (mylevel <= reqlevel) {
              meetsLevelRequirements = false;
              // throwing an error allows us to 'break' out of this forEach, since we cannot 'continue' across the function boundary
              throw new Error(`Player does not meet a level requirement`);
            }
          });
        }
      } catch (error) {}
    }

    //@ check if the player meets the quest requirements
    if (quest.questRequirements) {
      // if there are quest requirements, we need to check if the player meets the requirements
      // if not, then we can just skip the quest requirements section

      // a list of all quest names from state - we initialize the list to see if a quest reuqirement is available in state
      const AllQuestNamesFromState = AllQuestsFromStateFlat.map((quest) => quest.name);

      for (const questName of quest.questRequirements) {
        // iterate over all quests from the requirements

        for (let i = 0; i < AllQuestsFromStateFlat.length; i++) {
          // iterate over all quests from state

          /**
           * If the quest is not available in the game, (it is not found in list of quests in state)
           * Or if we find that quest in state, and it is not complete,
           * then we fail the quest requirements and may break for effeciency
           */
          if (!AllQuestNamesFromState.includes(questName) || (AllQuestsFromStateFlat[i].name === questName && !AllQuestsFromStateFlat[i].complete)) {
            // if we find a quest from state and the quest is not complete
            meetsQuestRequirements = false;
            break;
          }
        }
      }
    }

    if (meetsLevelRequirements.toString() === "true" && meetsQuestRequirements.toString() === "true") {
      // has levels and has quests => show the button to start or resume the quest
      return (
        <button
          onClick={(e) => {
            handleQuestChatMessage(quest);
            dispatch(setTarget(`none`));
            dispatch(setActivity(`Questing`));
            dispatch(setResource(`none`));
            dispatch(setQuest(quest.name));
            dispatch(setSkill(`none`));
          }}
          className="btn btn-primary mx-2"
        >
          {quest.stepsComplete ? `Resume quest` : `Begin quest`}
        </button>
      );
    }
  };

  //@ displays the missing quest requirements for the given quest
  const displayQuestReqJSX = (quest: Types.ICompositeQuestInfo) => {
    // define an empty array where the quest requirements will be placed
    let questReqArray: string[] = [];
    // if there are quest requirements, check if the player has completed them, and if not, add them to the list
    quest.questRequirements.forEach((req) => {
      // console.log({ req });
      AllQuestsFromStateFlat.forEach((questFromState) => {
        // console.log({ questFromState });
        // debugger;
        // console.log({ req, name: questFromState.name, complete: questFromState.complete });
        if (questFromState.name === req && !questFromState.complete) {
          questReqArray.push(req);
        }
      });
    });

    if (questReqArray.length) {
      return (
        <div className="text-center">
          <p>Quest Requirements:</p>
          <ul>
            {questReqArray.map((questReq) => (
              <li key={`quest-panel-quest-req-${questReq}`} className="text-start">
                {questReq}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <p>All required quests complete</p>
        </div>
      );
    }
  };

  //@ displays the missing level requirements for the given quest
  const displayLevelReqJSX = (quest: Types.ICompositeQuestInfo) => {
    // define an empty array where the level requirements will be placed
    let levelReqArray: string[] = [];
    // retrieve the level requirements for the quest and place them into an array
    let levelReqTupleArray = Object.entries(quest.levelRequirements);
    // 0: ['Agility', 13]
    // 1: ['Mining', 17]
    // 2: ['Thieving', 13]

    // iterate over the level requirements, adding text which will be displayed
    levelReqTupleArray.forEach((tuple) => {
      const playerLevel = getLevel(Experience[tuple[0] as keyof Types.ISkillList]);
      const reqLevel = tuple[1];
      if (playerLevel < reqLevel) {
        const reqMsg = `You need ${tuple[1]} ${tuple[0]}`;
        levelReqArray.push(reqMsg);
      }
    });

    // if there are combat requirements for the quest, add them to the level requirements
    if (quest.combatRequirements > 14) {
      levelReqArray.unshift(`Combat level ${quest.combatRequirements - 10}+`);
    }

    if (levelReqArray.length) {
      return (
        <div className="text-center">
          <p>Level Requirements:</p>
          <ul>
            {levelReqArray.map((levelReq) => (
              <li key={`quest-panel-level-req-${levelReq}`} className="text-start">
                {levelReq}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <p>Attained all required levels</p>
        </div>
      );
    }
  };

  //@ displays the experience rewards for the given quest
  const displayXPRewardsJSX = (quest: Types.ICompositeQuestInfo) => {
    // define an empty array where the xp rewards will be placed
    let xprewardArray: string[] = [];
    // retrieve the xp rewards for the quest and place them into an array
    let xprewardTupleArray = Object.entries(quest.experienceRewards);
    // 0: ['Agility', 13]
    // 1: ['Mining', 17]
    // 2: ['Thieving', 13]
    xprewardTupleArray.forEach((tuple) => {
      // for now, if the quest offers an ANY xp reward, skip it
      if (tuple[0] !== `ANY`) {
        const reqMsg = `You will receive ${tuple[1]} xp in ${tuple[0]}`;
        xprewardArray.push(reqMsg);
      }
    });

    if (xprewardArray.length) {
      return (
        <div className="text-center">
          <p>Experience Rewards:</p>
          <ul>
            {xprewardArray.map((reward) => (
              <li key={`quest-panel-reward-${reward}`} className="text-start">
                {reward}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="text-center">
          <p>This quest does not reward Experience</p>
        </div>
      );
    }
  };

  //@ returns the player's combat level
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

  useEffect(() => {
    /**
     * this useEffect shuffles the quest array coming from constants and the quest array coming from state together
     * adding in the stateful keys to the constant quest info
     */

    let tempCompArray: Types.ICompositeQuestInfo[] = [];
    for (let i = 0; i < AllQuestsFlat.length; i++) {
      // run through all quests from constants
      for (let j = 0; j < AllQuestsFromStateFlat.length; j++) {
        // and run through all quests from state
        if (AllQuestsFromStateFlat[j].name === AllQuestsFlat[i].name) {
          // if the name matches, then create a composite quest
          let compositeQuest = {
            // spread out all the other info, adding in stepsComplete and complete from state
            ...AllQuestsFlat[i],
            stepsComplete: AllQuestsFromStateFlat[j].stepsComplete,
            complete: AllQuestsFromStateFlat[j].complete,
          };
          // then push this compositeQuest to tempCompArray
          tempCompArray.push(compositeQuest);
          continue; // once we find our match, continue to the next iteration
        }
      }
    }
    //when the loops are done running, set tempCompArray to state in this component
    setCompositeQuestArray(tempCompArray);
    // to make this component rerender when a quest step is completed,
    // pass down the questStepProgress from gameContainer
    /**
     * to make the component rerender when a quest or quest step is completed,
     * pass down the questStepProgress from gameContainer and the quest arrays.
     * to make the component rerender when a level is gained, pass in Experience
     */
  }, [props.questStepProgress, LumbridgeQuestArray, DraynorQuestArray, Experience]);

  return (
    <div className="container border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      {compositeQuestArray
        ?.filter((quest) => quest.location === CurrentLocation)
        .map((quest) => (
          <div key={`quest-list-${quest.name}`} className={`card border border-dark border-1 rounded-3 ${handleQuestStyle(quest)}`}>
            <div className="card-body">
              <h5 className={`card-subtitle text-black text-center`}>{quest.name}</h5>
              {quest.complete && <div className="fw-bold">100%</div>}
              {!quest.complete && (
                <div>
                  <div className="fw-bold">
                    {handleQuestButtonJSX(quest)} {quest.stepsComplete ? `In Progress: ` : `Not Started`} : {quest.stepsComplete} /{` ${quest.stepsTotal}`}
                  </div>
                  <div className="d-flex">
                    <div className="col-4 border border-dark border-1 rounded-3">{displayQuestReqJSX(quest)}</div>
                    <div className="col-4 border border-dark border-1 rounded-3">{displayLevelReqJSX(quest)}</div>
                    <div className="col-4 border border-dark border-1 rounded-3">{displayXPRewardsJSX(quest)}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestPanel;
