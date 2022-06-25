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
import ChatWindow from "./LeftColumn/ChatWindow";

const GameContainer = (props: Types.NoProps) => {
  useEffect(() => {}, []);
  //! scale the columns to the viewport size
  //! scale the components to the parent column size
  return (
    <div className="container">
      <div className="row justify-content-center">Title Here</div>
      <div id="gamecontainer" className="row justify-content-lg-center">
        <div id="left-column" className="col-lg-3 border border-dark border-2 rounded-3" style={{ height: "90vh", position: "relative" }}>
          <Levels />
          <QuestList />
          <ChatWindow />
        </div>

        <div id="middle-column" className="col-lg-6 border border-dark border-2 rounded-3" style={{ height: "90vh" }}>
          <NavigationArea />
          <ActivityArea />
        </div>

        <div id="right-column" className="col-lg-3 border border-dark border-2 rounded-3" style={{ height: "90vh" }}>
          <Inventory />
          <ActiveBuffs />
          <WornEquipment />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
