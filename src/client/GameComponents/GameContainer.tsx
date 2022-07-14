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
import { useSelector, useDispatch } from "react-redux";
import { doQuestLogicLumbridge } from "../Redux/Slices/QuestSlices/Lumbridge";
import { doQuestLogicDraynor } from "../Redux/Slices/QuestSlices/Draynor";
import { setActivity } from "../Redux/Slices/CurrentActivity";
import { setQuest } from "../Redux/Slices/CurrentQuest";
import { LumbridgeQuests } from "../../../Constants/Quests/LumbridgeQuests";
import { addToWallet } from "../Redux/Slices/Wallet";

const GameContainer = (props: Types.NoProps) => {
  const dispatch = useDispatch();
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget as Types.ICurrentTargetOptions);

  // CurrentQuest is the name of the quest the player has chosen
  const CurrentQuest = useSelector((state: Types.AllState) => state.Quest.CurrentQuest as Types.ICurrentQuestOptions);
  const playerLocation = useSelector((state: Types.AllState) => state.Location.CurrentLocation as Types.ICurrentLocationOptions);

  const LumbridgeQuestArray = useSelector((state: Types.AllState) => state.Quests_Lumbridge.LumbridgeQuestArray as Types.IStateQuest[]);
  const DraynorQuestArray = useSelector((state: Types.AllState) => state.Quests_Draynor.DraynorQuestArray as Types.IStateQuest[]);

  const AllQuestsFromState: Types.IStateQuest[] = [...LumbridgeQuestArray, ...DraynorQuestArray];

  //@ initialize the chatLogArray with a default welcome message
  //@ this will hold ALL chatLogs, a subset of which will be displayed based on the current filter settings
  const [chatLogArray, setChatLogArray] = useState<Types.IChatLog[]>([
    {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message: `Welcome to the game!`,
      tags: `Nonfilterable`,
    },
  ]);

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
    Hatchet: `bronzehatchet`,
  });

  //@ questStepProgress is holds the progress between completing quest steps
  const [questStepProgress, setQuestStepProgress] = useState<number>(0);

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

  //@ this will run every game tick (while questing) and holds the logic for progressing in quests
  const handleIncrementQuestStep = () => {
    // every game tick increments a counter, when this counter hits a certain amount, dispatch the appropriate quest reducer
    // the quest reducer increments the stepsComplete counter, and can mark the quest complete
    // if the quest has been completed, it needs to update that in state
    // if the quest has been completed, it must also set the activity to idle, since the quest is complete

    // console.log(`the questStepProgress is ${questStepProgress}`);

    // increment the progress counter
    setQuestStepProgress(questStepProgress + 1);

    // if the progress counter hits 20, reset it to 0, and then run the quest logic based on location
    if (questStepProgress === 2) {
      setQuestStepProgress(0);
      switch (playerLocation) {
        case `Lumbridge`: {
          dispatch(doQuestLogicLumbridge(CurrentQuest));
          break;
        }
        case `Draynor`: {
          dispatch(doQuestLogicDraynor(CurrentQuest));
          break;
        }
      }
    }
  };

  //@ this useEffect is dedicated to executing the logic of what to do when the quest is complete
  useEffect(() => {
    //@ reset redux state and send the chat log
    for (let i = 0; i < AllQuestsFromState.length; i++) {
      // if the quest in state is the same as the current AND it is completed...
      if (AllQuestsFromState[i].name === CurrentQuest && AllQuestsFromState[i].complete) {
        // send a chatlog
        handleNewChatLog(`Congratulations, you completed ${CurrentQuest}`, `Quest Completed`);
        // set player to idle
        dispatch(setActivity(`Idle`));
        // unset current quest
        dispatch(setQuest(`none`));

        //@ give quest xp
        // find the quest that was just completed
        let wowQuest: Types.IQuestInfo = LumbridgeQuests[LumbridgeQuests.findIndex((item) => item.name === CurrentQuest)];

        // if Coins are rewarded, add them to the wallet
        if (wowQuest.itemRewards?.Coins) {
          dispatch(addToWallet(wowQuest.itemRewards.Coins));
        }
        break;
      }
    }
  }, [questStepProgress]);

  return (
    <div className="d-flex">
      {/* Remove this button, its for testing quest steps */}
      <div>
        <button onClick={() => handleIncrementQuestStep()}>test quest</button>
      </div>
      {/* Remove this button, its for testing quest steps */}

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
            questStepProgress={questStepProgress}
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
