import * as Types from "../../Types";
import { AllEnemiesArray } from "../Enemies/AllEnemies";
import { getLevel } from "../XP Levels";

//@ when adding new masters, make sure to add enemies that match each taskList task

export const slayermasterjacquelyn: Types.ISlayerMasterSummary = {
  name: `slayermasterjacquelyn`,
  displayName: `Jacquelyn Manslaughter`,
  location: `Lumbridge`,
  levelReqCombat: 0,
  levelReqSlayer: 0,
  smokingKills: {
    complete: {
      taskPoints: 1,
      task10: 5,
      task50: 15,
    },
    incomplete: {
      taskPoints: 1,
      task10: 2,
      task50: 7,
    },
  },
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

export const slayermastervannaka: Types.ISlayerMasterSummary = {
  name: `slayermastervannaka`,
  displayName: `Vannaka`,
  location: `Edgeville`,
  levelReqCombat: 30,
  levelReqSlayer: 0,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermastermazchna: Types.ISlayerMasterSummary = {
  name: `slayermastermazchna`,
  displayName: `Mazchna`,
  location: `Canifis`,
  levelReqCombat: 50,
  levelReqSlayer: 0,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermasterchaeldar: Types.ISlayerMasterSummary = {
  name: `slayermasterchaeldar`,
  displayName: `Chaeldar`,
  location: `Zanaris`,
  levelReqCombat: 75,
  levelReqSlayer: 0,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermastersumona: Types.ISlayerMasterSummary = {
  name: `slayermastersumona`,
  displayName: `Sumona`,
  location: `Pollnivneach`,
  levelReqCombat: 90,
  levelReqSlayer: 35,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermasterduradel: Types.ISlayerMasterSummary = {
  name: `slayermasterduradel`,
  displayName: `Duradel`,
  location: `ShiloVillage`,
  levelReqCombat: 100,
  levelReqSlayer: 50,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermasterkuradal: Types.ISlayerMasterSummary = {
  name: `slayermasterkuradal`,
  displayName: `Kuradal`,
  location: `AncientCavern`,
  levelReqCombat: 110,
  levelReqSlayer: 75,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermastermorvran: Types.ISlayerMasterSummary = {
  name: `slayermastermorvran`,
  displayName: `Morvran`,
  location: `Prifddinas`,
  levelReqCombat: 120,
  levelReqSlayer: 85,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermasterlaniakea: Types.ISlayerMasterSummary = {
  name: `slayermasterlaniakea`,
  displayName: `Laniakea`,
  location: `AnachroniaBaseCamp`,
  levelReqCombat: 120,
  levelReqSlayer: 90,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const slayermastermandrith: Types.ISlayerMasterSummary = {
  name: `slayermastermandrith`,
  displayName: `Mandrith`,
  location: `Wilderness`,
  levelReqCombat: 120,
  levelReqSlayer: 95,
  smokingKills: {
    complete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
    incomplete: {
      taskPoints: 0,
      task10: 0,
      task50: 0,
    },
  },
  taskList: [],
};

export const ListOfSlayerMasters: Types.ISlayerMasterSummary[] = [
  slayermasterjacquelyn,
  slayermastervannaka,
  slayermastermazchna,
  slayermasterchaeldar,
  slayermastersumona,
  slayermasterduradel,
  slayermasterkuradal,
  slayermastermorvran,
  slayermasterlaniakea,
  slayermastermandrith,
];

interface ITaskObj {
  task: string[];
  amount: number;
}
/**
 *
 * @param slayerMaster The SlayerMasterSummary for the given slayerMaster.
 * @param slayerXp The player's experience in slayer.
 * @returns Returns an object containing the task and an amount, or calls itself if the first randomly chosen task was invalid.
 */
export const getSlayerTask = (slayerMaster: Types.ISlayerMasterSummary, slayerXp: number, Experience: Types.ISkillList): ITaskObj => {
  // translate the player's slayer experience to a level
  const slayerLevel = getLevel(slayerXp);

  // define the return object
  let taskObj = {
    task: [`none`],
    amount: 0,
  };

  //* randomly choose a slayer class from the slayer master's task list
  let FullTaskIndex = Math.floor(Math.random() * slayerMaster.taskList.length);
  let FullTaskEntry = slayerMaster.taskList[FullTaskIndex];

  //* decide if the player has the appropriate slayer level for the chosen class
  // validEnemies is a subset of all enemies where the player's slayer level is sufficient AND matches the selected slayer class
  const validEnemies = AllEnemiesArray.filter((enemy) => {
    // only choose enemies who match the assigned slayer class
    let classOK = enemy.slayerClass.includes(FullTaskEntry.task);

    // only choose enemies whose slayer level req is less than or equal to the player's level
    let levelOK = enemy.levelReqSlayer <= slayerLevel;

    // only choose enemies who have a combat level near the player's combat level
    // IF the player has a low combat level, set this to false
    let combatLevelOK = true;

    let att: number = getLevel(Experience.Attack);
    let str: number = getLevel(Experience.Strength);
    let mag: number = getLevel(Experience.Magic);
    let rng: number = getLevel(Experience.Ranged);
    let def: number = getLevel(Experience.Defence);
    let con: number = getLevel(Experience.Constitution);
    let pray: number = getLevel(Experience.Prayer);
    let summ: number = getLevel(Experience.Summoning);

    // define the player's combat level
    const combatLevel = Math.floor(((13 / 10) * Math.max(att + str, 2 * mag, 2 * rng) + def + con + Math.floor(0.5 * pray) + Math.floor(0.5 * summ)) / 4);

    // if the player has a low combat level, AND the chosen enemy has a higher combat level, then set combatLevelOK = false to choose a new task
    // this helps lower level players receive a more appropriate task for their combat level
    if (combatLevel < 20 && combatLevel < enemy.level) {
      combatLevelOK = false;
    }

    return levelOK && classOK && combatLevelOK;
  });

  //* if no enemies were found who match the class and have a slayer level req the player has satisfied, call this function again
  // if we don't find any enemies the player has a slayer level for, choose a new task by calling THIS function recursively
  if (!validEnemies.length) {
    // console.log({ msg: `slayer task had to reroll`, target: FullTaskEntry, slayerLevel });
    return getSlayerTask(slayerMaster, slayerXp, Experience);
  }

  //* otherwise, we did find an acceptable subset of slayer tasks, so choose one and assign it
  // assign the task
  taskObj.task[0] = FullTaskEntry.task;

  // assign a random amount within the min and max range defined for each entry
  //@ multiply by 10 to allow for longer idle times
  taskObj.amount = Math.floor(Math.random() * (FullTaskEntry.max - FullTaskEntry.min) + FullTaskEntry.min) * 10;
  return taskObj;
};
