import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { AllQuests } from "../../../../Constants/Quests/";
import { useSelector } from "react-redux";

const QuestList = (props: Types.NoProps) => {
  const AllQuestsFlat = [...Object.values(AllQuests)].flat();
  const Progress = useSelector((state: Types.AllState) => state.Quests_Lumbridge) as Types.IStateQuest[];
  // console.log(Progress);

  useEffect(() => {}, []);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-header text-center">Quest List</h5>
        {AllQuestsFlat.map((quest) => (
          <div key={`quest-list-${quest.name}`} className="card">
            <div className="card-body">
              <h5 className="card-subtitle text-muted">{quest.name}</h5>

              {quest.complete && <div>Completed!</div>}
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

// console.log(wow);

const temp = [
  {
    name: "Cook's Assistant",
    location: "Lumbridge",
    stepsTotal: 20,
    questPoints: 1,
    complete: false,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      Cooking: 300,
    },
    itemRewards: { Coins: 500, Sardines: 20 },
  },
  {
    name: "Myths of the White Lands",
    location: "Lumbridge",
    stepsTotal: 113,
    questPoints: 2,
    complete: false,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: { ANY: 500 },
    itemRewards: { Coins: 5000 },
  },
];

const wow = [
  {
    name: "Cook's Assistant",
    stepsComplete: 0,
    stepsTotal: 20,
    complete: false,
  },
  {
    name: "Myths of the White Lands",
    stepsComplete: 0,
    stepsTotal: 113,
    complete: false,
  },
];
// temp grabs the list of quests from constants
// wow grabs the list of quests from state
// compositeArray matches the names together, and adds the current stepsComplete, so that it can be displayed
let compositeArray: any = [];

for (let i = 0; i < wow.length; i++) {
  for (let j = 0; j < temp.length; j++) {
    if (wow[j].name === temp[i].name) {
      let compositeQuest = { ...temp[i], stepsComplete: wow[j].stepsComplete };
      compositeArray.push(compositeQuest);
      continue;
    }
  }
}

console.log(compositeArray);

[
  {
    name: "Cook's Assistant",
    location: "Lumbridge",
    stepsTotal: 20,
    questPoints: 1,
    complete: false,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      Cooking: 300,
    },
    itemRewards: {
      Coins: 500,
      Sardines: 20,
    },
    stepsComplete: 0,
  },
  {
    name: "Myths of the White Lands",
    location: "Lumbridge",
    stepsTotal: 113,
    questPoints: 2,
    complete: false,
    combatRequirements: 0,
    questRequirements: [],
    levelRequirements: {},
    experienceRewards: {
      ANY: 500,
    },
    itemRewards: {
      Coins: 5000,
    },
    stepsComplete: 0,
  },
];
