import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";

const NavigationArea = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div>
      <div>This is NavigationArea</div>
      {/* <div className="d-flex bd-highlight">
            <div className="p-2 flex-fill bd-highlight">World Map Button</div>
            <div className="p-2 flex-fill bd-highlight">Current Location</div>
            <div className="p-2 flex-fill bd-highlight">Current Activity</div>
          </div> */}
    </div>
  );
};

export default NavigationArea;
