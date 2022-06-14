import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const Resources = (props: Types.NoProps) => {
  const state = useSelector((state: Types.AllState) => state.Resources) as Types.IResources;
  const dispatch = useDispatch();
  let resourcesToDisplay: string = "";
  let resourcesForButton: string = "";

  for (let [key, value] of Object.entries(state)) {
    if (value === true) {
      resourcesToDisplay = key;
    }
    if (value === false) {
      resourcesForButton = key;
    }
  }
  useEffect(() => {}, []);
  return (
    <div>
      <div>Currently {resourcesToDisplay} Resources</div>
      <button
        className="btn btn-primary"
        onClick={() => {
          console.log(`you clicked to toggle drop/bank resources`);
        }}
      >
        {resourcesForButton.substring(0, 4)} Resources
      </button>
    </div>
  );
};

export default Resources;
