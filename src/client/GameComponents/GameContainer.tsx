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
import { addToWallet } from "../Redux/Slices/Wallet";
import { gainXP } from "../Redux/Slices/Experience";
import { addQuestPoints } from "../Redux/Slices/QuestPoints";
import { addItemToInventory, removeItemFromInventory } from "../Redux/Slices/Inventory";

// constants imports
import { LumbridgeQuests } from "../../../Constants/Quests/LumbridgeQuests";
import { DraynorQuests } from "../../../Constants/Quests/DraynorQuests";
import { EmptyQuestRewards } from "../../../Constants/Quests";

import { addLogToBank } from "../Redux/Slices/BankSlices/LogsSlice";
import { ListOfLogs, playerEarnsLog } from "../../../Constants/Items/Logs";
import { listOfHatchets } from "../../../Constants/SkillingEquipment/Hatchets";

import { addOreToBank } from "../Redux/Slices/BankSlices/OresSlice";
import { ListOfOres, resolveMining } from "../../../Constants/Items/Ores";
import { listOfPickaxes } from "../../../Constants/SkillingEquipment/Pickaxes";

import { addFishToBank } from "../Redux/Slices/BankSlices/FishSlice";
import { ListOfFish, playerEarnsFish } from "../../../Constants/Items/Fish";

import { didPlayerLevelUp, getLevel } from "../../../Constants/XP Levels";
import { Enemies, playerAttacksTarget } from "../../../Constants/Enemies";

