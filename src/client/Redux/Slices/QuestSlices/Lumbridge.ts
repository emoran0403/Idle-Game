import { createSlice } from "@reduxjs/toolkit";
import * as Types from "../../../../../Types";

//object[key] is how we can access an object's value by passing in a key

export const Quests_Lumbridge = createSlice({
  name: "Quests_Lumbridge",
  initialState: {
    //list of items in the bank, starting at 0
    // refer to state as state.QuestArray
    // with an array, i can add more quests later
    QuestArray: [
      {
        name: "Cook's Assistant",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "Myths of the White Lands",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "The Restless Ghost",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "The Blood Pact",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
      {
        name: "Buyers and Cellars",
        stepsComplete: 0,
        stepsTotal: 123456789,
        complete: false,
      },
    ],
  },
  reducers: {
    // use this when we need to increment a quest steps count
    // incrementQuestStep: (state, action) => {
    //   const questNameFromAction: string = action.type; // decide which quest needs incrementing
    //   // go through all the quests...
    //   for (let i = 1; i < state.QuestArray.length; i++) {
    //     let currentQuest = state.QuestArray[i]; // rename it for better context
    //     // ...until we find the quest name that matches the quest name from the action
    //     if (currentQuest.name === questNameFromAction) {
    //       // increment the steps counter
    //       currentQuest.stepsComplete += 1;
    //     }
    //   }
    // },

    // markQuestAsComplete: (state, action) => {
    //   const questNameFromAction: string = action.type; // decide which quest needs to be marked as complete
    //   // go through all the quests...
    //   for (let i = 1; i < state.QuestArray.length; i++) {
    //     let currentQuest = state.QuestArray[i]; // rename it for better context
    //     // ...until we find the quest name that matches the quest name from the action
    //     if (currentQuest.name === questNameFromAction) {
    //       // mark the quest as complete
    //       currentQuest.complete = true;
    //     }
    //   }
    // },

    //! can i do this instead of making 2 separate reducers?
    incrementQuestStepAndCheckIfCompleted: (state, action) => {
      const questNameFromAction: string = action.type; // decide which quest needs incrementing
      // go through all the quests...
      for (let i = 1; i < state.QuestArray.length; i++) {
        let currentQuest = state.QuestArray[i]; // rename it for better context
        // ...until we find the quest name that matches the quest name from the action
        if (currentQuest.name === questNameFromAction) {
          // increment the steps counter
          currentQuest.stepsComplete += 1;
          // check if the newly incremented counter equals the total
          if (currentQuest.stepsComplete === currentQuest.stepsTotal) {
            // if they equal, set the quest as complete
            currentQuest.complete = true;
          }
        }
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { incrementQuestStepAndCheckIfCompleted } = Quests_Lumbridge.actions;

export default Quests_Lumbridge.reducer;

//! what is a good way to store the level requirements and previous quest requirements for a given quest?
const bigQuestyBoyFullOfInfo = {
  name: "Cook's Assistant",
  stepsComplete: 0,
  stepsTotal: 123456789,
  questPoints: 123456789,
  complete: false,
  combatRequirements: 0,
  questRequirements: ["quest1", "quest2", "quest3"],
  levelRequirements: { skill1: 1, skill2: 2, skill3: 3 },
  experienceRewards: { skill1: 1, skill2: 2, skill3: 3 },
  itemRewards: { item1: 1, item2: 2, item3: 3 },
};

// use this to grab the quest steps for each quest under the quick guide:
// must be from the https://runescape.wiki/ site, not the fandom wiki

// quest name
//@ document.title.replace('Quick guide for ', "").replace(' - The RuneScape Wiki', '')

//@ use for quest steps
// [...document.getElementsByClassName("lighttable checklist")].map(div => div.firstElementChild.children.length).reduce((a,b) => a+b,0)

//@ use this to get the quest points:
// [...document.getElementsByTagName("a")].filter(item => item.title==="Quest points")[0].parentElement.textContent.split(" ")[0]

//@ use this for the combatRequirements
// [...document.getElementsByClassName("questdetails-info")].reverse()[0].children[0].children[0].textContent!=='None'

//@quest requirements
// document.getElementsByClassName('questreq ') returns the table of requirements, at [0] returns undefined if there are no requirements

//@quest names
//first check if there are any quests required before doing this step
// const pizza = new Set()
// [...document.getElementsByClassName('questreq ')[0].children[0].children[1].firstChild.children[0].children[0].getElementsByTagName('li')].map(li => li.innerText).forEach((str) =>{

//   str.split('\n').forEach(substring => pizza.add(substring))

// })

// pizza.length will give us the number of quests required

//@Skill requirements gives an array of strings containing the level and skill name
// const wow = {}
// [...document.getElementById("rs-qc-form").parentElement.getElementsByTagName("img")].filter(el => el.alt && el.alt !=="Quest.png").map(img => img.parentElement.parentElement.innerText.split(/[^\w+]/).filter(x=>x)).forEach(pair => wow[pair[1]] = pair[0])

//first set of rewards
//document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling

//create the xp reward object
// const temp = {}
// [...document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.getElementsByTagName('img')].filter(img => img.parentElement.parentElement.innerText.toLowerCase().includes('experience')).map(img => img.parentElement.parentElement.innerText.replace(' experience', '') + img.alt).forEach(pizza => {
//   const [xp, skill] = pizza.split(' ')
//       temp[skill] = Number(xp.replace(',', ''))
//       })

// second set of rewards
//document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling

// to find lamps
// [...document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children].map(child => child.innerText).filter(string => string.toLowerCase().includes('lamp'))

// (() => {

//   const QUESTINFO = {
//     name: document.title.replace("Quick guide for ", "").replace(" - The RuneScape Wiki", ""),
//     stepsComplete: 0,
//     stepsTotal: [...document.getElementsByClassName("lighttable checklist")]
//       .map((div) => div.firstElementChild.children.length)
//       .reduce((a, b) => a + b, 0),
//     questPoints: [...document.getElementsByTagName("a")]
//       .filter((item) => item.title === "Quest points")[0]
//       .parentElement.textContent.split(" ")[0],
//     complete: false,
//     combatRequirements: Math.max(
//       ...[...[...document.getElementsByClassName("questdetails-info")].reverse()[0].children[0].children].map((li) =>
//         Number(li.innerText.replace(/[^\d+]/g, ""))
//       )
//     ),
//     questRequirements: [
//       ...document
//         .getElementsByClassName("questreq ")[0]
//         .children[0].children[1].firstChild.children[0].children[0].getElementsByTagName("li"),
//     ].map((li) => li.children[0].innerText.trimEnd()),
//     levelRequirements: (() => {
//       const wow = {}
//       [...document.getElementById("rs-qc-form").parentElement.getElementsByTagName("img")].filter(el => el.alt && el.alt !=="Quest.png").map(img => img.parentElement.parentElement.innerText.split(/[^\w+]/).filter(x=>x)).forEach(pair => wow[pair[1]] = pair[0])
//       return wow
//       })(),
//     experienceRewards: (() => {const temp = {}
//     [...document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.getElementsByTagName('img')].filter(img => img.parentElement.parentElement.innerText.toLowerCase().includes('experience')).map(img => img.parentElement.parentElement.innerText.replace(' experience', '') + img.alt).forEach(pizza => {
//       const [xp, skill] = pizza.split(' ')
//           temp[skill] = Number(xp.replace(',', ''))
//           })
//           return temp})(),
//     itemRewards: [...document.getElementById("Rewards").parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children].map(child => child.innerText).filter(string => string.toLowerCase().includes('lamp')),
//   };

//   console.log(QUESTINFO)

// })()
