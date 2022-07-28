import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const MinigamePanel = (props: Types.MinigamePanelCompProps) => {
  useEffect(() => {}, []);
  return (
    <div className="card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      <div>This is MinigamePanel</div>
      <div>MinigamePanel is not part of the minimum viable product, but it needed a spot</div>
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

export default MinigamePanel;
