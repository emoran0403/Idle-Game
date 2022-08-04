import * as Types from "../../Types";

export const pickpocketman = {
  name: `pickpocketman`,
  displayName: `Man`,
  levelReqThieving: 1,
  XPGivenThieving: 8,
  doubleloot: {
    levelReqThieving: 11,
    levelReqAgility: 0,
  },
  tripleloot: { levelReqThieving: 21, levelReqAgility: 10 },
  quadloot: { levelReqThieving: 31, levelReqAgility: 21 },
  loot: {
    Coins: 3,
    Items: [],
  },
};

export const pickpocketfarmer = {
  name: `pickpocketfarmer`,
  displayName: `Farmer`,
  levelReqThieving: 10,
  XPGivenThieving: 14.5,
  doubleloot: {
    levelReqThieving: 20,
    levelReqAgility: 10,
  },
  tripleloot: { levelReqThieving: 30, levelReqAgility: 20 },
  quadloot: { levelReqThieving: 40, levelReqAgility: 30 },
  loot: {
    Coins: 9,
    Items: [],
  },
};

export const pickpockethamfemale = {
  name: `pickpockethamfemale`,
  displayName: `H.A.M Member (female)`,
  levelReqThieving: 15,
  XPGivenThieving: 18.5,
  doubleloot: {
    levelReqThieving: 25,
    levelReqAgility: 15,
  },
  tripleloot: { levelReqThieving: 35, levelReqAgility: 25 },
  quadloot: { levelReqThieving: 45, levelReqAgility: 35 },
  loot: {
    Coins: 13,
    Items: [],
  },
};

export const pickpockethammale = {
  name: `pickpockethammale`,
  displayName: `H.A.M Member (male)`,
  levelReqThieving: 20,
  XPGivenThieving: 22.2,
  doubleloot: {
    levelReqThieving: 30,
    levelReqAgility: 20,
  },
  tripleloot: { levelReqThieving: 40, levelReqAgility: 30 },
  quadloot: { levelReqThieving: 50, levelReqAgility: 40 },
  loot: {
    Coins: 13,
    Items: [],
  },
};

//! make a utility for this lol
