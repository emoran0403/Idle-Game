// module imports
import * as Types from "../../../Types";
import * as React from "react";
import Dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// component imports
import Levels from "./LeftColumn/Levels";
import QuestList from "./LeftColumn/QuestList";
import NavigationArea from "./MiddleColumn/NavigationArea/NavigationArea";
import Inventory from "./RightColumn/Inventory";
import ActiveBuffs from "./RightColumn/ActiveBuffs";
import WornEquipment from "./RightColumn/WornEquipment";
import ActivityArea from "./MiddleColumn/ActivityArea/ActivityArea";
import ChatWindow from "./LeftColumn/ChatWindow";

// slice imports
import { doQuestLogicLumbridge } from "../Redux/Slices/QuestSlices/Lumbridge";
import { doQuestLogicDraynor } from "../Redux/Slices/QuestSlices/Draynor";
import { setActivity } from "../Redux/Slices/CurrentActivity";
import { setQuest } from "../Redux/Slices/CurrentQuest";
import { addCoinsToWallet } from "../Redux/Slices/Wallet";
import { gainXP, resetXP } from "../Redux/Slices/Experience";
import { addQuestPoints } from "../Redux/Slices/QuestPoints";
import { addItemToInventory, removeItemFromInventory } from "../Redux/Slices/Inventory";

// constants imports
import { LumbridgeQuests } from "../../../Constants/Quests/LumbridgeQuests";
import { DraynorQuests } from "../../../Constants/Quests/DraynorQuests";
import { EmptyQuestRewards } from "../../../Constants/Quests";

// combat
import { didPlayerLevelUp, getLevel } from "../../../Constants/XP Levels";
import { Enemies, resolveCombat } from "../../../Constants/Enemies";
// slayer
import { completeSlayerTask, decrementTaskAmount } from "../Redux/Slices/SlayerTask";

// woodcutting
import { addLogToBank } from "../Redux/Slices/BankSlices/LogsSlice";
import { ListOfLogs, playerEarnsLog } from "../../../Constants/Items/Logs";
import { listOfHatchets } from "../../../Constants/SkillingEquipment/Hatchets";

// mining
import { addOreToBank } from "../Redux/Slices/BankSlices/OresSlice";
import { ListOfOres, resolveMining } from "../../../Constants/Items/Ores";
import { listOfPickaxes } from "../../../Constants/SkillingEquipment/Pickaxes";

// fishing
import { addFishToBank } from "../Redux/Slices/BankSlices/FishSlice";
import { ListOfFish, playerEarnsFish } from "../../../Constants/Items/Fish";

// thieving
import { resolveThieving } from "../../../Constants/Thieving/SuccessFunction";
import { ListOfPickpocketNPC } from "../../../Constants/Thieving/Pickpocketing";
import { ListOfPickpocketStalls } from "../../../Constants/Thieving/Stalls";
// misc imports
import { saveState } from "../Redux/store";
import { TOKEN_KEY } from "../ClientUtils/Fetcher";
import { ListOfSlayerMasters } from "../../../Constants/Slayer/SlayerMasters";

