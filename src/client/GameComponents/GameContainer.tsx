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
import { useSelector } from "react-redux";

//! work on functions to handle a combat exchange
//! work on functions to handle a skilling exchange

const GameContainer = (props: Types.NoProps) => {
  // initialize the chatLogArray with a default welcome message
  // this will hold ALL chatLogs, a subset of which will be displayed based on the current filter settings
  const [chatLogArray, setChatLogArray] = useState<Types.IChatLog[]>([
    {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message: `Welcome to the game!`,
      tags: `Nonfilterable`,
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
    // console.log(newLog);

    /**
     * we only want to hold the most recent 60 logs, removing the oldest as needed
     * new log is added to the end of the array
     * shift() removes from the front, which ends up being the olded messages
     * ChatWindow component reverses to display the most recent logs first
     *
     */
    if (chatLogArray.length >= 60) {
      let tempchatLogArray = [...chatLogArray]; // clone chatLogArray into a temp array
      tempchatLogArray.shift(); // remove the first item (don't assign this, as it returns the removed element)
      tempchatLogArray.push(newLog); // adds the new log to the end of the array
      setChatLogArray(tempchatLogArray); // updates the chatLogArray with the new log
    } else {
      setChatLogArray([...chatLogArray, newLog]);
    }
  };

  //@ currentEquipment is the collection of all the currently worn equipment - use this for combat purposes
  const [currentEquipment, setCurrentEquipment] = useState<Types.ICurrentEquipment>({
    BackSlot: `none`,
    BodySlot: `none`,
    FeetSlot: `none`,
    HandsSlot: `none`,
    HeadSlot: `none`,
    LegsSlot: `none`,
    NeckSlot: `none`,
    RingSlot: `none`,
    TwoHandSlot: `none`,
    Hatchet: `none`,
  });

  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget as Types.ICurrentTargetOptions);
  // console.log({ Target });
  // useEffect(() => {}, []);

  return (
    <div className="d-flex">
      <div id="gamecontainer" className="row justify-content-lg-center">
        <div id="left-column" className="col-lg-3 border border-dark border-2 rounded-3" style={{ height: "90vh", position: "relative" }}>
          <Levels />
          <QuestList />
          <ChatWindow chatLogArray={chatLogArray} />
        </div>

        <div id="middle-column" className="col-lg-6 border border-dark border-2 rounded-3" style={{ height: "90vh" }}>
          <NavigationArea newChatLog={handleNewChatLog} chatLogArray={chatLogArray} />
          <ActivityArea
            newChatLog={handleNewChatLog}
            chatLogArray={chatLogArray}
            setCurrentEquipment={setCurrentEquipment}
            currentEquipment={currentEquipment}
          />
        </div>

        <div id="right-column" className="col-lg-3 border border-dark border-2 rounded-3" style={{ height: "90vh" }}>
          <Inventory />
          <ActiveBuffs />
          <WornEquipment newChatLog={handleNewChatLog} setCurrentEquipment={setCurrentEquipment} currentEquipment={currentEquipment} />
        </div>
      </div>
    </div>
  );
};

export default GameContainer;
