// use this to grab the quest steps for each quest under the quick guide:
// must be from the https://runescape.wiki/ site, not the fandom wiki
/**
 * I made this tool to be saved as a bookmark, click the bookmark to run the function, and open the console for the quest info object.
 * The item rewards will need to be entered manually, since they are variable
 */
(() => {
  const QUESTINFO = {
    name: document.title.replace("Quick guide for ", "").replace(" - The RuneScape Wiki", ""),

    stepsComplete: 0,

    stepsTotal: [...document.getElementsByClassName("lighttable checklist")]
      .map((div) => div.firstElementChild.children.length)
      .reduce((a, b) => a + b, 0),

    questPoints: [...document.getElementsByTagName("a")]
      .filter((item) => item.title === "Quest points")[0]
      .parentElement.textContent.split(" ")[0],

    complete: false,

    combatRequirements: Math.max(
      ...[...[...document.getElementsByClassName("questdetails-info")].reverse()[0].children[0].children].map((li) =>
        Number(li.innerText.replace(/[^\d+]/g, ""))
      )
    ),

    questRequirements: [
      ...document
        .getElementsByClassName("questreq ")[0]
        .children[0].children[1].firstChild.children[0].children[0].getElementsByTagName("li"),
    ].map((li) => li.children[0].innerText.trimEnd()),

    levelRequirements: (() => {
      const wow = {};

      const images = [...document.getElementById("rs-qc-form").parentElement.getElementsByTagName("img")];
      images
        .filter((el) => el.alt && el.alt !== "Quest.png")
        .map((img) => img.parentElement.parentElement.innerText.split(/[^\w+]/).filter((x) => x))
        .forEach((pair) => (wow[pair[1]] = Number(pair[0])));
      return wow;
    })(),

    experienceRewards: (() => {
      const temp = {};

      const images = [
        ...document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.getElementsByTagName("img"),
      ];
      images
        .filter((img) => img.parentElement.parentElement.innerText.toLowerCase().includes("experience"))
        .map((img) => img.parentElement.parentElement.innerText.replace(" experience", "") + img.alt)
        .forEach((pizza) => {
          const [xp, skill] = pizza.split(" ");
          temp[skill] = Number(xp.replace(",", ""));
        });
      return temp;
    })(),

    itemRewards: [
      ...document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling
        .children,
    ]
      .map((child) => child.innerText)
      .filter((string) => string.toLowerCase().includes("lamp")),
  };

  console.log(QUESTINFO);
})();

let ExampleQuestInfo = {
  name: "Fate of the Gods",
  stepsComplete: 0,
  stepsTotal: 28,
  questPoints: "2",
  complete: false,
  combatRequirements: 160,
  questRequirements: ["Missing, Presumed Death"],
  levelRequirements: {
    Summoning: 67,
    Agility: 73,
    Divination: 75,
    Slayer: 76,
    Magic: 79,
  },
  experienceRewards: {
    Magic: 125000,
    Divination: 100000,
    Slayer: 100000,
    Agility: 75000,
    Summoning: 50000,
  },
  itemRewards: [
    "A survivor's lamp, which grants 75,000  experience in a chosen combat skill (80+, excluding prayer/summoning) up to three times, by talking to Azzanadra in the Senntisten Temple near the Altar of Zaros and choosing the fourth chat option \"Zaros's return\". (requires completion of The Temple at Senntisten)",
    'A large prismatic lamp by talking to Wahisietel (Ali the Wise) in the northern most building in Nardah and choosing the third chat option "Zaros\'s return". (requires completion of Ritual of the Mahjarrat)',
  ],
};