// misc imports
import { saveState } from "../Redux/store";
import { TOKEN_KEY } from "../ClientUtils/Fetcher";

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

  //@ assign lifepoints to the player based on levels, and to the target in the usestate
  //? I might not use player Lifepoints lol
  // const [playerLifePoints, setPlayerLifePoints] = useState<number>(getLevel(Experience.Consitution) * 100);
  const [targetLifePoints, setTargetLifePoints] = useState<number>(0);

  //@ this is set when the player gains an item which will fill their inventory
  const [needsToBank, setNeedsToBank] = useState<boolean>(false);

  //@ assign the ore rock's durability to state to track progress towards receiving an ore
  const [oreRockDurability, setOreRockDurability] = useState<number>(0);

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

    // if the progress counter hits 30, reset it to 0, and then run the quest logic based on location
    //! change this to 30 for production
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
    // console.log(`Skilling Ticked`);
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
            // IF the player earned a log - apply gained xp
            dispatch(gainXP({ skill: `Woodcutting`, xp: ListOfLogs[CurrentResource as keyof Types.IListOfLogs].XPGivenWoodcutting }));
            // decide if the player gained a level
            const playerLevelled = didPlayerLevelUp(Experience.Woodcutting, ListOfLogs[CurrentResource as keyof Types.IListOfLogs].XPGivenWoodcutting);
            if (playerIsBanking) {
              // IF the player earns a log, AND the player is banking the items, we need to add the item to the inventory
              dispatch(addItemToInventory(ListOfLogs[CurrentResource as keyof Types.IListOfLogs].name));
              // console.log(playerInventory.length);
              // when the player's inventory will be full with the next item added, queue a bank run
              if (playerInventory.length === 27) {
                // console.log(`will need to bank next time`);
                setNeedsToBank(!needsToBank);
              }
              if (playerLevelled) {
                // yes level and yes banking
                handleMultipleChatLogs(
                  [`Woodcutting Level up!`, `Chopped some ${ListOfLogs[CurrentResource as keyof Types.IListOfLogs].displayName}`],
                  [`Level Up`, `Gained Resource`]
                );
              } else {
                // no level and yes banking
                handleNewChatLog(`Chopped some ${ListOfLogs[CurrentResource as keyof Types.IListOfLogs].displayName}`, `Gained Resource`);
              }
            } else {
              // the player is not banking in this block
              if (playerLevelled) {
                // yes level and no banking
                handleMultipleChatLogs(
                  [`Woodcutting Level up!`, `Chopped and dropped some ${ListOfLogs[CurrentResource as keyof Types.IListOfLogs].displayName}`],
                  [`Level Up`, `Gained Resource`]
                );
              } else {
                // no level and no banking
                handleNewChatLog(`Chopped and dropped some ${ListOfLogs[CurrentResource as keyof Types.IListOfLogs].displayName}`, `Gained Resource`);
              }
            }
          }
          break;
        }
        case `Fishing`: {
          // decide if the player caught a fish
          if (playerEarnsFish(ListOfFish[CurrentResource as keyof Types.IListOfFish], Experience.Fishing)) {
            // apply gained xp
            dispatch(gainXP({ skill: `Fishing`, xp: ListOfFish[CurrentResource as keyof Types.IListOfFish].XPGivenFishing }));
            const playerLevelled = didPlayerLevelUp(Experience.Fishing, ListOfFish[CurrentResource as keyof Types.IListOfFish].XPGivenFishing);

            // if the player catches a fish, AND the player is banking the items, we need to add the item to the inventory
            if (playerIsBanking) {
              dispatch(addItemToInventory(ListOfFish[CurrentResource as keyof Types.IListOfFish].name));

              // when the player's inventory will be full with the next item added, queue a bank run
              if (playerInventory.length === 27) {
                // console.log(`will need to bank next time`);
                // do bank stuff here
                setNeedsToBank(!needsToBank);
              }
              if (playerLevelled) {
                // yes level and yes banking
                handleMultipleChatLogs(
                  [`Fishing Level up!`, `Fished a ${ListOfFish[CurrentResource as keyof Types.IListOfFish].displayName}`],
                  [`Level Up`, `Gained Resource`]
                );
              } else {
                // no level and yes banking
                handleNewChatLog(`Fished a ${ListOfFish[CurrentResource as keyof Types.IListOfFish].displayName}`, `Gained Resource`);
              }
            } else {
              // yes level and no banking
              if (playerLevelled) {
                handleMultipleChatLogs(
                  [`Fishing Level up!`, `Fished and dropped a ${ListOfFish[CurrentResource as keyof Types.IListOfFish].displayName}`],
                  [`Level Up`, `Gained Resource`]
                );
              } else {
                // no level and no banking
                handleNewChatLog(`Fished and dropped a ${ListOfFish[CurrentResource as keyof Types.IListOfFish].displayName}`, `Gained Resource`);
              }
            }
          }
          break;
        }
        case `Mining`: {
          /**
           * The logic to handle mining is slightly different from woodcutting and fishing.  The player always gets xp, albeit a variable amount.
           * The player does damage to the ore rock, and receives an ore when the rock takes enough damage, making it similar to combat
           */

          //* call resolveMining, and store the return value.  this holds the experience and damage dealt to the rock
          let MiningResult = resolveMining(
            ListOfOres[CurrentResource as keyof Types.IListOfOres],
            listOfPickaxes[currentEquipment.Pickaxe as keyof Types.IListOfPickaxes],
            Experience.Mining,
            Experience.Strength
          );

          //* initialize chatlogs with the experience message
          let miningMessages: string[] = [`Gained ${MiningResult.experience} xp in Mining`];
          let miningMessagesTags: Types.ChatLogTag[] = [`Gained XP`];

          //* mining always yields experience, so dispatch it
          dispatch(gainXP({ skill: `Mining`, xp: MiningResult.experience }));

          //* decide if the player gained a level, and send a chatlog if so
          const playerLevelled = didPlayerLevelUp(Experience.Mining, MiningResult.experience);
          if (playerLevelled) {
            miningMessages = [...miningMessages, `Mining Level up!`];
            miningMessagesTags = [...miningMessagesTags, `Level Up`];
          }

          //* apply the damage to the ore rock
          // IF the damage would deplete the rock (or cause the durability to go negative), reset the durability and give an ore to the player
          if (oreRockDurability - MiningResult.damage <= 0) {
            // reset the durability
            setOreRockDurability(ListOfOres[CurrentResource as keyof Types.IListOfOres].durability);

            // add a message for gaining an ore
            miningMessages = [...miningMessages, `Mined some ${ListOfOres[CurrentResource as keyof Types.IListOfOres].displayName}`];
            miningMessagesTags = [...miningMessagesTags, `Gained Resource`];

            // IF the player earns an ore, AND the player is banking the items, we need to add the item to the inventory
            // IF the player is not banking, we can skip this step
            if (playerIsBanking) {
              dispatch(addItemToInventory(ListOfOres[CurrentResource as keyof Types.IListOfOres].name));
              // when the player's inventory will be full with the next item added, queue a bank run
              if (playerInventory.length === 27) {
                // console.log(`will need to bank next time`);
                setNeedsToBank(!needsToBank);
              }
            }
          } else {
            // Otherwise, just apply the damage
            setOreRockDurability(oreRockDurability - MiningResult.damage);
          }

          handleMultipleChatLogs(miningMessages, miningMessagesTags);
          break;
        }
      }
    } else {
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
    }
  };

  //@ this will run every game tick (while in combat) and holds the logic for resolving combat turns
  const handleCombatTick = () => {
    let arrayOfCombatStyleSkills = ["Attack", "Strength", "Defence", "Ranged", "Magic"];
    // console.log(`Combat Ticked`);
    // IF a target is selected, AND a combat skill is chosen, then we can proceed
    if (Target !== `none` && arrayOfCombatStyleSkills.includes(CurrentSkill)) {
      let damageDoneToTarget = playerAttacksTarget(Target, CurrentStyle, playerLocation, Experience, currentEquipment);
      // console.log(`you hit: ${damageDoneToTarget}`);

      // IF the hit would kill the target
      if (targetLifePoints - damageDoneToTarget <= 0) {
        // then reset the lifepoints
        setTargetLifePoints(Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].lifePoints);
        // and award the combat style xp
        dispatch(
          gainXP({ skill: CurrentSkill, xp: Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].XPGivenCombatStyle })
        );

        // and award the constitution xp
        dispatch(
          gainXP({ skill: `Constitution`, xp: Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].XPGivenConstitution })
        );

        // award the coins 0-half of lifepoints
        let coinDrop: number = Math.floor(
          Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].lifePoints * (Math.random() * 0.5)
        );
        dispatch(addToWallet(coinDrop));

        // prepare chatlogs for defeating an enemy, and possibly for levelling up
        let combatMessages: string[] = [
          `Defeated a ${
            Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].displayName
          } and earned ${coinDrop.toLocaleString("en-US")} coins`,
        ];
        let combatMessagesTags: Types.ChatLogTag[] = [`Monster Defeated`];

        // check if the player gained a level in their combat style
        if (
          didPlayerLevelUp(
            Experience[CurrentSkill as keyof Types.ISkillList],
            Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].XPGivenCombatStyle
          )
        ) {
          // if so, queue up a chatlog
          combatMessages = [...combatMessages, `${CurrentSkill} Level up!`];
          combatMessagesTags = [...combatMessagesTags, `Level Up`];
        }

        // check if the player gained a level in constitution
        if (
          didPlayerLevelUp(
            Experience[CurrentSkill as keyof Types.ISkillList],
            Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].XPGivenConstitution
          )
        ) {
          // if so, queue up a chatlog
          combatMessages = [...combatMessages, `Constitution Level up!`];
          combatMessagesTags = [...combatMessagesTags, `Level Up`];
        }

        // send those queued up chatlogs
        handleMultipleChatLogs(combatMessages, combatMessagesTags);
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
          dispatch(addToWallet(questRewards.itemRewards.Coins));
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
    if (Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations]?.lifePoints) {
      setTargetLifePoints(Enemies[playerLocation as keyof Types.IAllEnemies][Target as keyof Types.IEnemyLocations].lifePoints);
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
      } else if (CurrentActivity === `Skilling` && (CurrentSkill === `Woodcutting` || CurrentSkill === `Fishing` || CurrentSkill === `Mining`)) {
        handleSkillingTick();
      } else if (CurrentActivity === `Questing` && CurrentQuest !== `none`) {
        handleQuestingTick();
      }

      handleSavePoint();

      //! set this to 2500ms in production
    }, 500);

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
  ]);

  return (
    <div className="d-flex shadow">
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
