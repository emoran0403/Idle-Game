import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const CurrentActivityComp = (props: Types.NoProps) => {
  const { CurrentActivity } = useSelector((state: Types.AllState) => state.Activity);

  //   useEffect(() => {}, []);
  return (
    <div className="text-center border border-dark border-2 rounded-3 h-100">
      <div>You are</div>
      <div>{CurrentActivity}</div>
    </div>
  );
};

export default CurrentActivityComp;

// style={{ width: `80px` }}
