import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

const ActivityDisplay = (props: Types.NoProps) => {
  // const [progress, setProgress] = useState<number>(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (progress === 25) {
  //       setProgress(0);
  //     } else {
  //       setProgress(progress + 1);
  //     }
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [progress]);

  return (
    <div>Activity Display: cool stuff coming soon(tm)</div>
    // <div className="border border-dark border-2 rounded-3">
    //   <div>
    //     <ProgressBar className="border border-dark border-2">
    //       {/* Green Bar */}
    //       <ProgressBar striped variant="success" now={progress} key={`tick-timer-progress-bar-1`} min={0} max={25} />

    //       {/* Red Bar */}
    //       <ProgressBar variant="danger" now={25} key={`tick-timer-progress-bar-2`} min={0} max={25} />
    //     </ProgressBar>
    //   </div>
    // </div>
  );
};

export default ActivityDisplay;
