import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentResourceComp = (props: Types.NoProps) => {
  const Resource = useSelector((state: Types.AllState) => state.Resource.CurrentResource as Types.ICurrentResourceOptions);
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget as Types.ICurrentTargetOptions);
  const Activty = useSelector((state: Types.AllState) => state.Activity.CurrentActivity as Types.ICurrentActivityOptions);
  // console.log(Target);
  useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3 flex-fill">
      {Activty === `In combat` ? (
        <div>
          <div>Fighting </div>
          <div>{Target}</div>
        </div>
      ) : (
        <div>
          <div>Collecting</div>
          <div>{Resource}</div>
        </div>
      )}
    </div>
  );
};

export default CurrentResourceComp;

//! need a piece of state to hold which enemy is the current target
//! need to conditionally display instead of the current resource based on combat or skilling
