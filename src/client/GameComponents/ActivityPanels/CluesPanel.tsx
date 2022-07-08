import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const CluesPanel = (props: Types.CluesPanelProps) => {
  useEffect(() => {}, []);
  return (
    <div className="card border border-dark border-2 rounded-3">
      <div>This is CluesPanel</div>
      <div>CluesPanel is not part of the minimum viable product, but it needed a spot</div>
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

export default CluesPanel;
