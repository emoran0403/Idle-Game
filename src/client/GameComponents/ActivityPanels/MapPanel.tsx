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
import { AllLocations } from "../../../../Constants/LocationInfo";

const MapPanel = (props: Types.MapPanelProps) => {
  const dispatch = useDispatch();

  /**
   * @returns Returns the JSX for the panel header
   */
  const panelHeaderJSX = () => {
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-2 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <h1 className="col-lg-10 justify-content-lg-center">Choose where you want to travel</h1>
      </div>
    );
  };

  /**
   * resets the current gamestate to default values, preventing players from doing activities in locations where they aren't available
   */
  const resetState = () => {
    dispatch(setTarget(`none`));
    dispatch(setActivity(`Idle`));
    dispatch(setResource(`none`));
    dispatch(setQuest(`none`));
    dispatch(setSkill(`none`));
  };

  /**
   * @param location The location the for the button to send the player to as a key of Types.IAllLocations
   * @returns Returns JSX containing a button to send the player to the specified location.
   */
  const displayTravelButtonJSX = (location: string) => {
    const thisPlace = AllLocations[location as keyof Types.IAllLocations];
    const LocForDispatch = thisPlace.name.substring(thisPlace.name.length - 7, 0);

    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          resetState();
          dispatch(setLocation(LocForDispatch));
        }}
      >
        {thisPlace.displayName}
      </button>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {displayTravelButtonJSX(`Lumbridge`)}
            {displayTravelButtonJSX(`LumbridgeSwampCave`)}
            {displayTravelButtonJSX(`LumbridgeCatacombs`)}
            {displayTravelButtonJSX(`Draynor`)}
            {displayTravelButtonJSX(`WizardTower`)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPanel;
