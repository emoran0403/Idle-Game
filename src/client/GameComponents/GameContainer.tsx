import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import Levels from "./LeftColumn/Levels";
import QuestList from "./LeftColumn/QuestList";
import NavigationArea from "./MiddleColumn/NavigationArea/NavigationArea";
import Inventory from "./RightColumn/Inventory";
import ActiveBuffs from "./RightColumn/ActiveBuffs";
import WornEquipment from "./RightColumn/WornEquipment";
import ActivityArea from "./MiddleColumn/ActivityArea/ActivityArea";

const GameContainer = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  return (
    <div className="container">
      <div className="row justify-content-center">Title Here</div>
      <div id="gamecontainer" className="row justify-content-lg-center">
        <div id="left-column" className="col-lg-3 border border-dark border-2 rounded-3">
          <Levels />
          <QuestList />
        </div>

        <div id="middle-column" className="col-lg-6 border border-dark border-2 rounded-3">
          <NavigationArea />
          <ActivityArea />
        </div>

        <div id="right-column" className="col-lg-3 border border-dark border-2 rounded-3">
          <Inventory />
          <ActiveBuffs />
          <WornEquipment />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
