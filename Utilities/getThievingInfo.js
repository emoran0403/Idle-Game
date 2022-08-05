(() => {
  let tableInfoArray = [...document.getElementsByTagName(`tbody`)[1].children];
  let multiPickArray = [...document.getElementsByTagName(`tbody`)[5].children];

  for (let i = 0; i < tableInfoArray.length; i++) {
    let thievingInfo = {
      name: (() => {
        try {
          return `${tableInfoArray[i].children[0].children[0].textContent}`;
        } catch (error) {
          return `enterTHISmanually`;
        }
      })(),
      displayName: `enterTHISmanually`,
      levelReqThieving: (() => {
        try {
          return `${Number(tableInfoArray[i].children[2].textContent)}`;
        } catch (error) {
          return `enterTHISmanually`;
        }
      })(),
      XPGivenThieving: (() => {
        try {
          return `${Number(tableInfoArray[i].children[3].textContent)}`;
        } catch (error) {
          return `enterTHISmanually`;
        }
      })(),
      doubleloot: {
        levelReqThieving: 11,
        levelReqAgility: 0,
      },
      tripleloot: { levelReqThieving: 21, levelReqAgility: 10 },
      quadloot: { levelReqThieving: 31, levelReqAgility: 21 },
      loot: {
        Coins: `enterTHISmanually`,
        Items: [],
      },
    };
    try {
      for (let j = 0; j < multiPickArray.length; j++) {
        if (multiPickArray[j].children[1].children[0].textContent === tableInfoArray[i].children[0].children[0].textContent) {
          thievingInfo.doubleloot.levelReqThieving = Number(multiPickArray[j].children[3].textContent.substring(1, 3));
          thievingInfo.doubleloot.levelReqAgility = Number(multiPickArray[j].children[3].textContent.substring(5, 7));

          thievingInfo.tripleloot.levelReqThieving = Number(multiPickArray[j].children[4].textContent.substring(1, 3));
          thievingInfo.tripleloot.levelReqAgility = Number(multiPickArray[j].children[4].textContent.substring(5, 7));

          thievingInfo.quadloot.levelReqThieving = Number(multiPickArray[j].children[5].textContent.substring(1, 3));
          thievingInfo.quadloot.levelReqAgility = Number(multiPickArray[j].children[5].textContent.substring(5, 7));
        }
      }
    } catch (error) {}
    console.log(thievingInfo);
  }
})();

//@ close, but doesn't get the 2x, 3x, and 4x loot
