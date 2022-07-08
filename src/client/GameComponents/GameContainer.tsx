import * as Types from "../../../Types";
import * as React from "react";
import Dayjs from "dayjs";
import Levels from "./LeftColumn/Levels";
import QuestList from "./LeftColumn/QuestList";
import NavigationArea from "./MiddleColumn/NavigationArea/NavigationArea";
import Inventory from "./RightColumn/Inventory";
import ActiveBuffs from "./RightColumn/ActiveBuffs";
import WornEquipment from "./RightColumn/WornEquipment";
import ActivityArea from "./MiddleColumn/ActivityArea/ActivityArea";
import ChatWindow from "./LeftColumn/ChatWindow";
import { useEffect, useState } from "react";
//! scale the columns to the viewport size
//! scale the components to the parent column size

const GameContainer = (props: Types.NoProps) => {
  // initialize the chatLogArray with a default welcome message
  // this will hold ALL chatLogs, a subset of which will be displayed based on the current filter settings
  const [chatLogArray, setChatLogArray] = useState<Types.IChatLog[]>([
    {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message: `Welcome to the game!`,
      tags: `Welcome`,
    },
  ]);

  //@ use this to add to the chat log array
  const handleNewChatLog = (message: string, tags: Types.ChatLogTag) => {
    // create a newLog object by generating a timestamp, and the given message and tags array
    let newLog: Types.IChatLog = {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message,
      tags,
    };

    // we only want to hold the most recent 50 logs, removing the oldest
    if (chatLogArray.length >= 50) {
      let tempchatLogArray = [...chatLogArray]; // clone chatLogArray into a temp array
      tempchatLogArray.shift(); // remove the first item (don't assign this, as it returns the removed element)
      tempchatLogArray.push(newLog); // adds the new log to the end of the array
      setChatLogArray(tempchatLogArray); // updates the chatLogArray with the new log
    } else {
      setChatLogArray([...chatLogArray, newLog]);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="row justify-content-center">Title Here</div>
      <div id="gamecontainer" className="row justify-content-lg-center">
        <div id="left-column" className="col-lg-3 border border-dark border-2 rounded-3" style={{ height: "90vh", position: "relative" }}>
          <Levels />
          <QuestList />
          <ChatWindow chatLogArray={chatLogArray} />
        </div>

        <div id="middle-column" className="col-lg-6 border border-dark border-2 rounded-3" style={{ height: "90vh" }}>
          <NavigationArea />
          <ActivityArea />
        </div>

        <div id="right-column" className="col-lg-3 border border-dark border-2 rounded-3" style={{ height: "90vh" }}>
          <Inventory />
          <ActiveBuffs />
          <WornEquipment newChatLog={handleNewChatLog} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
