import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../Redux/Slices/CurrentLocation";
import { setTarget } from "../../Redux/Slices/CurrentTarget";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setResource } from "../../Redux/Slices/CurrentResource";
import { setQuest } from "../../Redux/Slices/CurrentQuest";
import { setSkill } from "../../Redux/Slices/CurrentSkill";

const MapPanel = (props: Types.MapPanelProps) => {
  const dispatch = useDispatch();

  //   useEffect(() => {}, []);

  const panelHeaderJSX = () => {
    // returns the JSX for the panel header
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-3 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <div className="col-lg-9 justify-content-lg-center">Choose where you want to travel</div>
      </div>
    );
  };
  const resetState = () => {
    dispatch(setTarget(`none`));
    dispatch(setActivity(`Idle`));
    dispatch(setResource(`none`));
    dispatch(setQuest(`none`));
    dispatch(setSkill(`none`));
  };
  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {/* panel specific content goes here */}
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log(`travelling to Lumbridge`);
                resetState();
                dispatch(setLocation(`Lumbridge`));
              }}
            >
              Lumbridge
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log(`travelling to Draynor Village`);
                resetState();
                dispatch(setLocation(`Draynor`));
              }}
            >
              Draynor Village
            </button>
            {/* <button className="btn btn-primary" onClick={() => {}}></button>
            <button className="btn btn-primary" onClick={() => {}}></button>
            <button className="btn btn-primary" onClick={() => {}}></button> */}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
