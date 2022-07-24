import { MongoClient, ServerApiVersion } from "mongodb";
import * as Types from "../../../Types";

import { DB_CONFIG } from "../config";

const Mongo_Name = DB_CONFIG.name;
const Mongo_Pass = DB_CONFIG.password;

const uri = `mongodb+srv://${Mongo_Name}:${Mongo_Pass}@cluster0.2twg6.mongodb.net/?retryWrites=true&w=majority`;

const client: MongoClient = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

//@ this function connects to the MongoDB server, and runs qeuries
//! I can probably wrap this up just like fetcher lol
async function mainMongoFunction() {
  try {
    // Connect to the MongoDB cluster
    console.log(`im trying to connect`);
    await client.connect();

    // Make the appropriate DB calls
    // await findOnePlayerTest(client, `testnamelol`);
    // await registerNewPlayer(client, testPlayerData);
    await updatePlayerStats(client, `testnamelol2`, testPlayerData);
  } catch (e) {
    // log the error if any occur
    console.error(e);
  } finally {
    // the finally block always executes, regardless of if there was an error
    console.log(`now i am closing the connection`);
    await client.close();
  }
}

//@ this function queries the MongoDB cluster for a player matching the specific username
async function findOnePlayerTest(client: MongoClient, playerName: string) {
  const result = await client.db("EricDB").collection("PlayerInfo").findOne({ username: playerName });

  if (result) {
    console.log(result);
  } else {
    console.log(`No results`);
  }
}

//@ this function creates a new player document in the PlayerInfo collection
async function registerNewPlayer(client: MongoClient, newPlayerInfo: Types.IPlayerData) {
  const result = await client.db("EricDB").collection("PlayerInfo").insertOne(newPlayerInfo);
  console.log(`New player registered with the following id: ${result.insertedId}`);
}

