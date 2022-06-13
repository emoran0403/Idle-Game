import * as Types from "../../../Types";
import * as React from "react";
import { useEffect } from "react";
import Levels from "./LeftColumn/Levels";
import QuestList from "./LeftColumn/QuestList";
import NavigationArea from "./MiddleColumn/NavigationArea";
import ActivityArea from "./MiddleColumn/ActivityArea";
import ActivityButtons from "./MiddleColumn/ActivityButtonsBar";
import Inventory from "./RightColumn/Inventory";
import ActiveBuffs from "./RightColumn/ActiveBuffs";
import WornEquipment from "./RightColumn/WornEquipment";

const Main = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  //<div className=""></div>
  return (
    <div className="container">
      <div className="row justify-content-center">Title Here</div>
      <div id="game" className="row justify-content-lg-center">
        <div id="left-column" className="col-lg-3">
          <Levels />
          <QuestList />
        </div>

        <div id="middle-column" className="col-lg-3">
          <NavigationArea />
          <ActivityArea />
          <ActivityButtons />
        </div>

        <div id="right-column" className="col-lg-3">
          <Inventory />
          <ActiveBuffs />
          <WornEquipment />
        </div>
      </div>
    </div>
  );
};

export default Main;
