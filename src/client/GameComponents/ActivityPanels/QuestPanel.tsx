import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const QuestPanel = (props: Types.ActivitiesProps) => {
  useEffect(() => {}, []);
  return (
    <div className="card border border-dark border-2 rounded-3">
      <div>This is QuestPanel</div>
      <button
        className="btn btn-primary"
        onClick={() => {
          props.handleUpdateDisplay(`activityDisplay`);
        }}
      >
        Back
      </button>
    </div>
  );
};

export default QuestPanel;
