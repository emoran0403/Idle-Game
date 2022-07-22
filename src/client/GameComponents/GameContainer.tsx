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
import { gainXP } from "../Redux/Slices/Experience";
import { addQuestPoints } from "../Redux/Slices/QuestPoints";
import { ListOfLogs, playerEarnsLog } from "../../../Constants/Items/Logs";
import { listOfHatchets } from "../../../Constants/SkillingEquipment/Hatchets";
import { addItemToInventory, removeItemFromInventory } from "../Redux/Slices/Inventory";
import { ListOfFish, playerEarnsFish } from "../../../Constants/Items/Fish";
import { getLevel } from "../../../Constants/XP Levels";
import { Enemies, playerAttacksTarget } from "../../../Constants/Enemies";
import { BackSlot } from "../../../Constants/Equipment/BackSlot";
import { addLogToBank } from "../Redux/Slices/BankSlices/LogsSlice";
import { addFishToBank } from "../Redux/Slices/BankSlices/FishSlice";

const GameContainer = (props: Types.NoProps) => {
  const dispatch = useDispatch();
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget as Types.ICurrentTargetOptions);
  const CurrentQuest = useSelector((state: Types.AllState) => state.Quest.CurrentQuest as Types.ICurrentQuestOptions);
  const playerLocation = useSelector((state: Types.AllState) => state.Location.CurrentLocation as Types.ICurrentLocationOptions);
  const LumbridgeQuestArray = useSelector((state: Types.AllState) => state.Quests_Lumbridge.LumbridgeQuestArray as Types.IStateQuest[]);
  const DraynorQuestArray = useSelector((state: Types.AllState) => state.Quests_Draynor.DraynorQuestArray as Types.IStateQuest[]);
  const CurrentResource = useSelector((state: Types.AllState) => state.Resource.CurrentResource);
  const CurrentSkill = useSelector((state: Types.AllState) => state.Skill.CurrentSkill as Types.ListOfSkillOptions);
  const Experience = useSelector((state: Types.AllState) => state.Experience);
  const CurrentStyle = useSelector((state: Types.AllState) => state.CombatStyle.CurrentStyle as Types.ICurrentStyleOptions);
  const playerInventory = useSelector((state: Types.AllState) => state.Inventory.CurrentInventory);
  const { CurrentActivity } = useSelector((state: Types.AllState) => state.Activity);
  const bank_logs = useSelector((state: Types.AllState) => state.Bank_Logs) as Types.ILogBankSlice;
  const bank_fish = useSelector((state: Types.AllState) => state.Bank_Fish) as Types.IFishBankSlice;
  const playerIsBanking = useSelector((state: Types.AllState) => state.Resources.Banking);
  const ALLSTATE = useSelector((state: Types.AllState) => state);
  // console.log(ALLSTATE);

  // console.log(playerInventory);
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

  //@ assign lifepoints to the player based on levels, and to the target in the usestate
  //? I might not use player Lifepoints lol
  // const [playerLifePoints, setPlayerLifePoints] = useState<number>(getLevel(Experience.Consitution) * 100);
  const [targetLifePoints, setTargetLifePoints] = useState<number>(0);
  const [needsToBank, setNeedsToBank] = useState<boolean>(false);

  //@ this keeps track of time, used to 'save' progress in localStorage, and to update DB
  const [checkPointTimer, setcheckPointTimer] = useState<number>(0);

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
  const handleQuestingTick = () => {
    console.log(`Quest Ticked`);
    // console.log({ questStepProgress, playerLocation, CurrentQuest });
    // every game tick increments a counter, when this counter hits a certain amount, dispatch the appropriate quest reducer
    // the quest reducer increments the stepsComplete counter, and can mark the quest complete
    // if the quest has been completed, it needs to update that in state
    // if the quest has been completed, it must also set the activity to idle, since the quest is complete

    // console.log(`the questStepProgress is ${questStepProgress}`);

    // increment the progress counter
    setQuestStepProgress(questStepProgress + 1);

    // if the progress counter hits 20, reset it to 0, and then run the quest logic based on location
    //! change this to 20 for production
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

  //@ this will run every game tick (while skilling) and holds the logic for resolving a skilling action
  const handleSkillingTick = () => {
    console.log(`Skilling Ticked`);
    // console.log(CurrentSkill);

    // IF the player does not need to bank, continue with the skilling logic
    if (!needsToBank) {
      switch (CurrentSkill) {
        case `Woodcutting`: {
          if (
            playerEarnsLog(
              ListOfLogs[CurrentResource as keyof Types.IListOfLogs],
              Experience.Woodcutting,
              listOfHatchets[currentEquipment.Hatchet as keyof Types.IListOfHatchets]
            )
          ) {
            if (playerIsBanking) {
              // if the player earns a log, AND the player is banking the items, we need to add the item to the inventory
              dispatch(addItemToInventory(ListOfLogs[CurrentResource as keyof Types.IListOfLogs].name));
              // console.log(playerInventory.length);

              // when the player's inventory will be full with the next item added, queue a bank run
              if (playerInventory.length === 27) {
                // console.log(`will need to bank next time`);
                // do bank stuff here
                setNeedsToBank(!needsToBank);
              }
            }

            // send a chatlog
            handleNewChatLog(`Chopped some ${ListOfLogs[CurrentResource as keyof Types.IListOfLogs].displayName}`, `Gained Resource`);
            // console.log(ListOfLogs[CurrentResource as keyof Types.IListOfLogs].XPGivenWoodcutting);
            // apply gained xp
            dispatch(gainXP({ skill: `Woodcutting`, xp: ListOfLogs[CurrentResource as keyof Types.IListOfLogs].XPGivenWoodcutting }));
          }
          break;
        }
        case `Fishing`: {
          if (playerEarnsFish(ListOfFish[CurrentResource as keyof Types.IListOfFish], Experience.Fishing)) {
            // if the player catches a fish, AND the player is banking the items, we need to add the item to the inventory

            if (playerIsBanking) {
              dispatch(addItemToInventory(ListOfFish[CurrentResource as keyof Types.IListOfFish].name));

              // when the player's inventory will be full with the next item added, queue a bank run
              if (playerInventory.length === 27) {
                // console.log(`will need to bank next time`);
                // do bank stuff here
                setNeedsToBank(!needsToBank);
              }
            }

            // send a chatlog
            handleNewChatLog(`Fished a ${ListOfFish[CurrentResource as keyof Types.IListOfFish].displayName}`, `Gained Resource`);
            // console.log(ListOfFish[CurrentResource as keyof Types.IListOfFish].XPGivenFishing);
            // apply gained xp
            dispatch(gainXP({ skill: `Fishing`, xp: ListOfFish[CurrentResource as keyof Types.IListOfFish].XPGivenFishing }));
          }

          break;
        }
      }
    } else {
      // Otherwise, the player needs to bank
      // iterate through the inventory array, adding items from the inventory to the bank
      for (let i = 0; i < playerInventory.length; i++) {
        // find the item, don't shift here as that is mutative
        let itemToAddToBank = playerInventory[i];
        // check each bank slice to see if it's the correct slice, if so, add it to the bank
        //@ using bracket notation for a property that does not exist on an object returns undefined, which is considered falsy
        if (bank_logs[itemToAddToBank as keyof Types.ILogBankSlice]) {
          dispatch(addLogToBank({ item: itemToAddToBank, amount: 1 }));
        } else if (bank_fish[itemToAddToBank as keyof Types.IFishBankSlice]) {
          dispatch(addFishToBank({ item: itemToAddToBank, amount: 1 }));
        }
      }
      // remove all items from the inventory, since they're now in the bank
      dispatch(removeItemFromInventory());

      // after the banking is finished, flip this state
      setNeedsToBank(!needsToBank);
    }
  };

  //@ this will run every game tick (while in combat) and holds the logic for resolving combat turns
  const handleCombatTick = () => {
    console.log(`Combat Ticked`);
    // IF a target is selected, then we can proceed
    if (Target !== `none`) {
      let damageDoneToTarget = playerAttacksTarget(Target, CurrentStyle, playerLocation, Experience, currentEquipment);
      // console.log(`you hit: ${damageDoneToTarget}`);

      // IF the hit would kill the target
      if (targetLifePoints - damageDoneToTarget <= 0) {
        // then reset the lifepoints
        setTargetLifePoints(Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.ILumbridgeEnemies].lifePoints);
        // and award the xp
        dispatch(
          gainXP({ skill: CurrentSkill, xp: Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.ILumbridgeEnemies].XPGivenCombatStyle })
        );
        dispatch(
          gainXP({ skill: `Constitution`, xp: Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.ILumbridgeEnemies].XPGivenConstitution })
        );
        // send a chatlog to the ChatWindow
        handleNewChatLog(`Defeated a ${Target}`, `Monster Defeated`);
      } else {
        // Otherwise, apply the damage
        setTargetLifePoints(targetLifePoints - damageDoneToTarget);
        // console.log(`monster damaged`);
      }

      // console.log(`enemy lifepoints after hit: ${targetLifePoints}`);
    } else {
      // console.log(`check your target and style`);
    }
  };

  //@ this will handle saving the game state to localstorage and the database
  const handleSavePoint = () => {
    // increment the checkPointTimer so we can keep track of the time between saves
    setcheckPointTimer(checkPointTimer + 1);

    if (checkPointTimer % 15 === 0) {
      //@every 30 seconds, stringify state and update localStorage
      console.log(`updating localStorage`);
      let timestamp = Date.now();
      let checkPointData: Types.IcheckPointData = { ...ALLSTATE, timestamp };
      let checkPointDataStringified = JSON.stringify(checkPointData);
      localStorage.setItem("checkPointData", checkPointDataStringified);
    }
    if (checkPointTimer % 150 === 0) {
      //@every 5 mins, update database
      //! make a put req to db
      console.log(`update database`);
      let stateString = JSON.stringify(ALLSTATE);
      localStorage.setItem("checkPointData", stateString);
    }
    console.log(checkPointTimer);
  };

  //@ this useEffect is dedicated to executing the logic of what to do when the quest is complete
  useEffect(() => {
    for (let i = 0; i < AllQuestsFromState.length; i++) {
      // iterate through all the quests until we find the one that was just completed
      // if the quest in state is the same as the current AND it is completed...
      if (AllQuestsFromState[i].name === CurrentQuest && AllQuestsFromState[i].complete) {
        // send a chatlog
        handleNewChatLog(`Congratulations, you completed ${CurrentQuest}`, `Quest Completed`);
        // set player to idle
        dispatch(setActivity(`Idle`));
        // unset current quest
        dispatch(setQuest(`none`));

        // find the quest that was just completed
        let wowQuest: Types.IQuestInfo = LumbridgeQuests[LumbridgeQuests.findIndex((item) => item.name === CurrentQuest)];

        //@ give item rewards
        // if Coins are rewarded, add them to the wallet
        if (wowQuest.itemRewards?.Coins) {
          dispatch(addToWallet(wowQuest.itemRewards.Coins));
        }

        //@ give the expreience rewards
        // Object.entries returns an empty array if there are no expreience rewards
        Object.entries(wowQuest.experienceRewards).forEach(([skill, xp]) => {
          dispatch(gainXP({ skill, xp }));
        });

        //@ give the quest point rewards
        dispatch(addQuestPoints(wowQuest.questPoints));
        // if(){}

        // once we find our quest, terminate the loop
        break;
      }
    }
  }, [questStepProgress]);

  //@ this useEffect is dedicated to combat logic
  useEffect(() => {
    // IF a target is changed, set its lifepoints to component state
    // this ensures we have the correct lifepoints when the player changes targets, or starts combat for the first time
    if (Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.ILumbridgeEnemies]?.lifePoints) {
      setTargetLifePoints(Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.ILumbridgeEnemies].lifePoints);
    }
  }, [Target]);

  //@ this useEffect is dedicated to the 'game tick' logic
  useEffect(() => {
    const interval = setInterval(() => {
      console.count(`Game Ticked`);

      // console.log({ CurrentActivity, Target, CurrentSkill, CurrentResource });

      if (CurrentActivity === `In combat` && Target !== `none`) {
        // combat tick function here
        handleCombatTick();
      } else if (CurrentActivity === `Skilling` && (CurrentSkill === `Woodcutting` || CurrentSkill === `Fishing`)) {
        // skilling tick function here
        handleSkillingTick();
      } else if (CurrentActivity === `Questing` && CurrentQuest !== `none`) {
        // IF the player is questing, and has chosen a quest, then execute questing tick function
        handleQuestingTick();
      } else {
        console.log(`all ticks failed to tick`);
      }

      handleSavePoint();

      //! set this to 2000ms in production, 500ms for testing
    }, 1000);

    return () => clearInterval(interval);
    // any variable the useEffect DEPENDS on need to be in the dependency array
  }, [
    CurrentActivity,
    CurrentResource,
    chatLogArray,
    playerInventory,
    needsToBank,
    Target,
    CurrentSkill,
    CurrentQuest,
    targetLifePoints,
    playerLocation,
    questStepProgress,
    playerIsBanking,
    checkPointTimer,
  ]);

  return (
    <div className="d-flex">
      {/* Remove this button, its for testing*/}
      {/* <div>
        <button onClick={() => handleQuestingTick()}>test quest</button>
      </div> */}
      {/* Remove this button, its for testing*/}
      {/* Remove this button, its for testing*/}
      {/* <div>
        <button onClick={() => handleSkillingTick()}>test skillTick</button>
      </div> */}
      {/* Remove this button, its for testing*/}
      {/* Remove this button, its for testing*/}
      {/* <div>
        <button onClick={() => handleCombatTick()}>test combatTick</button>
      </div> */}
      {/* Remove this button, its for testing*/}

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
