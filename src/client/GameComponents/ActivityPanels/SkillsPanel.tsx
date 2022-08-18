import * as Types from "../../../../Types";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { AllLocations } from "../../../../Constants/LocationInfo";
import { getLevel } from "../../../../Constants/XP Levels";

import { ListOfFish } from "../../../../Constants/Items/Fish";

import { ListOfLogs } from "../../../../Constants/Items/Logs";
import { listOfHatchets } from "../../../../Constants/SkillingEquipment/Hatchets";

import { ListOfOres } from "../../../../Constants/Items/Ores";
import { listOfPickaxes } from "../../../../Constants/SkillingEquipment/Pickaxes";

import { ListOfPickpocketNPC } from "../../../../Constants/Thieving/Pickpocketing";
import { ListOfPickpocketStalls } from "../../../../Constants/Thieving/Stalls";

import { getSlayerTask, ListOfSlayerMasters } from "../../../../Constants/Slayer/SlayerMasters";

import { setResource } from "../../Redux/Slices/CurrentResource";
import { setSkill } from "../../Redux/Slices/CurrentSkill";
import { setActivity } from "../../Redux/Slices/CurrentActivity";
import { setTarget } from "../../Redux/Slices/CurrentTarget";
import { setQuest } from "../../Redux/Slices/CurrentQuest";
import { useState } from "react";
import { setTask, skipTask } from "../../Redux/Slices/SlayerTask";
import { removeSlayerPoints } from "../../Redux/Slices/SlayerTask";
import { AllEnemiesArray } from "../../../../Constants/Enemies/AllEnemies";

