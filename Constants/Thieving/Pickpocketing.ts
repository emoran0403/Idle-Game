import * as Types from "../../Types";

export const pickpocketman: Types.IPickpocketNPC = {
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

export const pickpocketfarmer: Types.IPickpocketNPC = {
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

export const pickpockethamfemale: Types.IPickpocketNPC = {
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

export const pickpockethammale: Types.IPickpocketNPC = {
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

export const pickpocketwarriorwoman: Types.IPickpocketNPC = {
  name: "pickpocketwarriorwoman",
  displayName: "Warrior woman",
  levelReqThieving: 25,
  XPGivenThieving: 26,
  doubleloot: {
    levelReqThieving: 35,
    levelReqAgility: 25,
  },
  tripleloot: {
    levelReqThieving: 45,
    levelReqAgility: 35,
  },
  quadloot: {
    levelReqThieving: 55,
    levelReqAgility: 45,
  },
  loot: {
    Coins: 18,
    Items: [],
  },
};

export const pickpocketalkharidwarrior: Types.IPickpocketNPC = {
  name: "pickpocketalkharidwarrior",
  displayName: "Al Kharid warrior",
  levelReqThieving: 25,
  XPGivenThieving: 26,
  doubleloot: {
    levelReqThieving: 35,
    levelReqAgility: 25,
  },
  tripleloot: {
    levelReqThieving: 45,
    levelReqAgility: 35,
  },
  quadloot: {
    levelReqThieving: 55,
    levelReqAgility: 45,
  },
  loot: {
    Coins: 18,
    Items: [],
  },
};

export const pickpocketcavegoblin: Types.IPickpocketNPC = {
  name: "pickpocketcavegoblin",
  displayName: "Cave goblin",
  levelReqThieving: 36,
  XPGivenThieving: 40,
  doubleloot: {
    levelReqThieving: 46,
    levelReqAgility: 36,
  },
  tripleloot: {
    levelReqThieving: 56,
    levelReqAgility: 46,
  },
  quadloot: {
    levelReqThieving: 66,
    levelReqAgility: 56,
  },
  loot: {
    Coins: 30,
    Items: [],
  },
};

export const pickpocketmasterfarmer: Types.IPickpocketNPC = {
  name: "pickpocketmasterfarmer",
  displayName: "Master Farmer",
  levelReqThieving: 38,
  XPGivenThieving: 43,
  doubleloot: {
    levelReqThieving: 48,
    levelReqAgility: 38,
  },
  tripleloot: {
    levelReqThieving: 58,
    levelReqAgility: 48,
  },
  quadloot: {
    levelReqThieving: 68,
    levelReqAgility: 58,
  },
  loot: {
    Coins: 0,
    Items: [],
  },
};

export const pickpocketguard: Types.IPickpocketNPC = {
  name: "pickpocketguard",
  displayName: "Guard",
  levelReqThieving: 40,
  XPGivenThieving: 46.8,
  doubleloot: {
    levelReqThieving: 50,
    levelReqAgility: 40,
  },
  tripleloot: {
    levelReqThieving: 60,
    levelReqAgility: 50,
  },
  quadloot: {
    levelReqThieving: 70,
    levelReqAgility: 60,
  },
  loot: {
    Coins: 32,
    Items: [],
  },
};

export const pickpocketfremennikcitizen: Types.IPickpocketNPC = {
  name: "pickpocketfremennikcitizen",
  displayName: "Fremennik citizen",
  levelReqThieving: 45,
  XPGivenThieving: 65,
  doubleloot: {
    levelReqThieving: 55,
    levelReqAgility: 45,
  },
  tripleloot: {
    levelReqThieving: 65,
    levelReqAgility: 55,
  },
  quadloot: {
    levelReqThieving: 75,
    levelReqAgility: 65,
  },
  loot: {
    Coins: 40,
    Items: [],
  },
};

export const pickpocketardougneknight: Types.IPickpocketNPC = {
  name: "pickpocketardougneknight",
  displayName: "Knight of Ardougne",
  levelReqThieving: 55,
  XPGivenThieving: 84.3,
  doubleloot: {
    levelReqThieving: 65,
    levelReqAgility: 55,
  },
  tripleloot: {
    levelReqThieving: 75,
    levelReqAgility: 65,
  },
  quadloot: {
    levelReqThieving: 85,
    levelReqAgility: 75,
  },
  loot: {
    Coins: 50,
    Items: [],
  },
};

export const pickpocketmenaphitethug: Types.IPickpocketNPC = {
  name: "pickpocketmenaphitethug",
  displayName: "Menaphite Thug",
  levelReqThieving: 65,
  XPGivenThieving: 137.5,
  doubleloot: {
    levelReqThieving: 75,
    levelReqAgility: 65,
  },
  tripleloot: {
    levelReqThieving: 85,
    levelReqAgility: 75,
  },
  quadloot: {
    levelReqThieving: 95,
    levelReqAgility: 85,
  },
  loot: {
    Coins: 60,
    Items: [],
  },
};

export const pickpocketwatchman: Types.IPickpocketNPC = {
  name: "pickpocketwatchman",
  displayName: "Yanille Watchman",
  levelReqThieving: 65,
  XPGivenThieving: 137.5,
  doubleloot: {
    levelReqThieving: 75,
    levelReqAgility: 65,
  },
  tripleloot: {
    levelReqThieving: 85,
    levelReqAgility: 75,
  },
  quadloot: {
    levelReqThieving: 95,
    levelReqAgility: 85,
  },
  loot: {
    Coins: 60,
    Items: [],
  },
};

export const pickpocketpaladin: Types.IPickpocketNPC = {
  name: "pickpocketpaladin",
  displayName: "Paladin",
  levelReqThieving: 70,
  XPGivenThieving: 151.8,
  doubleloot: {
    levelReqThieving: 80,
    levelReqAgility: 70,
  },
  tripleloot: {
    levelReqThieving: 90,
    levelReqAgility: 80,
  },
  quadloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  loot: {
    Coins: 80,
    Items: [],
  },
};

export const pickpocketgnome: Types.IPickpocketNPC = {
  name: "pickpocketgnome",
  displayName: "Gnome",
  levelReqThieving: 75,
  XPGivenThieving: 198.3,
  doubleloot: {
    levelReqThieving: 85,
    levelReqAgility: 75,
  },
  tripleloot: {
    levelReqThieving: 95,
    levelReqAgility: 85,
  },
  quadloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  loot: {
    Coins: 300,
    Items: [],
  },
};

export const pickpockethero: Types.IPickpocketNPC = {
  name: "pickpockethero",
  displayName: "Hero",
  levelReqThieving: 80,
  XPGivenThieving: 273.3,
  doubleloot: {
    levelReqThieving: 90,
    levelReqAgility: 80,
  },
  tripleloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  quadloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  loot: {
    Coins: 250,
    Items: [],
  },
};

export const pickpockettrader: Types.IPickpocketNPC = {
  name: "pickpockettrader",
  displayName: "Trader",
  levelReqThieving: 90,
  XPGivenThieving: 556.5,
  doubleloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  tripleloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  quadloot: {
    levelReqThieving: Infinity,
    levelReqAgility: Infinity,
  },
  loot: {
    Coins: 250,
    Items: [],
  },
};