//@ this function will update a player's information in the PlayerInfo collection
async function updatePlayerStats(client: MongoClient, playerName: string, playerInfo: Types.IPlayerData) {
  const result = await client.db("EricDB").collection("PlayerInfo").updateOne({ username: playerName }, { $set: playerInfo });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

mainMongoFunction().catch(console.error);

let testPlayerData: Types.IPlayerData = {
  username: `testnamelol2`,
  email: `testnamelol2@gmail.com`,
  password: `hunter2lolftw2`,
  Experience: {
    Woodcutting: 420,
    Firemaking: 420,
    Fishing: 420,
    Attack: 420,
    Strength: 420,
    Defence: 420,
    Constitution: 1358,
    Prayer: 420,
    Summoning: 420,
    Ranged: 420,
    Magic: 420,
    Cooking: 420,
    Mining: 420,
    Thieving: 420,
    Crafting: 420,
  },
  Bank_Fish: {
    raw_shrimp: { name: "raw_shrimp", amount: 69 },
    raw_crayfish: { name: "raw_crayfish", amount: 0 },
    raw_anchovies: { name: "raw_anchovies", amount: 0 },
    raw_trout: { name: "raw_trout", amount: 0 },
    raw_salmon: { name: "raw_salmon", amount: 420 },
    raw_pike: { name: "raw_pike", amount: 0 },
    raw_sardine: { name: "raw_sardine", amount: 0 },
    raw_herring: { name: "raw_herring", amount: 0 },
  },
  Bank_Logs: {
    logs: { name: "logs", amount: 0 },
    oak: { name: "oak", amount: 0 },
    willow: { name: "willow", amount: 0 },
    maple: { name: "maple", amount: 420 },
    yew: { name: "yew", amount: 0 },
    magic: { name: "magic", amount: 0 },
    elder: { name: "elder", amount: 0 },
  },
  Inventory: { CurrentInventory: ["logs"] },
  Location: { CurrentLocation: "Lumbridge" },
  Skill: { CurrentSkill: "none" },
  CombatStyle: { CurrentStyle: "melee" },
  Activity: { CurrentActivity: "Idle" },
  Resource: { CurrentResource: "none" },
  Target: { CurrentTarget: "none" },
  Quest: { CurrentQuest: "none" },
  Resources: { Banking: true, Dropping: false },
  Wallet: { coins: 100 },
  QuestPoints: { CurrentQuestPoints: 0 },
  Quests_Lumbridge: {
    LumbridgeQuestArray: [
      { name: "Cook's Assistant", stepsComplete: 18, stepsTotal: 20, complete: false },
      { name: "Myths of the White Lands", stepsComplete: 0, stepsTotal: 35, complete: false },
      { name: "The Restless Ghost", stepsComplete: 14, stepsTotal: 14, complete: true },
      { name: "The Lost Tribe", stepsComplete: 0, stepsTotal: 33, complete: false },
      { name: "The Blood Pact", stepsComplete: 16, stepsTotal: 17, complete: false },
      { name: "Buyers and Cellars", stepsComplete: 0, stepsTotal: 15, complete: false },
      { name: "Lost City", stepsComplete: 0, stepsTotal: 26, complete: false },
    ],
  },
  Quests_Draynor: {
    DraynorQuestArray: [
      { name: "A Fairy Tale I - Growing Pains", stepsComplete: 0, stepsTotal: 35, complete: false },
      { name: "A Fairy Tale II - Cure a Queen", stepsComplete: 0, stepsTotal: 36, complete: false },
      { name: "Vampyre Slayer", stepsComplete: 0, stepsTotal: 23, complete: false },
      { name: "Ernest the Chicken", stepsComplete: 0, stepsTotal: 40, complete: false },
      { name: "Animal Magnetism", stepsComplete: 0, stepsTotal: 52, complete: false },
      { name: "Love Story", stepsComplete: 0, stepsTotal: 44, complete: false },
      { name: "Swept Away", stepsComplete: 0, stepsTotal: 30, complete: false },
      { name: "Missing My Mummy", stepsComplete: 0, stepsTotal: 45, complete: false },
      { name: "Stolen Hearts", stepsComplete: 0, stepsTotal: 29, complete: false },
    ],
  },
  BodySlot: {
    playerOwnsbronzeplatebody: true,
    playerOwnsironplatebody: true,
    playerOwnssteelplatebody: true,
    playerOwnsmithrilplatebody: true,
    playerOwnsadamantplatebody: false,
    playerOwnsruneplatebody: false,
    playerOwnswizardrobetop: false,
    playerOwnsimphiderobetop: false,
    playerOwnsspidersilkrobetop: false,
    playerOwnsbatwingtorso: false,
    playerOwnssplitbarkbody: false,
    playerOwnsleatherbody: false,
    playerOwnshardleatherbody: false,
    playerOwnsstuddedbody: false,
    playerOwnscarapacetorso: false,
    playerOwnsgreendragonhidebody: false,
  },
  HandSlot: {
    playerOwnsbronzegauntlets: false,
    playerOwnsirongauntlets: false,
    playerOwnssteelgauntlets: false,
    playerOwnsmithrilgauntlets: false,
    playerOwnsadamantgauntlets: false,
    playerOwnsrunegauntlets: false,
    playerOwnswizardgloves: false,
    playerOwnsimphidegloves: false,
    playerOwnsspidersilkgloves: false,
    playerOwnsbatwinggloves: false,
    playerOwnssplitbarkgauntlets: false,
    playerOwnsleathervambraces: false,
    playerOwnshardleathergloves: false,
    playerOwnsstuddedleathergloves: false,
    playerOwnscarapacegloves: false,
    playerOwnsgreendragonhidevambraces: false,
  },
  FeetSlot: {
    playerOwnsbronzearmouredboots: false,
    playerOwnsironarmouredboots: false,
    playerOwnssteelarmouredboots: false,
    playerOwnsmithrilarmouredboots: false,
    playerOwnsadamantarmouredboots: false,
    playerOwnsrunearmouredboots: false,
    playerOwnswizardboots: false,
    playerOwnsimphideboots: false,
    playerOwnsspidersilkboots: false,
    playerOwnsbatwingboots: false,
    playerOwnssplitbarkboots: false,
    playerOwnsleatherboots: false,
    playerOwnshardleatherboots: false,
    playerOwnsstuddedleatherboots: false,
    playerOwnscarapaceboots: false,
    playerOwnsgreendragonhideboots: false,
  },
  HeadSlot: {
    playerOwnsbronzefullhelm: false,
    playerOwnsironfullhelm: false,
    playerOwnssteelfullhelm: false,
    playerOwnsmithrilfullhelm: false,
    playerOwnsadamantfullhelm: false,
    playerOwnsrunefullhelm: false,
    playerOwnswizardhat: false,
    playerOwnsimphidehood: true,
    playerOwnsspidersilkhood: true,
    playerOwnsbatwinghood: true,
    playerOwnssplitbarkhelm: true,
    playerOwnsleathercowl: true,
    playerOwnshardleathercowl: false,
    playerOwnsstuddedleathercoif: false,
    playerOwnscarapacehelm: false,
    playerOwnsgreendragonhidecoif: false,
  },
  LegsSlot: {
    playerOwnsbronzeplatelegs: false,
    playerOwnsironplatelegs: false,
    playerOwnssteelplatelegs: false,
    playerOwnsmithrilplatelegs: false,
    playerOwnsadamantplatelegs: false,
    playerOwnsruneplatelegs: false,
    playerOwnswizardrobeskirt: false,
    playerOwnsimphiderobebottom: false,
    playerOwnsspidersilkrobebottom: false,
    playerOwnsbatwinglegs: false,
    playerOwnssplitbarklegs: false,
    playerOwnsleatherchaps: false,
    playerOwnshardleatherchaps: false,
    playerOwnsstuddedchaps: false,
    playerOwnscarapacelegs: false,
    playerOwnsgreendragonhidechaps: false,
  },
  BackSlot: {
    playerOwnsbladestormdrape: false,
    playerOwnsspellstormdrape: false,
    playerOwnsarrowstormdrape: false,
    playerOwnspathfindercape: false,
    playerOwnsteamcape: false,
    playerOwnsobsidiancape: false,
  },
  RingSlot: {
    playerOwnswarriorring: false,
    playerOwnsseersring: false,
    playerOwnsarcherring: false,
    playerOwnsringofpotency: false,
    playerOwnsringofwealth: false,
    playerOwnsberserkerring: false,
  },
  NeckSlot: {
    playerOwnsamuletofstrength: false,
    playerOwnsamuletofmagic: false,
    playerOwnsamuletofaccuracy: false,
    playerOwnsholysymbol: false,
    playerOwnsamuletofdefence: false,
    playerOwnsamuletofpower: false,
    playerOwnsamuletofglory: false,
    playerOwnsamuletoffury: false,
  },
  TwoHandSlot: {
    playerOwnsbronze2hsword: true,
    playerOwnsiron2hsword: true,
    playerOwnssteel2hsword: true,
    playerOwnsmithril2hsword: true,
    playerOwnsadamant2hsword: true,
    playerOwnsrune2hsword: true,
    playerOwnsstaffofair: false,
    playerOwnsstaffofwater: false,
    playerOwnsstaffofearth: true,
    playerOwnsstaffoffire: false,
    playerOwnsairbattlestaff: false,
    playerOwnswaterbattlestaff: false,
    playerOwnsearthbattlestaff: true,
    playerOwnsfirebattlestaff: false,
    playerOwnsmysticairstaff: false,
    playerOwnsmysticwaterstaff: false,
    playerOwnsmysticearthstaff: true,
    playerOwnsmysticfirestaff: false,
    playerOwnsshortbow: true,
    playerOwnsoakshortbow: true,
    playerOwnswillowshortbow: false,
    playerOwnsmapleshortbow: false,
    playerOwnsyewshortbow: true,
    playerOwnsmagicshortbow: true,
  },
  Hatchets: {
    playerOwnsbronzehatchet: true,
    playerOwnsironhatchet: false,
    playerOwnssteelhatchet: false,
    playerOwnsmithrilhatchet: false,
    playerOwnsadamanthatchet: false,
    playerOwnsrunehatchet: false,
  },
  timestamp: 1658672922119,
};