const SkillsPanel = (props: Types.SkillsPanelCompProps) => {
  const dispatch = useDispatch();

  // select slices of state relevant to this component
  const { CurrentLocation } = useSelector((state: Types.AllState) => state.Location) as Types.ICurrentLocation;
  const hatchetsFromState = useSelector((state: Types.AllState) => state.Hatchets) as Types.IHatchetsSlice;
  const pickaxesFromState = useSelector((state: Types.AllState) => state.Pickaxes) as Types.IPickaxesSlice;
  const currentLocationSummary = AllLocations[CurrentLocation] as Types.ILocationSummary;
  const Experience = useSelector((state: Types.AllState) => state.Experience) as Types.ISkillList;
  const SlayerTask = useSelector((state: Types.AllState) => state.SlayerTask);

  // grab the bank slices from state
  const bank_logs = useSelector((state: Types.AllState) => state.Bank_Logs) as Types.ILogBankSlice;
  const bank_fish = useSelector((state: Types.AllState) => state.Bank_Fish) as Types.IFishBankSlice;
  const bank_ores = useSelector((state: Types.AllState) => state.Bank_Ores) as Types.IOreBankSlice;

  const arrayOfLogsFromBank: Types.IBankItem[] = Object.values(bank_logs);
  const arrayOfFishFromBank: Types.IBankItem[] = Object.values(bank_fish);
  const arrayOfOresFromBank: Types.IBankItem[] = Object.values(bank_ores);

  // define skill levels based off the players current experience
  let WoodcuttingLevel: number = getLevel(Experience.Woodcutting);
  let FiremakingLevel: number = getLevel(Experience.Firemaking);
  let FishingLevel: number = getLevel(Experience.Fishing);
  let MiningLevel: number = getLevel(Experience.Mining);
  let ThievingLevel: number = getLevel(Experience.Thieving);
  let SlayerLevel: number = getLevel(Experience.Slayer);

  // tracks each skill panel's expanded or collapsed state
  const [skillPanelsOpened, setSkillPanelsOpened] = useState({
    Woodcutting: false,
    Mining: false,
    Fishing: false,
    Thieving: false,
    Slayer: true,
    Farming: false,
    Firemaking: false,
    Hunter: false,
    Divination: false,
    Archaeology: false,
    Runecrafting: false,
    Construction: false,
    Summoning: false,
    Agility: false,
  });

  /**
   * Added as an onClick handler to toggle the display state of the SkillPanels.
   * Used to toggle the expanded or collapsed state of the SkillPanels.
   * @param panel - A string used to index the skillPanelsOpened object.
   */
  const handleToggleSkillPanel = (panel: string) => {
    let copyOfskillPanelsOpened = { ...skillPanelsOpened };
    copyOfskillPanelsOpened[panel as keyof Types.SkillPanels] = !copyOfskillPanelsOpened[panel as keyof Types.SkillPanels];
    setSkillPanelsOpened({ ...copyOfskillPanelsOpened });
  };

  /**
   *
   * @returns Returns the skill panel header JSX for consistency across panels
   */
  const panelHeaderJSX = () => {
    return (
      <div className="row justify-content-lg-center">
        <div className="col-lg-2 justify-content-lg-center">
          <button
            className="btn btn-primary"
            onClick={() => {
              props.handleUpdateDisplay(`activityDisplay`);
            }}
          >
            Back
          </button>
        </div>
        <h1 className="col-lg-10 justify-content-lg-center">Skilling in {AllLocations[CurrentLocation as keyof Types.IAllLocations].displayName}</h1>
      </div>
    );
  };

  /**
   *
   * @param resourceArray The array of resources for the Woodcutting skill at the current location.
   * @returns Returns a panel of Woodcutting option buttons.
   */
  const WoodcuttingOptions = (resourceArray: string[]) => {
    if (resourceArray.length) {
      return (
        <div role="button" onClick={() => handleToggleSkillPanel(`Woodcutting`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
          <h1 className="text-center">Woodcutting Level {WoodcuttingLevel}</h1>
          <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Woodcutting ? `` : `d-none`}`}>
            {resourceArray.map((resource) => (
              <button
                disabled={WoodcuttingLevel < ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting ? true : false}
                onClick={(e) => {
                  dispatch(setTarget(`none`));
                  dispatch(setActivity(`Skilling`));
                  dispatch(setResource(resource));
                  dispatch(setQuest(`none`));
                  dispatch(setSkill(`Woodcutting`));
                  props.setNeedsToBank(true);
                  // send a contextual message to the chat window
                  // if the last log contains the same message, don't send it
                  if (
                    `Now cutting ${ListOfLogs[resource as keyof Types.IListOfLogs].displayName}` === props.chatLogArray[props.chatLogArray.length - 1].message
                  ) {
                    return;
                  }
                  props.newChatLog(`Now cutting ${ListOfLogs[resource as keyof Types.IListOfLogs].displayName}`, `Activity Swap`);
                }}
                key={`resource-list-${resource}`}
                className={`btn border mb-3 ${
                  WoodcuttingLevel >= ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting ? `bg-success` : `bg-danger`
                }`}
              >
                <div className="card-body text">
                  <h5 className="card-title">{ListOfLogs[resource as keyof Types.IListOfLogs].displayName}</h5>
                  <div className="card-text">
                    <div>Level {ListOfLogs[resource as keyof Types.IListOfLogs].levelReqWoodcutting}</div>
                    <div>{ListOfLogs[resource as keyof Types.IListOfLogs].XPGivenWoodcutting} XP</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  /**
   *
   * @param resourceArray The array of resources for the Firemaking skill at the current location.
   * @returns Returns a panel of Firemaking option buttons.
   */
  const FiremakingOptions = () => {
    if (arrayOfLogsFromBank.length) {
      return (
        <div role="button" onClick={() => handleToggleSkillPanel(`Firemaking`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
          <h1 className="text-center">Firemaking Level {FiremakingLevel}</h1>
          <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Firemaking ? `` : `d-none`}`}>
            {arrayOfLogsFromBank.map((resource) => {
              return resource.amount ? (
                <button
                  disabled={FiremakingLevel < ListOfLogs[resource.name as keyof Types.IListOfLogs].levelReqFiremaking ? true : false}
                  onClick={(e) => {
                    dispatch(setTarget(`none`));
                    dispatch(setActivity(`Skilling`));
                    dispatch(setResource(resource.name));
                    dispatch(setQuest(`none`));
                    dispatch(setSkill(`Firemaking`));
                    props.setNeedsToBank(true);
                    // send a contextual message to the chat window
                    // if the last log contains the same message, don't send it
                    if (
                      `Now burning ${ListOfLogs[resource.name as keyof Types.IListOfLogs].displayName}` ===
                      props.chatLogArray[props.chatLogArray.length - 1].message
                    ) {
                      return;
                    }
                    props.newChatLog(`Now burning ${ListOfLogs[resource.name as keyof Types.IListOfLogs].displayName}`, `Activity Swap`);
                  }}
                  key={`resource-list-${resource.name}`}
                  className={`btn border mb-3 ${
                    FiremakingLevel >= ListOfLogs[resource.name as keyof Types.IListOfLogs].levelReqFiremaking ? `bg-success` : `bg-danger`
                  }`}
                >
                  <div className="card-body text">
                    <h5 className="card-title">{ListOfLogs[resource.name as keyof Types.IListOfLogs].displayName}</h5>
                    <div className="card-text">
                      <div>Level {ListOfLogs[resource.name as keyof Types.IListOfLogs].levelReqFiremaking}</div>
                      <div>{ListOfLogs[resource.name as keyof Types.IListOfLogs].XPGivenFiremaking} XP</div>
                      <div>Qty: {resource.amount}</div>
                    </div>
                  </div>
                </button>
              ) : (
                ""
              );
            })}
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  /**
   *
   * @param resourceArray The array of resources for the Fishing skill at the current location.
   * @returns Returns a panel of Fishing option buttons.
   */
  const FishingOptions = (resourceArray: string[]) => {
    if (resourceArray.length) {
      return (
        <div role="button" onClick={() => handleToggleSkillPanel(`Fishing`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
          <h1 className="text-center">Fishing Level {FishingLevel}</h1>
          <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Fishing ? `` : `d-none`}`}>
            {resourceArray.map((resource) => (
              <button
                disabled={FishingLevel < ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing ? true : false}
                onClick={(e) => {
                  dispatch(setTarget(`none`));
                  dispatch(setActivity(`Skilling`));
                  dispatch(setResource(resource));
                  dispatch(setQuest(`none`));
                  dispatch(setSkill(`Fishing`));
                  props.setNeedsToBank(true);
                  // send a contextual message to the chat window
                  // if the last log contains the same message, don't send it
                  if (
                    `Now fishing ${ListOfFish[resource as keyof Types.IListOfFish].displayName}` === props.chatLogArray[props.chatLogArray.length - 1].message
                  ) {
                    return;
                  }
                  props.newChatLog(`Now fishing ${ListOfFish[resource as keyof Types.IListOfFish].displayName}`, `Activity Swap`);
                }}
                key={`resource-list-${resource}`}
                className={`btn border mb-3 ${FishingLevel >= ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing ? `bg-success` : `bg-danger`}`}
              >
                <div className="card-body text">
                  <h5 className="card-title">{ListOfFish[resource as keyof Types.IListOfFish].displayName}</h5>
                  <div className="card-text">
                    <div>Level {ListOfFish[resource as keyof Types.IListOfFish].levelReqFishing}</div>
                    <div>{ListOfFish[resource as keyof Types.IListOfFish].XPGivenFishing} XP</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  /**
   * XP given is not listed becasue the XP per rock varies
   * @param resourceArray The array of resources for the Mining skill at the current location.
   * @returns Returns a panel of Mining option buttons.
   */
  const MiningOptions = (resourceArray: string[]) => {
    if (resourceArray.length) {
      return (
        <div role="button" onClick={() => handleToggleSkillPanel(`Mining`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
          <h1 className="text-center">Mining Level {MiningLevel}</h1>
          <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Mining ? `` : `d-none`}`}>
            {resourceArray.map((resource) => (
              <button
                disabled={MiningLevel < ListOfOres[resource as keyof Types.IListOfOres].levelReqMining ? true : false}
                onClick={(e) => {
                  dispatch(setTarget(`none`));
                  dispatch(setActivity(`Skilling`));
                  dispatch(setResource(resource));
                  dispatch(setQuest(`none`));
                  dispatch(setSkill(`Mining`));
                  props.setNeedsToBank(true);
                  // send a contextual message to the chat window
                  // if the last log contains the same message, don't send it
                  if (
                    `Now mining ${ListOfOres[resource as keyof Types.IListOfOres].displayName}` === props.chatLogArray[props.chatLogArray.length - 1].message
                  ) {
                    return;
                  }
                  props.newChatLog(`Now mining ${ListOfOres[resource as keyof Types.IListOfOres].displayName}`, `Activity Swap`);
                }}
                key={`resource-list-${resource}`}
                className={`btn border mb-3 ${MiningLevel >= ListOfOres[resource as keyof Types.IListOfOres].levelReqMining ? `bg-success` : `bg-danger`}`}
              >
                <div className="card-body text">
                  <h5 className="card-title">{ListOfOres[resource as keyof Types.IListOfOres].displayName}</h5>
                  <div className="card-text">
                    <div>Level {ListOfOres[resource as keyof Types.IListOfOres].levelReqMining}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  /**
   *
   * @param thievingOptions The array of resources for the Thieving skill at the current location.
   * @returns Returns a panel of Thieving option buttons, combining pickpocketing and stall options.
   */
  const ThievingOptions = (thievingOptions: Types.IThievingStallsAndPickpocketing) => {
    const pickpocketingArray = thievingOptions.pickpocketing;
    const stallsArray = thievingOptions.stalls;
    if (pickpocketingArray.length || stallsArray.length) {
      return (
        <div role="button" onClick={() => handleToggleSkillPanel(`Thieving`)} className="card-title border border-dark border-1 rounded-3 user-select-none">
          <h1 className="text-center">Thieving Level {ThievingLevel}</h1>
          <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Thieving ? `` : `d-none`}`}>
            {pickpocketingArray.map((resource) => (
              <button
                disabled={ThievingLevel < ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].levelReqThieving ? true : false}
                onClick={(e) => {
                  dispatch(setTarget(`none`));
                  dispatch(setActivity(`Skilling`));
                  dispatch(setResource(resource));
                  dispatch(setQuest(`none`));
                  dispatch(setSkill(`Thieving`));
                  props.setNeedsToBank(true);
                  // send a contextual message to the chat window
                  // if the last log contains the same message, don't send it
                  if (
                    `Now Thieving from ${ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].displayName}` ===
                    props.chatLogArray[props.chatLogArray.length - 1].message
                  ) {
                    return;
                  }
                  props.newChatLog(`Now Thieving from ${ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].displayName}`, `Activity Swap`);
                }}
                key={`resource-list-${resource}`}
                className={`btn border mb-3 ${
                  ThievingLevel >= ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].levelReqThieving ? `bg-success` : `bg-danger`
                }`}
              >
                <div className="card-body text">
                  <h5 className="card-title">{ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].displayName}</h5>
                  <div className="card-text">
                    <div>Level {ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].levelReqThieving}</div>
                    <div>{ListOfPickpocketNPC[resource as keyof Types.IListOfPickpocketNPC].XPGivenThieving} XP</div>
                  </div>
                </div>
              </button>
            ))}
            {stallsArray.map((resource) => (
              <button
                disabled={ThievingLevel < ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].levelReqThieving ? true : false}
                onClick={(e) => {
                  dispatch(setTarget(`none`));
                  dispatch(setActivity(`Skilling`));
                  dispatch(setResource(resource));
                  dispatch(setQuest(`none`));
                  dispatch(setSkill(`Thieving`));
                  // send a contextual message to the chat window
                  // if the last log contains the same message, don't send it
                  if (
                    `Now Thieving from ${ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].displayName}` ===
                    props.chatLogArray[props.chatLogArray.length - 1].message
                  ) {
                    return;
                  }
                  props.newChatLog(`Now Thieving from ${ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].displayName}`, `Activity Swap`);
                }}
                key={`resource-list-${resource}`}
                className={`btn border mb-3 ${
                  ThievingLevel >= ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].levelReqThieving ? `bg-success` : `bg-danger`
                }`}
              >
                <div className="card-body text">
                  <h5 className="card-title">{ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].displayName}</h5>
                  <div className="card-text">
                    <div>Level {ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].levelReqThieving}</div>
                    <div>{ListOfPickpocketStalls[resource as keyof Types.IListOfPickpocketStall].XPGivenThieving} XP</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      );
    } else {
      return;
    }
  };

  /**
   *
   * @returns Returns JSX with buttons allowing the player to get a new slayer task, or to skip their task at the cost of slayer points
   */
  const SlayerOptions = () => {
    // choose the slayer master at the present location (if any)
    const [masterHere] = ListOfSlayerMasters.filter((master) => master.location === CurrentLocation);

    /**
     * This function gets a slayer task from the master at the present location, and sets those values to state.
     * The button this function is tied to is disabled when the player's task amount if greater than 0, which should be an acceptable check.
     * Just in case, the function itself checks other criteria to see if the player has a task.
     * It could've been done inline on the click event, but defining it here and calling it inline looks cleaner.
     */
    const assignSlayerTask = () => {
      // if the player currently does not have a task, then they may receive a new one
      console.log(`clicked assign task button`);
      console.log({ amount: SlayerTask.amount, task: SlayerTask.task[0], master: SlayerTask.taskMaster });
      if (SlayerTask.amount === 0 && SlayerTask.task[0] === `none` && SlayerTask.taskMaster === ``) {
        let taskObject = getSlayerTask(masterHere, SlayerLevel, Experience);
        dispatch(setTask({ task: taskObject.task, taskMaster: masterHere.name, amount: taskObject.amount }));
        //@ send a chat log
        console.log(`inside the if block - task should be next`);
        console.log({ taskObject });
      }
    };

    /**
     * This function removes the current slayer task, deducts the slayerPoint cost from the SlayerTask slice.
     * Then it calls the assignSlayerTask, which gives a new task.
     * It could've been done inline on the click event, but defining it here and calling it inline looks cleaner.
     */
    const cancelTaskAndReroll = () => {
      // check if the player has enough slayer points to cancel the task
      if (SlayerTask.slayerPoints >= 30) {
        // if so, deduce the slayer points
        dispatch(removeSlayerPoints(30));
        // cancel the current task
        dispatch(skipTask());
        // and get a new one
        assignSlayerTask();
      }
      // otherwise, do nothing (this outcome should be prevented by the button being disabled)
    };

    // if there is a master at the present location, then return JSX
    // disable the `New Task` button if the player already has a task
    // disable the `Skip Task` button if the player does not have a task
    if (masterHere) {
      return (
        <div className="card-title border border-dark border-1 rounded-3 user-select-none">
          <h1 className="text-center">Slayer Level {SlayerLevel}</h1>
          <div className={`d-flex flex-row flex-wrap ${skillPanelsOpened.Slayer ? `` : `d-none`}`}>
            <div className="card-body text">
              {SlayerTask.amount > 0 && (
                <div>
                  <h5 className="card-title text-center">
                    {masterHere.displayName} has assigned you {SlayerTask.amount} {SlayerTask.task}
                  </h5>
                  <h6 className="card-body text-center">Slayer Points: {SlayerTask.slayerPoints}</h6>
                </div>
              )}
              {!SlayerTask.amount && <h5 className="card-title text-center">{masterHere.displayName}</h5>}

              <div className="card-text d-flex flex-row justify-content-center">
                <button onClick={() => assignSlayerTask()} className="btn btn-primary mx-1" disabled={SlayerTask.amount > 0 ? true : false}>
                  New Task
                </button>
                <button
                  onClick={() => cancelTaskAndReroll()}
                  className="btn btn-primary mx-1"
                  disabled={SlayerTask.amount && SlayerTask.slayerPoints >= 30 ? false : true}
                >
                  Skip Task (30 Slayer Points)
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // otherwise, there is no slayer master, so return nothing
      return;
    }
  };

  /**
   * Combines hatchet info from state with info from constants to populate a selector tag.
   * Sends a chatlog message when a hatchet is equipped.
   * @returns Returns JSX for a selector tag populated with hatchet options.
   */
  const displayHatchetSelectorTag = () => {
    // define an empty array where composite hatchets will be pushed to
    let compositeHatchets: Types.ICompositeHatchet[] = [];

    // create an array of hatchets from constants
    let hatchetsFromConstants: Types.IHatchet[] = Object.values(listOfHatchets);

    for (let i = 0; i < hatchetsFromConstants.length; i++) {
      // create an array of composite hatchets by adding the playerOwnsThisItem property to object from constants for each hatchet from constants

      let playerOwnsThisItem: boolean = hatchetsFromState[`playerOwns${hatchetsFromConstants[i].name}` as keyof Types.IHatchetsSlice];
      let tempHatchet: Types.ICompositeHatchet = { ...hatchetsFromConstants[i], playerOwnsThisItem };
      // compose items from constants and state
      compositeHatchets.push(tempHatchet);
    }

    //@ remove crystal hatchet until implemented
    let compositeHatchetsNoCrystal = compositeHatchets.filter((hatchet) => hatchet.name !== "crystalhatchet");

    const itemHasBeenEquipped = (e: React.ChangeEvent<HTMLSelectElement>) => {
      /**
       * this can be better described by stating the possible options of each slot in Types.ICurrentEquipment
       */
      let newlyEquippedItemDisplayName: string = ``;
      let oldEquippedItemDisplayName: string = ``;

      // go thru all the composite items so we can set the context of the old and new items
      for (let i = 0; i < compositeHatchetsNoCrystal.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositeHatchetsNoCrystal[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositeHatchetsNoCrystal[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositeHatchetsNoCrystal[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositeHatchetsNoCrystal[i].displayName;
        }
      }

      // a hatchet is always equipped, so we only need the swap message
      if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value !== `none`) {
        props.newChatLog(`Swapped to ${newlyEquippedItemDisplayName}`, `Equipment Swap`);
      }

      props.setCurrentEquipment({ ...props.currentEquipment, [e.target.name as keyof Types.ICurrentEquipment]: e.target.value });
    };

    // returns a string representing the item display name and the level required to wield the item
    const displayOption = (Item: Types.ICompositeHatchet) => {
      if (Item.levelReqWoodcutting >= 0) {
        return `${Item.displayName} (Woodcutting Lv: ${Item.levelReqWoodcutting})`;
      } else {
        return `${Item.displayName} (Woodcutting Lv: 0)`;
      }
    };

    return (
      <select className="form-select" onChange={(e) => itemHasBeenEquipped(e)} name={`Hatchet`}>
        {compositeHatchetsNoCrystal.map((Hatchet) => (
          <option
            value={Hatchet.name}
            key={`Slot-Item-${Hatchet.name}`}
            className={`${handleSelectorStyle(Hatchet)}`}
            disabled={applyDisabledAttribute(Hatchet)}
            selected={Hatchet.name === props.currentEquipment.Hatchet ? true : false}
          >
            {displayOption(Hatchet)}
          </option>
        ))}
      </select>
    );
  };

  /**
   * Combines pickaxe info from state with info from constants to populate a selector tag.
   * Sends a chatlog message when a pickaxe is equipped.
   * @returns Returns JSX for a selector tag populated with pickaxe options.
   */
  const displayPickaxeSelectorTag = () => {
    // define an empty array where composite pickaxes will be pushed to
    let compositePickaxes: Types.ICompositePickaxe[] = [];

    // create an array of Pickaxes from constants
    let pickaxesFromConstants: Types.IPickaxe[] = Object.values(listOfPickaxes);

    for (let i = 0; i < pickaxesFromConstants.length; i++) {
      // create an array of composite Pickaxes by adding the playerOwnsThisItem property to object from constants for each Pickaxe from constants

      let playerOwnsThisItem: boolean = pickaxesFromState[`playerOwns${pickaxesFromConstants[i].name}` as keyof Types.IPickaxesSlice];
      let tempPickaxe: Types.ICompositePickaxe = { ...pickaxesFromConstants[i], playerOwnsThisItem };
      // compose items from constants and state
      compositePickaxes.push(tempPickaxe);
    }

    //@ remove crystal pickaxe until implemented
    let compositePickaxesNoCrystal = compositePickaxes.filter((hatchet) => hatchet.name !== "crystalpickaxe");

    const itemHasBeenEquipped = (e: React.ChangeEvent<HTMLSelectElement>) => {
      /**
       * this can be better described by stating the possible options of each slot in Types.ICurrentEquipment
       */
      let newlyEquippedItemDisplayName: string = ``;
      let oldEquippedItemDisplayName: string = ``;

      // go thru all the composite items so we can set the context of the old and new items
      for (let i = 0; i < compositePickaxesNoCrystal.length; i++) {
        // if we match the .name to the newly equipped item, set the display name
        if (compositePickaxesNoCrystal[i].name === e.target.value) {
          newlyEquippedItemDisplayName = compositePickaxesNoCrystal[i].displayName;
        }

        // if we match the .name to the old equipped item, set the display name
        if (compositePickaxesNoCrystal[i].name === props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment]) {
          oldEquippedItemDisplayName = compositePickaxesNoCrystal[i].displayName;
        }
      }

      // a hatchet is always equipped, so we only need the swap message
      if (props.currentEquipment[e.target.name as keyof Types.ICurrentEquipment] !== `none` && e.target.value !== `none`) {
        props.newChatLog(`Swapped to ${newlyEquippedItemDisplayName}`, `Equipment Swap`);
      }

      props.setCurrentEquipment({ ...props.currentEquipment, [e.target.name as keyof Types.ICurrentEquipment]: e.target.value });
    };

    // returns a string representing the item display name and the level required to wield the item
    const displayOption = (Item: Types.ICompositePickaxe) => {
      if (Item.levelReqMining >= 0) {
        return `${Item.displayName} (Mining Lv: ${Item.levelReqMining})`;
      } else {
        return `${Item.displayName} (Mining Lv: 0)`;
      }
    };

    return (
      <select className="form-select" onChange={(e) => itemHasBeenEquipped(e)} name={`Pickaxe`}>
        {compositePickaxesNoCrystal.map((Pickaxe) => (
          <option
            value={Pickaxe.name}
            key={`Slot-Item-${Pickaxe.name}`}
            className={`${handleSelectorStyle(Pickaxe)}`}
            disabled={applyDisabledAttribute(Pickaxe)}
            selected={Pickaxe.name === props.currentEquipment.Pickaxe ? true : false}
          >
            {displayOption(Pickaxe)}
          </option>
        ))}
      </select>
    );
  };

  /**
   * Styles the option tag conditionally based on: if the player can wield the given item, and if the item is owned by the player.
   * @param item The hatchet or pickaxe item whose option tag is to be styled.
   * @returns Returns a string to be used as a className.
   */
  const handleSelectorStyle = (item: Types.ICompositeHatchet | Types.ICompositePickaxe) => {
    // use type guarding to decide which item is being styled

    const playerOwnsItem = item.playerOwnsThisItem;

    let canWear = false;

    if (`levelReqWoodcutting` in item) {
      canWear = getLevel(Experience.Woodcutting) >= item.levelReqWoodcutting;
    } else if (`levelReqMining` in item) {
      canWear = getLevel(Experience.Mining) >= item.levelReqMining;
    }

    // check if the player owns the item, and has the appropriate level
    if (playerOwnsItem && canWear) {
      // has levels and owns item = green background

      return `bg-success`;
    } else if (!playerOwnsItem && canWear) {
      // missing levels and owns item = yellow background

      return `bg-yellowlol`;
    } else if (playerOwnsItem && !canWear) {
      // has levels and does not own item = orange background

      return `bg-orangelol`;
    } else {
      // missing levels and does not own item = red background
      return `bg-danger`;
    }
  };

  /**
   * Used to check if the player can wield the hatchet or pickaxe based on the appropriate level.
   * @param item The hatchet or pickaxe represented by the option tag.
   * @returns Returns a boolean indicating whether the player has the appropriate level to use the tool.
   */
  const applyDisabledAttribute = (item: Types.ICompositeHatchet | Types.ICompositePickaxe) => {
    // set canWear to false,
    let canWear = false;
    // type guard to ensure we are checking the correct attribute
    if (`levelReqWoodcutting` in item) {
      canWear = getLevel(Experience.Woodcutting) >= item.levelReqWoodcutting;
    } else if (`levelReqMining` in item) {
      canWear = getLevel(Experience.Mining) >= item.levelReqMining;
    }

    if (!item.playerOwnsThisItem || !canWear) {
      // if the player does not own the item, or if the player does not meet the level req, return true to disable the item
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="container card border border-dark border-2 rounded-3" style={{ overflowY: "auto", position: "relative", height: "81%" }}>
      {panelHeaderJSX()}
      <div className="row justify-content-lg-center">
        <div className="card">
          Hatchet: {displayHatchetSelectorTag()}
          Pickaxe: {displayPickaxeSelectorTag()}
          <div className="card-body">
            {/* panel specific content goes here */}
            {WoodcuttingOptions(currentLocationSummary.Skills.Woodcutting)}
            {FiremakingOptions()}
            {FishingOptions(currentLocationSummary.Skills.Fishing)}
            {MiningOptions(currentLocationSummary.Skills.Mining)}
            {ThievingOptions(currentLocationSummary.Skills.Thieving)}
            {SlayerOptions()}
            {/* end of panel specific content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsPanel;
