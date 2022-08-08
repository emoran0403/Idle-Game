import * as Types from "../../Types";
import { AllEnemiesArray } from "../Enemies/AllEnemies";
import { getLevel } from "../XP Levels";

//! when adding new masters, make sure to add enemies that match taskList[i].task

const slayermasterjacquelyn: Types.ISlayerMasterSummary = {
  name: `slayermasterjacquelyn`,
  displayName: `Jacquelyn Manslaughter`,
  location: `Lumbridge`,
  levelReqCombat: 0,
  levelReqSlayer: 0,
  taskList: [
    { task: `bats`, min: 15, max: 30 },
    { task: `birds`, min: 15, max: 30 },
    { task: `cavebugs`, min: 15, max: 30 },
    { task: `caveslimes`, min: 15, max: 30 },
    { task: `cows`, min: 15, max: 30 },
    { task: `frogs`, min: 15, max: 30 },
    { task: `ghosts`, min: 15, max: 30 },
    { task: `goblins`, min: 15, max: 30 },
    { task: `rats`, min: 15, max: 30 },
    { task: `skeletons`, min: 15, max: 30 },
    { task: `spiders`, min: 15, max: 30 },
    { task: `zombies`, min: 15, max: 30 },
  ],
};

const slayermastervannaka: Types.ISlayerMasterSummary = {
  name: `slayermastervannaka`,
  displayName: `Vannaka`,
  location: `Edgeville`,
  levelReqCombat: 30,
  levelReqSlayer: 0,
  taskList: [],
};

const slayermastermazchna: Types.ISlayerMasterSummary = {
  name: `slayermastermazchna`,
  displayName: `Mazchna`,
  location: `Canifis`,
  levelReqCombat: 50,
  levelReqSlayer: 0,
  taskList: [],
};

const slayermasterchaeldar: Types.ISlayerMasterSummary = {
  name: `slayermasterchaeldar`,
  displayName: `Chaeldar`,
  location: `Zanaris`,
  levelReqCombat: 75,
  levelReqSlayer: 0,
  taskList: [],
};

const slayermastersumona: Types.ISlayerMasterSummary = {
  name: `slayermastersumona`,
  displayName: `Sumona`,
  location: `Pollnivneach`,
  levelReqCombat: 90,
  levelReqSlayer: 35,
  taskList: [],
};

const slayermasterduradel: Types.ISlayerMasterSummary = {
  name: `slayermasterduradel`,
  displayName: `Duradel`,
  location: `ShiloVillage`,
  levelReqCombat: 100,
  levelReqSlayer: 50,
  taskList: [],
};

const slayermasterkuradal: Types.ISlayerMasterSummary = {
  name: `slayermasterkuradal`,
  displayName: `Kuradal`,
  location: `AncientCavern`,
  levelReqCombat: 110,
  levelReqSlayer: 75,
  taskList: [],
};

const slayermastermorvran: Types.ISlayerMasterSummary = {
  name: `slayermastermorvran`,
  displayName: `Morvran`,
  location: `Prifddinas`,
  levelReqCombat: 120,
  levelReqSlayer: 85,
  taskList: [],
};

const slayermasterlaniakea: Types.ISlayerMasterSummary = {
  name: `slayermasterlaniakea`,
  displayName: `Laniakea`,
  location: `AnachroniaBaseCamp`,
  levelReqCombat: 120,
  levelReqSlayer: 90,
  taskList: [],
};

const slayermastermandrith: Types.ISlayerMasterSummary = {
  name: `slayermastermandrith`,
  displayName: `Mandrith`,
  location: `Wilderness`,
  levelReqCombat: 120,
  levelReqSlayer: 95,
  taskList: [],
};

export const getSlayerTask = (slayerMaster: Types.ISlayerMasterSummary, slayerXp: number) => {
  const slayerLevel = getLevel(slayerXp);
  let taskObj = {
    task: ``,
    amount: 0,
  };

  // randomly choose a task from the slayer master's task list
  let FullTaskIndex = Math.floor(Math.random() * slayerMaster.taskList.length);
  let FullTaskEntry = slayerMaster.taskList[FullTaskIndex];

  // validEnemies is a subset of the chosen task where the player's slayer level is sufficient
  const validEnemies = AllEnemiesArray.filter((enemy) => {
    // show enemies whose slayer level req is less than the player's level
    let levelOK = enemy.levelReqSlayer <= slayerLevel;

    // only choose enemies who match the assigned slayer class
    let classOK = enemy.slayerClass.includes(FullTaskEntry.task);

    return levelOK && classOK;
  });

  // if we don't find any enemies the player has a slayer level for, choose a new task by calling THIS function recursively
  if (!validEnemies.length) {
    console.log({ msg: `slayer task had to reroll`, target: FullTaskEntry, slayerLevel });
    return getSlayerTask(slayerMaster, slayerXp);
  }

  // otherwise, we did find an acceptable subset of slayer tasks
  let SubsetTaskIndex = Math.floor(Math.random() * validEnemies.length);
  let SubsetTaskEntry = validEnemies[SubsetTaskIndex];

  // assign the task
  taskObj.task = SubsetTaskEntry.name;

  // assign a random amount within the min and max range defined for each entry
  taskObj.amount = Math.floor(Math.random() * (FullTaskEntry.max - FullTaskEntry.min) + FullTaskEntry.min);
  return taskObj;
};
