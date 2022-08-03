(() => {
  let PickaxeObject = {
    name: (() => {
      try {
        return `${document.title.split(` `)[0].toLocaleLowerCase()}pickaxe`;
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),

    displayName: (() => {
      try {
        return `${document.title.split(` `)[0]} pickaxe`;
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    levelReqMining: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[1].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    penetration: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[2].children[2].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    damageMin: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[2].children[4].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    damageMax: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[2].children[5].children[1].textContent);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
    value: (() => {
      try {
        return Number(document.getElementsByTagName(`tbody`)[0].children[15].children[1].textContent.split(` `)[0]);
      } catch (error) {
        return `enterTHISmanually`;
      }
    })(),
  };

  console.log(PickaxeObject);
})();