const GameContainer = (props: Types.GameContainerProps) => {
  const dispatch = useDispatch();
  const Target = useSelector((state: Types.AllState) => state.Target.CurrentTarget) as Types.ICurrentTargetOptions;
  const CurrentQuest = useSelector((state: Types.AllState) => state.Quest.CurrentQuest) as Types.ICurrentQuestOptions;
  const playerLocation = useSelector((state: Types.AllState) => state.Location.CurrentLocation) as Types.ICurrentLocationOptions;
  const LumbridgeQuestArray = useSelector((state: Types.AllState) => state.Quests_Lumbridge.LumbridgeQuestArray) as Types.IStateQuest[];
  const DraynorQuestArray = useSelector((state: Types.AllState) => state.Quests_Draynor.DraynorQuestArray) as Types.IStateQuest[];
  const CurrentResource = useSelector((state: Types.AllState) => state.Resource.CurrentResource) as Types.ICurrentResourceOptions;
  const CurrentSkill = useSelector((state: Types.AllState) => state.Skill.CurrentSkill) as Types.ListOfSkillOptions;
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  const CurrentStyle = useSelector((state: Types.AllState) => state.CombatStyle.CurrentStyle) as Types.ICurrentStyleOptions;
  const playerInventory = useSelector((state: Types.AllState) => state.Inventory.CurrentInventory);
  const CurrentActivity = useSelector((state: Types.AllState) => state.Activity.CurrentActivity) as Types.ICurrentActivityOptions;
  const bank_logs = useSelector((state: Types.AllState) => state.Bank_Logs) as Types.ILogBankSlice;
  const bank_fish = useSelector((state: Types.AllState) => state.Bank_Fish) as Types.IFishBankSlice;
  const bank_ores = useSelector((state: Types.AllState) => state.Bank_Ores) as Types.IOreBankSlice;
  const playerIsBanking = useSelector((state: Types.AllState) => state.Resources.Banking);
  const SlayerTask = useSelector((state: Types.AllState) => state.SlayerTask);

  const ALLSTATE = useSelector((state: Types.AllState) => state);
  // console.log(ALLSTATE);

  // console.log(playerInventory);
  const AllQuestsFromState: Types.IStateQuest[] = [...LumbridgeQuestArray, ...DraynorQuestArray];

  //@ initialize the chatLogArray with a default welcome message
  //@ this will hold ALL chatLogs, a subset of which will be displayed based on the current filter settings
  const [chatLogArray, setChatLogArray] = useState<Types.IChatLog[]>([
    {
      timeStamp: Dayjs().format("HH:mm:ss"),
      message: `${welcomeMessage()}`,
      tags: `Nonfilterable`,
    },
  ]);

  //@ populate the first chatlog with a welcome message to the player, using the player's username from the token in localStorage
  function welcomeMessage() {
    const token = localStorage.getItem(TOKEN_KEY)!;
    if (!token) {
      return `Welcome to the game!`;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return `Welcome to the game, ${JSON.parse(window.atob(base64)).username}!`;
  }

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
    Pickaxe: `bronzepickaxe`,
  });

  //@ questStepProgress is holds the progress between completing quest steps
  const [questStepProgress, setQuestStepProgress] = useState<number>(0);

  /**
   * assign lifepoints to the player based on their constitution level.  this will be decremented in combat.
   * assign lifepoints to the target.
   * a usestate will track changes to the current target, setting lifepoints accordingly.
   */
  const [playerLifePoints, setPlayerLifePoints] = useState<number>(getLevel(Experience[`Constitution`]) * 100);
  const [targetLifePoints, setTargetLifePoints] = useState<number>(0);

  /**
   * use this to keep track of the time remaining to heal the player to full lifepoints
   * when the player is reduced to 0 lifepoints, set this to 24 to incur a 1 minute healing time
   */
  const [healTimeRemaining, setHealTimeRemaining] = useState<number>(0);

  //@ assign the ore rock's durability to state to track progress towards receiving an ore
  const [oreRockDurability, setOreRockDurability] = useState<number>(0);

  //@ use this to keep track of the stun time remaining for when a player fails a thieving attempt
  const [stunTimeRemaining, setStunTimeRemaining] = useState<number>(0);

  //@ this is set when the player gains an item which will fill their inventory
  const [needsToBank, setNeedsToBank] = useState<boolean>(true);

  //@ this keeps track of time, used to 'save' progress in localStorage, and to update DB
  const [checkPointTimer, setcheckPointTimer] = useState<number>(1);

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
     * shift() removes from the front, which ends up being the oldest messages
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

  /**
   * handleMultipleChatLogs queues up multiple chat logs to send to the chat window component.
   *
   * @param messages - An array of chatlogs to send as string[]
   * @param tags - An array of chatlogtags to send as Types.ChatLogTag[]
   */
  const handleMultipleChatLogs = (messages: string[], tags: Types.ChatLogTag[]) => {
    // create an array of chatlogs from the messages and tags, along with a timestamp
    let newMessagesToAdd: Types.IChatLog[] = [];

    for (let i = 0; i < messages.length; i++) {
      let newLog: Types.IChatLog = {
        timeStamp: Dayjs().format("HH:mm:ss"),
        message: messages[i],
        tags: tags[i],
      };
      newMessagesToAdd.push(newLog);
    }

    // if there will be more than 60 messages, we need to remove enough so that we end with 60
    if (chatLogArray.length + newMessagesToAdd.length >= 60) {
      // clone chatLogArray and the new chat log array into a temp array
      let tempchatLogArray = [...chatLogArray, ...newMessagesToAdd];

      for (let j = 60; j < chatLogArray.length; j++) {
        // start at 60, continue until we reach the length of the chat log array,
        // this will result in the number of old messages that need removing
        // remove the first (oldest) message from the array
        tempchatLogArray.shift();
      }
      setChatLogArray(tempchatLogArray);
    } else {
      // otherwise, we can just add the new chatlogs
      setChatLogArray([...chatLogArray, ...newMessagesToAdd]);
    }
  };

  //@ this will run every game tick (while questing) and holds the logic for progressing in quests
  const handleQuestingTick = () => {
    // console.log(`Quest Ticked`);
    // console.log({ questStepProgress, playerLocation, CurrentQuest });
    // every game tick increments a counter, when this counter hits a certain amount, dispatch the appropriate quest reducer
    // the quest reducer increments the stepsComplete counter, and can mark the quest complete
    // if the quest has been completed, it needs to update that in state
    // if the quest has been completed, it must also set the activity to idle, since the quest is complete

    // console.log(`the questStepProgress is ${questStepProgress}`);

    // increment the progress counter
    setQuestStepProgress(questStepProgress + 1);

    // if the progress counter hits 24, reset it to 0, and then run the quest logic based on location
    //! swap for production
    //@================================================
    if (questStepProgress === 24) {
      //@======PRODUCTION ABOVE, DEV BELOW============================================
      // if (questStepProgress === 2) {
      //@================================================

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

  //@ one of these will run every game tick (while skilling) and holds the logic for resolving a skilling action
  /**
   * This function handles the logic of what to do when the player is woodcutting.
   * It determines if the player earns a log, levels up, and (depending on state) adds the log to the inventory.
   */
  const handleWoodcuttingTick = () => {
    //* if the player does not need to bank, proceed with the handling
    if (!needsToBank) {
      //* if the player earned a log, continue with the logic, otherwise, do nothing
      // define the current log for readability
      const thisLog = ListOfLogs[CurrentResource as keyof Types.IListOfLogs];
      if (playerEarnsLog(thisLog, Experience[`Woodcutting`], listOfHatchets[currentEquipment[`Hatchet`] as keyof Types.IListOfHatchets])) {
        //* initialize empty chatlogs
        let woodcuttingMessages: string[] = [];
        let woodcuttingMessagesTags: Types.ChatLogTag[] = [];

        //* apply gained xp and queue a chatlog
        dispatch(gainXP({ skill: `Woodcutting`, xp: thisLog[`XPGivenWoodcutting`] }));
        woodcuttingMessages.push(`Gained ${thisLog[`XPGivenWoodcutting`]} xp in Woodcutting`);
        woodcuttingMessagesTags.push(`Gained XP`);

        //* decide if the player gained a level
        const playerLevelled = didPlayerLevelUp(Experience[`Woodcutting`], thisLog[`XPGivenWoodcutting`]);

        //* if the player gained a level, queue a chatlog
        if (playerLevelled) {
          woodcuttingMessages.push(`Woodcutting Level up!`);
          woodcuttingMessagesTags.push(`Level Up`);
        }

        //* if the player is banking do inventory logic and queue the relevant chatlog
        if (playerIsBanking) {
          // add the item to the inventory
          dispatch(addItemToInventory(thisLog[`name`]));

          // queue the chatlogs
          woodcuttingMessages.push(`Chopped some ${thisLog[`displayName`]}`);
          woodcuttingMessagesTags.push(`Gained Resource`);

          // if the new log will be the 28th, set the needsToBank component state to true
          if (playerInventory.length === 27) {
            // console.log(`will need to bank next time`);
            setNeedsToBank(true);
          }
        } else {
          //* otherwise, the player is not banking, so queue the relevant chatlog
          // queue the chatlogs
          woodcuttingMessages.push(`Chopped and dropped some ${thisLog[`displayName`]}`);
          woodcuttingMessagesTags.push(`Gained Resource`);
        }

        //* finally, send the queued chatlogs
        handleMultipleChatLogs(woodcuttingMessages, woodcuttingMessagesTags);
      }
    } else {
      //* otherwise, call handleBanking
      handleBanking();
    }
  };
  /**
   * This function handles the logic of what to do when the player is fishing.
   * It determines if the player catches a fish, levels up, and (depending on state) adds the fish to the inventory.
   */
  const handleFishingTick = () => {
    //* if the player does not need to bank, proceed with the handling
    if (!needsToBank) {
      //* if the player caught a fish, continue with the logic, otherwise, do nothing
      // define the current fish for readability
      let thisFish = ListOfFish[CurrentResource as keyof Types.IListOfFish];
      if (playerEarnsFish(thisFish, Experience[`Fishing`])) {
        //* initialize empty chatlogs
        let FishingMessages: string[] = [];
        let FishingMessagesTags: Types.ChatLogTag[] = [];

        //* apply gained xp and queue a chatlog
        dispatch(gainXP({ skill: `Fishing`, xp: thisFish[`XPGivenFishing`] }));
        FishingMessages.push(`Gained ${thisFish[`XPGivenFishing`]} xp in Fishing`);
        FishingMessagesTags.push(`Gained XP`);

        //* decide if the player gained a level
        const playerLevelled = didPlayerLevelUp(Experience[`Fishing`], thisFish[`XPGivenFishing`]);

        //* if the player gained a level, queue a chatlog
        if (playerLevelled) {
          FishingMessages.push(`Fishing Level up!`);
          FishingMessagesTags.push(`Level Up`);
        }

        //* if the player is banking do inventory logic and queue the relevant chatlog
        if (playerIsBanking) {
          // add the item to the inventory
          dispatch(addItemToInventory(thisFish[`name`]));

          // queue the chatlogs
          FishingMessages.push(`Fished a ${thisFish[`displayName`]}`);
          FishingMessagesTags.push(`Gained Resource`);

          // if the new fish will be the 28th, set the needsToBank component state to true
          if (playerInventory.length === 27) {
            // console.log(`will need to bank next time`);
            setNeedsToBank(true);
          }
        } else {
          //* otherwise, the player is not banking, so queue the relevant chatlog
          // queue the chatlogs
          FishingMessages.push(`Fished and dropped a ${thisFish[`displayName`]}`);
          FishingMessagesTags.push(`Gained Resource`);
        }

        //* finally, send the queued chatlogs
        handleMultipleChatLogs(FishingMessages, FishingMessagesTags);
      }
    } else {
      //* otherwise, call handleBanking
      handleBanking();
    }
  };
  /**
   * This function handles the logic of what to do when the player is mining.
   * It determines if the player mines an ore, levels up, and (depending on state) adds the ore to the inventory.
   */
  const handleMiningTick = () => {
    /**
     * The logic to handle mining is slightly different from woodcutting and fishing.  The player always gets xp, albeit a variable amount.
     * The player does damage to the ore rock, and receives an ore when the rock takes enough damage, making it similar to combat
     */

    //* if the player does not need to bank, proceed with the handling
    if (!needsToBank) {
      //* call resolveMining, and store the return value. this holds the experience and damage dealt to the rock
      // define the current orerock for readability
      let thisRock = ListOfOres[CurrentResource as keyof Types.IListOfOres];
      let MiningResult = resolveMining(
        thisRock,
        listOfPickaxes[currentEquipment[`Pickaxe`] as keyof Types.IListOfPickaxes],
        Experience[`Mining`],
        Experience[`Strength`]
      );

      //* mining always yields experience, so dispatch it
      dispatch(gainXP({ skill: `Mining`, xp: MiningResult[`experience`] }));

      //* initialize chatlogs with the experience message
      let miningMessages: string[] = [`Gained ${MiningResult[`experience`]} xp in Mining`];
      let miningMessagesTags: Types.ChatLogTag[] = [`Gained XP`];

      //* decide if the player gained a level, and if so queue a chatlog
      const playerLevelled = didPlayerLevelUp(Experience[`Mining`], MiningResult[`experience`]);
      if (playerLevelled) {
        miningMessages.push(`Mining Level up!`);
        miningMessagesTags.push(`Level Up`);
      }

      //* apply the damage to the ore rock and queue relevant chatlogs
      // IF the damage would deplete the rock (or cause the durability to go negative), reset the durability and give an ore to the player
      if (oreRockDurability - MiningResult.damage <= 0) {
        // reset the durability
        setOreRockDurability(thisRock[`durability`]);

        // IF the player earns an ore, AND the player is banking the items, we need to add the item to the inventory and queue the relevant chatlog
        if (playerIsBanking) {
          // add the item to the inventory
          dispatch(addItemToInventory(thisRock[`name`]));

          // queue a chatlog for gaining an ore
          miningMessages.push(`Mined some ${thisRock[`displayName`]}`);
          miningMessagesTags.push(`Gained Resource`);

          // when the player's inventory will be full with the next item added, queue a bank run
          if (playerInventory.length === 27) {
            // console.log(`will need to bank next time`);
            setNeedsToBank(true);
          }
        } else {
          //* otherwise the player is dropping items, so queue the relevant chatlog
          // queue a chatlog for gaining an ore
          miningMessages.push(`Mined and dropped some ${thisRock[`displayName`]}`);
          miningMessagesTags.push(`Gained Resource`);
        }
      } else {
        // Otherwise, just apply the damage
        setOreRockDurability(oreRockDurability - MiningResult[`damage`]);
      }

      handleMultipleChatLogs(miningMessages, miningMessagesTags);
    } else {
      //* otherwise, call handleBanking
      handleBanking();
    }
  };
  /**
   * This function handles the logic of what to do when the player is thieving.
   * It determines if the player successfully pickpockets and levels up, based on the player's choice of NPC or stall.
   */
  const handleThievingTick = () => {
    //* initialize empty chatlogs
    let thievingMessages: string[] = [];
    let thievingMessagesTags: Types.ChatLogTag[] = [];

    //* if the player has been caught and is currently stunned,
    if (stunTimeRemaining > 0) {
      // send a chatlog
      thievingMessages.push(`You are still stunned from your previous thieving attempt`);
      thievingMessagesTags.push(`Misc`);
      handleMultipleChatLogs(thievingMessages, thievingMessagesTags);

      // and decrement the timer
      setStunTimeRemaining(stunTimeRemaining - 1);

      //* if the player is not currently stunned, they may attempt to steal
    } else {
      //* since thieving has 2 major options, call resolveThieving on the chosen option, and store the return object.
      if (ListOfPickpocketNPC[CurrentResource as keyof Types.IListOfPickpocketNPC]) {
        //* pickpocketing logic here

        // define this pickpocket npc for readability
        let thisPickpocketNPC = ListOfPickpocketNPC[CurrentResource as keyof Types.IListOfPickpocketNPC];
        let ThievingResult = resolveThieving(thisPickpocketNPC, Experience[`Thieving`], Experience[`Agility`]);
        console.log({ ThievingResult });
        //* if the player is successful in their pickpocketing attempt
        if (ThievingResult[`outcome`]) {
          // queue up a chatlog with the outcome
          thievingMessages.push(`Stole ${ThievingResult[`coins`]} coins from ${thisPickpocketNPC[`displayName`]}`);
          thievingMessagesTags.push(`Gained Resource`);

          // give coins
          dispatch(addCoinsToWallet(ThievingResult[`coins`]));

          // give xp and queue a chatlog
          dispatch(gainXP({ skill: `Thieving`, xp: thisPickpocketNPC[`XPGivenThieving`] }));
          thievingMessages.push(`Gained ${thisPickpocketNPC[`XPGivenThieving`]} xp in Thieving`);
          thievingMessagesTags.push(`Gained XP`);

          // decide if the player gained a level, and queue a chatlog if so
          const playerLevelled = didPlayerLevelUp(Experience[`Thieving`], thisPickpocketNPC[`XPGivenThieving`]);
          if (playerLevelled) {
            thievingMessages.push(`Thieving Level up!`);
            thievingMessagesTags.push(`Level Up`);
          }

          //* finally send the chatlogs
          handleMultipleChatLogs(thievingMessages, thievingMessagesTags);
        } else {
          //* if the player is not successful in their pickpocketing attempt

          // queue up a chatlog with the outcome
          thievingMessages.push(`The ${thisPickpocketNPC[`displayName`]} caught you!`);
          thievingMessagesTags.push(`Misc`);

          // set the stun time
          setStunTimeRemaining(thisPickpocketNPC[`stunTime`]);

          //* finally send the chatlogs
          handleMultipleChatLogs(thievingMessages, thievingMessagesTags);
        }
      } else {
        //*  otherwise, the player is thieving from stalls, so do these steps
        // stall logic here
        // define this picket stall for readability
        let thisPickpocketStall = ListOfPickpocketStalls[CurrentResource as keyof Types.IListOfPickpocketStall];
        let ThievingResult = resolveThieving(thisPickpocketStall, Experience[`Thieving`], Experience[`Agility`]);
        console.log({ ThievingResult });

        if (ThievingResult[`outcome`]) {
          //* if the player is successful in their thieving stall attempt

          // queue up a chatlog with the outcome
          thievingMessages.push(`Stole from the ${thisPickpocketStall[`displayName`]}. Items coming soon(tm)`);
          thievingMessagesTags.push(`Gained Resource`);

          // give xp and queue a chatlog
          dispatch(gainXP({ skill: `Thieving`, xp: thisPickpocketStall[`XPGivenThieving`] }));
          thievingMessages.push(`Gained ${thisPickpocketStall[`XPGivenThieving`]} xp in Thieving`);
          thievingMessagesTags.push(`Gained XP`);

          // decide if the player gained a level, and queue a chatlog if so
          const playerLevelled = didPlayerLevelUp(Experience[`Thieving`], thisPickpocketStall[`XPGivenThieving`]);
          if (playerLevelled) {
            thievingMessages.push(`Thieving Level up!`);
            thievingMessagesTags.push(`Level Up`);
          }

          //* finally send the chatlogs
          handleMultipleChatLogs(thievingMessages, thievingMessagesTags);
        } else {
          //* if the player is not successful in their thieving stall attempt

          // queue up a chatlog with the outcome
          thievingMessages.push(`The ${thisPickpocketStall[`displayName`]}'s owner caught you!`);
          thievingMessagesTags.push(`Misc`);

          // set the stun time
          setStunTimeRemaining(thisPickpocketStall[`stunTime`]);

          //* finally send the chatlogs
          handleMultipleChatLogs(thievingMessages, thievingMessagesTags);
        }
      }
    }
  };
  /**
   * This function removes items from the player's inventory and adds them to the bank.
   * Then, it resets the needsToBank component state to false.
   * Call this at the end of every skilling function.
   */
  const handleBanking = () => {
    // Otherwise, the player needs to bank
    // iterate through the inventory array, adding items from the inventory to the bank
    for (let i = 0; i < playerInventory.length; i++) {
      // find the item, don't shift here as that is mutative
      let item = playerInventory[i];
      let amount = 1;
      // check each bank slice to see if it's the correct slice, if so, add it to the bank
      //@ using bracket notation for a property that does not exist on an object returns undefined, which is considered falsy
      if (bank_logs[item as keyof Types.IListOfLogs]) {
        dispatch(addLogToBank({ item, amount }));
      } else if (bank_fish[item as keyof Types.IListOfFish]) {
        dispatch(addFishToBank({ item, amount }));
      } else if (bank_ores[item as keyof Types.IListOfOres]) {
        dispatch(addOreToBank({ item, amount }));
      }
    }
    // remove all items from the inventory, since they're now in the bank
    dispatch(removeItemFromInventory());

    // after the banking is finished, flip this state
    setNeedsToBank(!needsToBank);
  };

  const handleSlayerTask = (enemy: Types.IEnemySummary) => {
    // define an interface for the return object
    interface IreturnObj {
      messagesArray: string[];
      tagsArray: Types.ChatLogTag[];
    }
    // define the return object - this will hold the chat logs created by this function
    let returnObj: IreturnObj = {
      messagesArray: [],
      tagsArray: [],
    };

    //* dispatch slayer xp, and queue up chat logs
    dispatch(gainXP({ skill: `Slayer`, xp: enemy[`XPGivenSlayer`] }));
    let slayerMessages: string[] = [`Gained ${Math.floor(enemy[`XPGivenSlayer`])} xp in Slayer`];
    let slayerMessagesTags: Types.ChatLogTag[] = [`Gained XP`];

    //* if the player gained a level in Slayer, queue a chatlog
    if (didPlayerLevelUp(Experience.Slayer, enemy.XPGivenSlayer)) {
      // if so, queue up a chatlog
      slayerMessages.push(`Slayer Level up!`);
      slayerMessagesTags.push(`Level Up`);
    }

    /**
     * @ when smoking kills quest is implemented, refactor the logic below check to check for completion
     *  - because smoking kills influences how many slayer points are rewarded
     */

    // if (smoking kills is complete) {
    //   let slayerPointsEarned = masterHere.smokingKills.complete.taskPoints;
    // } else {
    //   let slayerPointsEarned = masterHere.smokingKills.incomplete.taskPoints;
    // }

    //* if the task will be complete after decrementing the counter, reward the slayer points
    if (SlayerTask.amount === 1) {
      //* define the assigning master to reward slayer points appropriately
      // create a new copy of the list of slayer masters
      const copyOfListOfSlayerMasters = [...ListOfSlayerMasters];
      // filter the copy for the master that assigned the task, then destructure that resultant array for ease of use
      const [assigningMaster] = copyOfListOfSlayerMasters.filter((master) => master[`name`] === SlayerTask[`taskMaster`]);

      //* reward with the appropriate amount for every 50th, 10th, or individual task, and queue up chatlogs
      if ((SlayerTask[`taskCounter`] + 1) % 50 === 0) {
        slayerMessages.push(
          `Completed ${SlayerTask[`taskCounter`] + 1} tasks and earned ${assigningMaster[`smokingKills`][`incomplete`][`task50`]} Slayer Points`
        );
        slayerMessagesTags.push(`Misc`);
        dispatch(completeSlayerTask(assigningMaster[`smokingKills`][`incomplete`][`task50`]));
        dispatch(decrementTaskAmount());
        returnObj.messagesArray.push(...slayerMessages);
        returnObj.tagsArray.push(...slayerMessagesTags);
        return returnObj;
      } else if ((SlayerTask[`taskCounter`] + 1) % 10 === 0) {
        slayerMessages.push(
          `Completed ${SlayerTask[`taskCounter`] + 1} tasks and earned ${assigningMaster[`smokingKills`][`incomplete`][`task10`]} Slayer Points`
        );
        slayerMessagesTags.push(`Misc`);
        dispatch(completeSlayerTask(assigningMaster[`smokingKills`][`incomplete`][`task10`]));
        dispatch(decrementTaskAmount());
        returnObj.messagesArray.push(...slayerMessages);
        returnObj.tagsArray.push(...slayerMessagesTags);
        return returnObj;
      } else {
        slayerMessages.push(
          `Completed ${SlayerTask[`taskCounter`] + 1} tasks and earned ${assigningMaster[`smokingKills`][`incomplete`][`taskPoints`]} Slayer Points`
        );
        slayerMessagesTags.push(`Misc`);
        dispatch(completeSlayerTask(assigningMaster[`smokingKills`][`incomplete`][`taskPoints`]));
        dispatch(decrementTaskAmount());
        returnObj.messagesArray.push(...slayerMessages);
        returnObj.tagsArray.push(...slayerMessagesTags);
        return returnObj;
      }
    }
    //* otherwise, dispatch an action to decrement the task amount
    dispatch(decrementTaskAmount());
    returnObj.messagesArray.push(...slayerMessages);
    returnObj.tagsArray.push(...slayerMessagesTags);
    return returnObj;
  };

  //@ this will run every game tick (while in combat) and holds the logic for resolving combat turns
  const handleCombatTick = () => {
    let arrayOfCombatStyleSkills = ["Attack", "Strength", "Defence", "Ranged", "Magic"];
    // console.log(`Combat Ticked`);
    // IF a target is selected, AND a combat skill is chosen, AND the player is not healing, then we can proceed

    if (Target !== `none` && arrayOfCombatStyleSkills.includes(CurrentSkill) && healTimeRemaining === 0) {
      // call resolveCombat and destructure the properties
      let { damageToPlayer, damageToEnemy } = resolveCombat(Target, CurrentStyle, playerLocation, Experience, currentEquipment);
      // define the enemy for readability
      let thisEnemy = Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations] as Types.IEnemySummary;

      console.log({
        Task: SlayerTask.task[0],
        Amount: SlayerTask.amount,
        CurrentStyle,
        damageToPlayer,
        damageToEnemy,
        playerLifePoints,
        targetLifePoints,
        healTimeRemaining,
      });

      // IF the hit would kill the target
      if (targetLifePoints - damageToEnemy <= 0) {
        // then reset the lifepoints
        setTargetLifePoints(thisEnemy[`lifePoints`]);

        //* award coins; award xp in the chosen combat skill, constitution, and possibly prayer and slayer

        // award the coins in the range of 0 - half of lifepoints
        let coinDrop: number = Math.floor(thisEnemy[`level`] * (Math.random() * 0.5));
        dispatch(addCoinsToWallet(coinDrop));

        // prepare chatlogs for defeating an enemy, and possibly for levelling up
        let combatMessages: string[] = [`Defeated a ${thisEnemy[`displayName`]} and earned ${coinDrop.toLocaleString("en-US")} coins`];
        let combatMessagesTags: Types.ChatLogTag[] = [`Monster Defeated`];

        // award the combat style xp and check if the player gained a level in their combat style
        dispatch(gainXP({ skill: CurrentSkill, xp: thisEnemy[`XPGivenCombatStyle`] }));

        combatMessages.push(`Gained ${thisEnemy[`XPGivenCombatStyle`]} xp in ${CurrentSkill}`);
        combatMessagesTags.push(`Gained XP`);

        if (didPlayerLevelUp(Experience[CurrentSkill as keyof Types.ISkillList], thisEnemy[`XPGivenCombatStyle`])) {
          // if so, queue up a chatlog
          combatMessages.push(`${CurrentSkill} Level up!`);
          combatMessagesTags.push(`Level Up`);
        }

        // award the constitution xp and check if the player gained a level in constitution
        dispatch(
          gainXP({
            skill: `Constitution`,
            xp: thisEnemy[`XPGivenConstitution`],
          })
        );
        if (didPlayerLevelUp(Experience[CurrentSkill as keyof Types.ISkillList], thisEnemy[`XPGivenConstitution`])) {
          // if so, queue up a chatlog
          combatMessages.push(`Constitution Level up!`);
          combatMessagesTags.push(`Level Up`);
        }

        // award the prayer xp if the enemy drops prayer xp items, and check if the player gained a level in prayer
        if (thisEnemy[`XPGivenPrayer`]) {
          dispatch(gainXP({ skill: `Prayer`, xp: thisEnemy[`XPGivenPrayer`] }));

          if (didPlayerLevelUp(Experience[`Prayer`], thisEnemy[`XPGivenPrayer`])) {
            // if so, queue up a chatlog
            combatMessages.push(`Prayer Level up!`);
            combatMessagesTags.push(`Level Up`);
          }
        }
        //* if the current enemy's slayer classes include the current slayer task, call handleSlayerTask.
        if (thisEnemy[`slayerClass`].some((enemyClass) => SlayerTask[`task`].includes(enemyClass))) {
          const slayerReturnObject = handleSlayerTask(thisEnemy);
          combatMessages.push(...slayerReturnObject.messagesArray);
          combatMessagesTags.push(...slayerReturnObject.tagsArray);
        }

        // send those queued up chatlogs
        handleMultipleChatLogs(combatMessages, combatMessagesTags);
      } else {
        //* otherwise, apply the damage to the target and apply the damage to the player
        setTargetLifePoints(targetLifePoints - damageToEnemy);

        // if the hit will damage the player, apply damage
        if (playerLifePoints - damageToPlayer > 0) {
          setPlayerLifePoints(playerLifePoints - damageToPlayer);
        } else {
          // prepare chatlogs death lol
          let deathMessages: string[] = [`Oh dear, you are dead!`, `You will be fully healed in 24...`];
          let deathMessagesTags: Types.ChatLogTag[] = [`Nonfilterable`, `Nonfilterable`];
          handleMultipleChatLogs(deathMessages, deathMessagesTags);

          // otherwise, the damage would kill the player, so set lifepoints to 0 and healing time to 24
          setPlayerLifePoints(0);
          setHealTimeRemaining(24);
        }
      }
    } else {
      //* if combat cannot happen, check if the player is healing
      // if the player will have completed their healing time, set that timer to zero and their lifepoints to full health
      console.log({ msg: "player is dead lols", playerLifePoints, targetLifePoints, healTimeRemaining });

      if (healTimeRemaining <= 1) {
        setHealTimeRemaining(0);
        setPlayerLifePoints(getLevel(Experience[`Constitution`]) * 100);
      } else {
        // otherwise, decrement the timer
        // prepare chatlogs death lol
        let deathMessages: string[] = [`You will be fully healed in ${healTimeRemaining - 1}...`];
        let deathMessagesTags: Types.ChatLogTag[] = [`Nonfilterable`];
        handleMultipleChatLogs(deathMessages, deathMessagesTags);

        setHealTimeRemaining(healTimeRemaining - 1);
      }
    }
  };

  //@ this will handle saving the game state to localstorage and the database
  const handleSavePoint = () => {
    // increment the checkPointTimer so we can keep track of the time between saves
    setcheckPointTimer(checkPointTimer + 1);
    if (checkPointTimer % 150 === 0) {
      //@every 5 mins, update database
      console.log(`update database`);
      let checkPointData: Types.AllState = { ...ALLSTATE };
      // save the data to the database
      console.log(checkPointData);
      saveState(checkPointData);
    }
  };

  //@ this useEffect executes the logic of what to do when the quest is complete
  useEffect(() => {
    for (let i = 0; i < AllQuestsFromState.length; i++) {
      // iterate through all the quests until we find the one that was just completed
      // if the quest in state is the same as the current AND it is completed...
      if (AllQuestsFromState[i].name === CurrentQuest && AllQuestsFromState[i].complete) {
        // set player to idle
        dispatch(setActivity(`Idle`));
        // unset current quest
        dispatch(setQuest(`none`));
        // find the quest that was just completed

        // define questRewards as the placeholder temporarily
        let questRewards = EmptyQuestRewards;
        //@ as more locations are implemented, add them here
        // based on the player's location, reassign questRewards as the actual rewards for the quest
        switch (playerLocation) {
          case `Lumbridge`:
            questRewards = LumbridgeQuests[LumbridgeQuests.findIndex((item) => item.name === CurrentQuest)];
            break;
          case `Draynor`:
            questRewards = DraynorQuests[DraynorQuests.findIndex((item) => item.name === CurrentQuest)];
            break;
        }

        //@ give item rewards
        // if Coins are rewarded, add them to the wallet
        if (questRewards.itemRewards?.Coins) {
          dispatch(addCoinsToWallet(questRewards.itemRewards.Coins));
        }

        //@ give the quest point rewards
        dispatch(addQuestPoints(questRewards.questPoints));

        // prepare chatlogs for completing a quest, and possibly for levelling up
        let questMessages: string[] = [`Congratulations, you completed ${CurrentQuest}`];
        let questMessagesTags: Types.ChatLogTag[] = [`Quest Completed`];

        //@ give the expreience rewards
        // Object.entries returns an empty array if there are no expreience rewards
        Object.entries(questRewards.experienceRewards).forEach(([skill, xp]) => {
          dispatch(gainXP({ skill, xp }));

          // check if the player gained a level
          if (didPlayerLevelUp(Experience[skill as keyof Types.ISkillList], xp)) {
            // if so queue a chatlog
            questMessages = [...questMessages, `${skill} Level up!`];
            questMessagesTags = [...questMessagesTags, `Level Up`];
          }
        });

        // send those queued up chatlogs
        handleMultipleChatLogs(questMessages, questMessagesTags);

        break;
      }
    }
  }, [questStepProgress, LumbridgeQuestArray, DraynorQuestArray]);

  //@ this useEffect sets new enemy lifepoints to state if the player chooses to do combat
  useEffect(() => {
    // IF a target is changed, set its lifepoints to component state
    // this ensures we have the correct lifepoints when the player changes targets, or starts combat for the first time
    if (Enemies[playerLocation as keyof Types.IAllEnemies] && Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations]) {
      setTargetLifePoints(Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations][`lifePoints`]);
    } else {
      // console.log({
      // loc: playerLocation,
      // enem: Enemies,
      // wow: Enemies[playerLocation as keyof Types.IAllEnemies],
      // wow2: Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations],
      // });
    }
  }, [Target]);

  //@ this useEffect sets ore rock's durability to state if the player chooses to mine
  useEffect(() => {
    // IF the current resource is a property in List of Ores, set its durability to component state
    // this ensures we have the correct durability when the player changes ores, or starts mining for the first time
    if (ListOfOres[CurrentResource as keyof Types.IListOfOres]?.durability) {
      setOreRockDurability(ListOfOres[CurrentResource as keyof Types.IListOfOres].durability);
    }
  }, [CurrentResource]);

  //@ this useEffect runs the 'game tick' logic
  useEffect(() => {
    const interval = setInterval(() => {
      console.count(`Game Ticked`);

      // console.log({ CurrentActivity, Target, CurrentSkill, CurrentResource });

      if (CurrentActivity === `In combat` && Target !== `none`) {
        handleCombatTick();
      } else if (CurrentActivity === `Skilling`) {
        switch (CurrentSkill) {
          case `Woodcutting`:
            handleWoodcuttingTick();
            break;
          case `Fishing`:
            handleFishingTick();
            break;
          case `Mining`:
            handleMiningTick();
            break;
          case `Thieving`:
            handleThievingTick();
            break;
        }
      } else if (CurrentActivity === `Questing` && CurrentQuest !== `none`) {
        handleQuestingTick();
      }
      handleSavePoint();
      //! swap for production
      //@================================================
    }, 2500);
    //@======PRODUCTION ABOVE, DEV BELOW============================================
    // }, 1000);
    //@================================================

    // console.log({ interval });
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
    stunTimeRemaining,
    playerLifePoints,
    SlayerTask,
  ]);

  return (
    <div className="d-flex shadow">
      {/* Remove this button, its for testing*/}
      {/* <div>
        <button onClick={() => handleQuestingTick()}>test quest</button>
      </div> */}
      {/* <div>
        <button onClick={() => handleSkillingTick()}>test skillTick</button>
      </div> */}
      {/* <div>
        <button onClick={() => handleCombatTick()}>test combatTick</button>
      </div> */}
      {/* <div>
        <button
          onClick={() => {
            let skillsarray = [
              `Attack`,
              `Strength`,
              `Defence`,
              `Constitution`,
              `Prayer`,
              `Summoning`,
              `Ranged`,
              `Magic`,
              `Crafting`,
              `Mining`,
              `Smithing`,
              `Fishing`,
              `Cooking`,
              `Firemaking`,
              `Woodcutting`,
              `Runecrafting`,
              `Dungeoneering`,
              `Fletching`,
              `Agility`,
              `Herblore`,
              `Thieving`,
              `Slayer`,
              `Farming`,
              `Construction`,
              `Hunter`,
              `Divination`,
              `Invention`,
              `Archaeology`,
            ];
            skillsarray.forEach((skill) => dispatch(gainXP({ skill, xp: 199999999 })));
          }}
        >
          max xp
        </button>
      </div> */}
      {/* <div>
        <button
          onClick={() => {
            dispatch(gainXP({ skill: `Strength`, xp: 199999999 }));
            dispatch(gainXP({ skill: `Attack`, xp: 199999999 }));
            dispatch(gainXP({ skill: `Defence`, xp: 199999999 }));
          }}
        >
          max atk str def
        </button>
      </div> */}
      {/* <div>
        <button onClick={() => dispatch(resetXP())}>reset skills</button>
      </div> */}
      {/* <div>
        <button onClick={() => dispatch(addCoinsToWallet(200000000))}>200M coins</button>
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
            playerLifePoints={playerLifePoints}
            targetLifePoints={targetLifePoints}
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
