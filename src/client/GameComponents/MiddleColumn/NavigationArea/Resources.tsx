import * as Types from "../../../../../Types";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResources } from "../../../Redux/Slices/Resources";

const Resources = (props: Types.ResourcesCompProps) => {
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

  return (
    <div className="text-center border border-dark border-2 rounded-3" style={{ width: `230px` }}>
      <div>Currently {resourcesToDisplay} Resources</div>
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch(setResources());
          props.newChatLog(`You are now ${resourcesForButton} Resources`, `Misc`);
          // console.log(`you toggled resources`);
        }}
      >
        {resourcesForButton.substring(0, 4)} Resources
      </button>
    </div>
  );
};

export default Resources;
