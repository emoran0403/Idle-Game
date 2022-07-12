import * as Types from "../../../../Types";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Enemies } from "../../../../Constants/Enemies";

const CombatPanel = (props: Types.CombatPanelProps) => {
  const dispatch = useDispatch();
  // This grabs the current location from state
  const { Current } = useSelector((state: Types.AllState) => state.CurrentLocation) as Types.ICurrentLocation;
  // console.log(Current);
  // console.log(Enemies[Current as keyof Types.IAllEnemies]);
  //@ Enemies[Current as keyof Types.IAllEnemies] is the list of enemies at the current location

  // useEffect(() => {}, []);

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
        <div className="col-lg-9 justify-content-lg-center">Combat in {Current}</div>
      </div>
    );
  };

  const combatOptionsJSX = (enemyObject: Types.IEnemyLocations) => {
    // spread out the enemies into an array so we can display
    let arrayOfEnemies: Types.IEnemySummary[] = [...Object.values(enemyObject)];
    console.log(arrayOfEnemies);
    return (
      <div onClick={() => {}} className="card-title border border-dark border-1 rounded-3">
        <h6 className="text-center">Enemies in {Current}</h6>
        <div className="d-flex flex-row flex-wrap">
          {arrayOfEnemies.map((enemy) => (
            <button
              //! this button should send the message to chat when clicked
              // disabled={WoodcuttingLevel < ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting ? true : false}
              onClick={(e) => {
                console.log(`${enemy.displayName} was clicked`);
                // dispatch(setResource(resource));
                // dispatch(setSkill(`Woodcutting`));
                // dispatch(setActivity(`Skilling`));
                // send a contextual message to the chat window
                // if the last log contains the resource, don't send it
                // if (enemy === props.chatLogArray[props.chatLogArray.length - 1].message.substring(12)) {
                //   return;
                // }
                // props.newChatLog(`Now cutting ${enemy}`, `Activity Swap`);
              }}
              key={`enemy-list-${enemy.displayName}`}
              className={`btn border mb-3`}
            >
              <div className="card-body text">
                <h5 className="card-title">{enemy.displayName}</h5>
                <div className="card-text">
                  <div>Lvl {enemy.level}</div>
                  <div>LP {enemy.lifePoints}</div>
                  {/* <div>{ListOfLogs[enemy as keyof Types.IListOfLogs].XPGivenWoodcutting} XP</div> */}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container card border border-dark border-2 rounded-3">
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          <div className="card-body">
            {/* panel specific content goes here */}
            {combatOptionsJSX(Enemies[Current as keyof Types.IAllEnemies])}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombatPanel;
