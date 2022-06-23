import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { AllQuests } from "../../../../Constants/Quests/";
import { useSelector } from "react-redux";

const QuestList = (props: Types.NoProps) => {
  // This represents all the quests as a flat array
  const AllQuestsFlat: Types.IQuestInfo[] = [...Object.values(AllQuests)].flat();

  // this represents all the quests coming from state
  const { LumbridgeQuestArray } = useSelector((state: Types.AllState) => state.Quests_Lumbridge);

  // this represents all the quests coming from state
  const { DraynorQuestArray } = useSelector((state: Types.AllState) => state.Quests_Draynor);

  // spread out all the quests from state into a flat array
  const AllQuestsFromStateFlat = [...LumbridgeQuestArray, ...DraynorQuestArray];
  //@spread out future quests into the AllQuestsFromStateFlat array

  // we establish an array of composite quests, pulling in the progress from state, and the static info from the summary
  const [compositeQuestArray, setCompositeQuestArray] = useState<Types.ICompositeQuest[]>([]);

  useEffect(() => {
    // console.log(AllQuestsFromStateFlat);
    let tempCompArray: Types.ICompositeQuest[] = [];
    for (let i = 0; i < AllQuestsFlat.length; i++) {
      for (let j = 0; j < AllQuestsFromStateFlat.length; j++) {
        if (AllQuestsFromStateFlat[j].name === AllQuestsFlat[i].name) {
          let compositeQuest = {
            ...AllQuestsFlat[i],
            stepsComplete: AllQuestsFromStateFlat[j].stepsComplete,
            complete: AllQuestsFromStateFlat[j].complete,
          };
          tempCompArray.push(compositeQuest);
          continue; // once we find our match, continue to the next iteration
        }
      }
    }
    // console.log(tempCompArray);
    setCompositeQuestArray(tempCompArray);
  }, []);

  return (
    <div className="card border border-dark border-2 rounded-3 }" style={{ overflowY: "auto", position: "relative", height: "50%" }}>
      <div className="card-body">
        <h5 className="card-header text-center">
          Quest List
          <div className="card-subtitle text-muted">
            <h6>quests complete / quests total</h6>
          </div>
        </h5>
        {compositeQuestArray?.map((quest) => (
          <div key={`quest-list-${quest.name}`} className="card">
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
    </div>
  );
};

export default QuestList;

// let example = {
//   aa: [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
//   bb: [{ b: 1 }, { b: 2 }, { b: 3 }, { b: 4 }, { b: 5 }],
//   cc: [{ c: 1 }, { c: 2 }, { c: 3 }, { c: 4 }, { c: 5 }],
//   dd: [{ d: 1 }, { d: 2 }, { d: 3 }, { d: 4 }, { d: 5 }],
//   ee: [{ e: 1 }, { e: 2 }, { e: 3 }, { e: 4 }, { e: 5 }],
// };

// const wow = [...Object.values(example)].flat();
