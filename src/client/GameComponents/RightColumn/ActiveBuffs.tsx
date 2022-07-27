import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const ActiveBuffs = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="border border-dark border-2 rounded-3">
      <h5 className="card-header text-center">ActiveBuffs</h5>
      <div>When implemented, any active buffs will be shown here</div>
    </div>
  );
};

export default ActiveBuffs;

{
  /* <div className="card">
  <div className="card-body">
    <h5 className="card-title">Stuff</h5>
    <div>stuff map here</div>
  </div>
</div> */
}
