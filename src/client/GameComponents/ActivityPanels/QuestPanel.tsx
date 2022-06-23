import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AllQuests } from "../../../../Constants/Quests";
import { getLevel } from "../../../../Constants/XP Levels";
import e from "express";

const QuestPanel = (props: Types.ActivitiesProps) => {
  // This grabs the current location from state
  const { Current } = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;

  // gets the player's experience
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;

  // This represents all the quests coming from constants as a flat array
  const AllQuestsFlat: Types.IQuestInfo[] = [...Object.values(AllQuests)].flat();

  // this represents all the Lumbridge quests coming from state
  const { LumbridgeQuestArray } = useSelector((state: Types.AllState) => state.Quests_Lumbridge);

  // this represents all the Draynor quests coming from state
  const { DraynorQuestArray } = useSelector((state: Types.AllState) => state.Quests_Draynor);

  // spread out all the quests from state into a flat array
  const AllQuestsFromStateFlat = [...LumbridgeQuestArray, ...DraynorQuestArray];
  //@spread out future quests into the AllQuestsFromStateFlat array

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
        <div className="col-lg-9 justify-content-lg-center">Quests in {Current}</div>
      </div>
    );
  };

  const handleQuestStyle = (quest: Types.ICompositeQuestInfo) => {
    /**
     * based on the players level and quests complete, this function will style the background color
     * of each quest card to indicate met or missing requirements
     */
    let meetsLevelRequirements = true; // this gets set to false if the player does not meet the level requirements
    let meetsQuestRequirements = true; // this gets set to false if the player does not meet the requirements
    /**
     * we initialize arrayOfSkillNamesFromQuestReqs to get an array of skill names.
     * we use this to index the Experience from state, and the quest level requirements
     * if a quest has no level requirements, it will be an empty array
     */
    const arrayOfSkillNamesFromQuestReqs = Object.keys(quest.levelRequirements);

    try {
      if (arrayOfSkillNamesFromQuestReqs.length) {
        // run through each level requirement
        arrayOfSkillNamesFromQuestReqs.forEach((levelReq) => {
          // find the player's level in that skill
          const mylevel = getLevel(Experience[levelReq as keyof Types.ISkillList]);

          // find the level requirement from that quest
          const reqlevel = quest.levelRequirements[levelReq];
          console.log({ mylevel, reqlevel, wow: mylevel >= reqlevel });

          if (mylevel <= reqlevel) {
            meetsLevelRequirements = false;
            // throwing an error allows us to 'break' out of this forEach, since we cannot 'continue' across the function boundary
            throw new Error(`Player does not meet a level requirement`);
          }
        });
      }
    } catch (error) {
      // console.log(error);
    }

    try {
      quest.questRequirements.forEach((questName) => {
        // iterate over all quest requirements
        AllQuestsFromStateFlat.forEach((questFromState) => {
          // iterate over all quests from state
          if (questFromState.name === questName) {
            // if the name matches, push the .complete value to an array of booleans
            if (!questFromState.complete) {
              // if the quest is not complete, throw an error to 'break' out of the loop and 'continue' on
              throw new Error(`Player does not meet a quest requirement`);
            }
          }
        });
      });
    } catch (error) {
      // console.log(error);
    }

    // based on the conditions, return a background color
    if (meetsLevelRequirements && meetsQuestRequirements) {
      // has levels and has quests = green background

      return `bg-success`;
    } else if (meetsLevelRequirements && meetsQuestRequirements) {
      // missing levels and has quests = yellow background

      return `bg-yellowlol`;
    } else if (meetsLevelRequirements && meetsQuestRequirements) {
      // has levels and missing quests = orange background

      return `bg-orangelol`;
    } else if (meetsLevelRequirements && meetsQuestRequirements) {
      // missing levels and missing quests = red background
      return `bg-danger`;
    }
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
  }, []);

  return (
    <div className="card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      {compositeQuestArray
        ?.filter((quest) => quest.location === Current)
        .map((quest) => (
          <div key={`quest-list-${quest.name}`} className={`card ${handleQuestStyle(quest)}`}>
            <div className="card-body">
              <h5 className="card-subtitle text-muted">{quest.name}</h5>
              {quest.complete && <div>100%</div>}
              {!quest.complete && (
                <div>
                  In Progress : {quest.stepsComplete} / {quest.stepsTotal}
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestPanel;
