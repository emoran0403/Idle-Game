import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Resources = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.Resources) as Types.IResources;
  let resourcesToDisplay: string = "";

  for (let [key, value] of Object.entries(state)) {
    if (value === true) {
      resourcesToDisplay = key;
    }
  }
  useEffect(() => {}, []);
  return (
    <div>
      <div>This is Resources</div>
      <div>{resourcesToDisplay}</div>
    </div>
  );
};

export default Resources;
