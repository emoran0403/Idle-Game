import * as Types from "../../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Resources from "./Resources";
import CurrentLocationComp from "./CurrentLocationComp";
import CurrentSkillComp from "./CurrentSkillComp";
import CurrentResourceComp from "./CurrentResourceComp";
import CurrentActivityComp from "./CurrentActivityComp";

const NavigationArea = (props: Types.NavigationAreaCompProps) => {
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location as Types.ICurrentLocation);
  // useEffect(() => {}, []);

  return (
    <div className="">
      <div className="row justify-content-between" style={{ height: "100px" }}>
        <div className="col mh-100">
          <CurrentLocationComp />
        </div>
        <div className="col-2 mh-100">
          <CurrentActivityComp />
        </div>
        <div className="col-3 mh-100">
          <CurrentSkillComp />
        </div>
        <div className="col mh-100">
          <CurrentResourceComp />
        </div>
        <div className="col-3 mh-100">
          <Resources newChatLog={props.newChatLog} />
        </div>
      </div>
    </div>
  );
};

export default NavigationArea;
