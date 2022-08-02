import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLocation } from "../../Redux/Slices/CurrentLocation";

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
                dispatch(setLocation(`Lumbridge`));
              }}
            >
              Lumbridge
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                console.log(`travelling to Draynor Village`);
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
