const levelUpTable: number[] = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842,
  8740, 9730, 10824, 12031, 13363, 14833, 16456, 18247, 20244, 22406, 24815, 27473, 30408, 33648, 37224,
];

// levelUpTable.filter((num) => num < 1000).length; // will return level based on experience

// import {getLevel} from this
export const getLevel = (XP: number): number => {
  return levelUpTable.filter((num) => num < XP).length + 1;
};

export const percentToNextLevel = (XP: number): number => {
  let nextLevelIndex = levelUpTable.filter((num) => num < XP).length + 1;
  let xpNeeded = levelUpTable[nextLevelIndex] - levelUpTable[nextLevelIndex - 1];
  let delta = levelUpTable[nextLevelIndex] - XP;

  return Math.floor(((xpNeeded - delta) / xpNeeded) * 100) || 0;
};
