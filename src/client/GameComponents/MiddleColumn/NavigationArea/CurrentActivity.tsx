import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentActivity = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.CurrentActivity) as Types.ICurrentActivity;
  let activityToDisplay: string = "";

  for (let [key, value] of Object.entries(state)) {
    if (value === true) {
      activityToDisplay = key;
    }
  }

  useEffect(() => {}, []);
  return (
    <div>
      <div>This is CurrentActivity</div>
      <div>{activityToDisplay}</div>
    </div>
  );
};

export default CurrentActivity;
