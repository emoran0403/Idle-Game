import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import ActivityButtons from "./ActivityButtonsBar";
import ActivityDisplay from "./ActivityDisplay";
//@ This is a component to hold the activity buttons and the activity display components to manage state for rendering purposes

const ActivityArea = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="border border-dark border-2 rounded-3">
      <div>This is Activity Area</div>
      <ActivityButtons />
      <ActivityDisplay />
    </div>
  );
};

export default ActivityArea;
