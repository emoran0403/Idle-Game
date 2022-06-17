import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { AllQuests } from "../../../../Constants/Quests/";

const QuestList = (props: Types.NoProps) => {
  const LumQuests = AllQuests.Lumbridge;
  useEffect(() => {}, []);
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-header text-center">Quest List</h5>
        {LumQuests.map((quest) => (
          <div key={`quest-list-${quest.name}`} className="card">
            <div className="card-body">
              <h5 className="card-title">{quest.name}</h5>

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
