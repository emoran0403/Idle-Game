(() => {
  let OreObject = {
    name: (() => {
      try {
        return `${document.title.split(` `)[0].toLocaleLowerCase()}`;
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),

    displayName: (() => {
      try {
        return `${document.title.split(` `)[0]} ore`;
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    levelReqMining: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[1].children[2].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    durability: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[1].children[9].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    hardness: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[1].children[10].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    xpMultiplier: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[1].children[11].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    value: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[13].children[1].textContent.split(` `)[0]);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
  };

  console.log(OreObject);
})();
