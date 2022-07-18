const levelUpTable: number[] = [
  0, 83, 174, 276, 388, 512, 650, 801, 969, 1154, 1358, 1584, 1833, 2107, 2411, 2746, 3115, 3523, 3973, 4470, 5018, 5624, 6291, 7028, 7842, 8740, 9730, 10824,
  12031, 13363, 14833, 16456, 18247, 20244, 22406, 24815, 27473, 30408, 33648, 37224, 41171, 45529, 50339, 55649, 61512, 67983, 75127, 83014, 91721, 101333,
  111945, 123660, 136594, 150872, 166636, 184040, 203254, 224466, 247886, 273742, 302288, 333804, 368599, 407015, 449428, 496254, 547953, 605032, 668051,
  737627, 814445, 899257, 992895, 1096278, 1210421, 1336443, 1475581, 1629200, 1798808, 1986068, 2192818, 2421087, 2673114, 2951373, 3258594, 3597792, 3972294,
  4385776, 4842295, 5346322, 5902831, 6517253, 7195629, 7944614, 8771558, 9684577, 10692629, 11805606, 13034431,
];

// levelUpTable.filter((num) => num < experience).length; // will return level based on experience

//! there is some rounding error here, if xp is just below a threshold, it counts it as if it passed the threshold
export const getLevel = (XP: number): number => {
  return levelUpTable.filter((threshold) => threshold < XP).length || 1; // if the xp is less than 83, return 1, since that is the lowest level
};

export const percentToNextLevel = (XP: number): number => {
  let nextLevelIndex = levelUpTable.filter((num) => num < XP).length || 1;
  let xpNeeded = levelUpTable[nextLevelIndex] - levelUpTable[nextLevelIndex - 1];
  let delta = levelUpTable[nextLevelIndex] - XP;

  // if the % is undefined due to being too low, or equals 100, return 0 instead
  if (!Math.floor(((xpNeeded - delta) / xpNeeded) * 100) || Math.floor(((xpNeeded - delta) / xpNeeded) * 100) === 100) {
    return 0;
  } else {
    // otherwise, return the %
    return Math.floor(((xpNeeded - delta) / xpNeeded) * 100);
  }
};
