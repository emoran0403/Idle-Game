import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { AllQuests } from "../../../../Constants/Quests/";
import { useSelector } from "react-redux";
import { ProgressBar } from "react-bootstrap";

const QuestList = (props: Types.NoProps) => {
  // This represents all the quests as a flat array
  const AllQuestsFlat: Types.IQuestInfo[] = [...Object.values(AllQuests)].flat();

  // this represents all the Lumbridge quests coming from state
  const { LumbridgeQuestArray } = useSelector((state: Types.AllState) => state.Quests_Lumbridge);

  // this represents all the Draynor quests coming from state
  const { DraynorQuestArray } = useSelector((state: Types.AllState) => state.Quests_Draynor);

  const AllQuestsFromStateFlat = [...LumbridgeQuestArray, ...DraynorQuestArray];
  //@spread out future quests into the AllQuestsFromStateFlat array
  // AllQuestsFromStateFlat.length represents the total number of quests implemented

  // we establish an array of composite quests, pulling in the progress from state, and the static info from the summary
  const [compositeQuestArray, setCompositeQuestArray] = useState<Types.ICompositeQuestInfo[]>([]);
  const [completedQuestCounter, setCompletedQuestCounter] = useState<number>(0);

  useEffect(() => {
    //@ This use effect combines the static quest info from constants with the dynamic quest info from state,
    //@ and increments a count of completed quests
    // console.log(AllQuestsFromStateFlat);
    let tempCompArray: Types.ICompositeQuestInfo[] = [];
    let questCompleteCounter: number = 0;
    for (let i = 0; i < AllQuestsFlat.length; i++) {
      for (let j = 0; j < AllQuestsFromStateFlat.length; j++) {
        // if the quest names match, create a composed quest, then push it into the array
        if (AllQuestsFromStateFlat[j].name === AllQuestsFlat[i].name) {
          let compositeQuest = {
            ...AllQuestsFlat[i],
            stepsComplete: AllQuestsFromStateFlat[j].stepsComplete,
            complete: AllQuestsFromStateFlat[j].complete,
          };
          tempCompArray.push(compositeQuest);
          continue; // there will only be one match, and once we find our match, continue to the next iteration
        }
      }
    }
    // console.log(tempCompArray);

    // if the quest is complete, increment the counter
    for (let k = 0; k < AllQuestsFromStateFlat.length; k++)
      if (AllQuestsFromStateFlat[k].complete) {
        questCompleteCounter++;
      }

    setCompletedQuestCounter(questCompleteCounter);
    setCompositeQuestArray(tempCompArray);
    // console.log(questCompleteCounter);
    // console.log(AllQuestsFromStateFlat.length);
  }, []);

  return (
    <div className="card border border-dark border-2 rounded-3 }" style={{ overflowY: "auto", position: "relative", height: "33%" }}>
      <div className="card-body">
        <h5 className="card-header text-center">
          Quest List
          <div className="card-subtitle text-muted">
            <h6>
              Completion
              <ProgressBar>
                <ProgressBar
                  striped
                  variant="success"
                  label={`${Math.round((completedQuestCounter / AllQuestsFromStateFlat.length) * 100)}%`}
                  now={completedQuestCounter}
                  key={`quest-completion-progress-bar`}
                  min={0}
                  max={AllQuestsFromStateFlat.length}
                />
                <ProgressBar
                  variant="danger"
                  now={AllQuestsFromStateFlat.length - completedQuestCounter}
                  key={2}
                  min={0}
                  max={AllQuestsFromStateFlat.length}
                />
              </ProgressBar>
            </h6>
          </div>
        </h5>
        {compositeQuestArray?.map((quest) => (
          <div key={`quest-list-${quest.name}`} className="card">
            <div className="card-body">
              <h5 className="card-subtitle text-muted">{quest.name}</h5>

              <div key={`${quest.name}-progress-bar-div`}>
                <ProgressBar>
                  <ProgressBar
                    striped
                    variant="success"
                    label={`${Math.round((quest.stepsComplete / quest.stepsTotal) * 100)}%`}
                    now={quest.stepsComplete}
                    key={`${quest.name}-progress-bar`}
                    min={0}
                    max={quest.stepsTotal}
                  />
                  <ProgressBar variant="danger" now={quest.stepsTotal - quest.stepsComplete} key={2} min={0} max={quest.stepsTotal} />
                </ProgressBar>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestList;
//! before deploying - reset all quest state and experience to zero, aside from Constitution, that default is lvl 10

// let example = {
//   aa: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
//   bb: [{ b: 1 }, { b: 2 }, { b: 3 }, { b: 4 }, { b: 5 }],
//   cc: [{ c: 1 }, { c: 2 }, { c: 3 }, { c: 4 }, { c: 5 }],
//   dd: [{ d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }],
//   ee: [{ e: 1 }, { e: 2 }, { e: 3 }, { e: 4 }, { e: 5 }],
// };

// const wow = [...Object.values(example)].flat();
