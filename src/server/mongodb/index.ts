import { MongoClient, ServerApiVersion, WithId } from "mongodb";
import { defaultPlayerData } from "../../../Constants/DefaultPlayerData";
import * as Types from "../../../Types";
import { DB_CONFIG } from "../config";

const Mongo_Name = DB_CONFIG.name;
const Mongo_Pass = DB_CONFIG.password;

const uri = `mongodb+srv://${Mongo_Name}:${Mongo_Pass}@cluster0.2twg6.mongodb.net/?retryWrites=true&w=majority`;

const client: MongoClient = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

//@ this function queries the MongoDB cluster for a player matching the specific username
const getPlayerInfo = async (email: string) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("EricDB").collection("PlayerInfo").findOne({ email });

    if (result) {
      // if there is a result, return it
      return result;
    } else {
      console.log(`No results`);
    }
  } catch (e) {
    // log the error if any occur
    console.error(e);
  } finally {
    // the finally block always executes, regardless of the presence of an error, and before any control-flow statements
    await client.close();
  }
};

//@ this function creates a new player document in the PlayerInfo collection
const registerNewPlayer = async (newPlayerInfo: Types.IPlayerData) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("EricDB").collection("PlayerInfo").insertOne(newPlayerInfo);

    if (result) {
      // if there is a result, return it
      return result;
    } else {
      console.log(`No results`);
    }
  } catch (e) {
    // log the error if any occur
    console.error(e);
  } finally {
    // the finally block always executes, regardless of the presence of an error, and before any control-flow statements
    await client.close();
  }
};

//@ this function will update a player's information in the PlayerInfo collection
const updatePlayerInfo = async (playerName: string, playerInfo: Types.IPlayerData) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("EricDB").collection("PlayerInfo").updateOne({ username: playerName }, { $set: playerInfo });

    if (result) {
      // if there is a result, return it
      return result;
    } else {
      console.log(`No results`);
    }
  } catch (e) {
    // log the error if any occur
    console.error(e);
  } finally {
    // the finally block always executes, regardless of the presence of an error, and before any control-flow statements
    await client.close();
  }
};

export const MongoQuery = {
  getPlayerInfo,
  registerNewPlayer,
  updatePlayerInfo,
};

//! use these to test

registerNewPlayer(defaultPlayerData).then((res) => {
  if (res) {
    console.log(res);
    //! probably a better way to do this
    // this lets us assert that playerInfo is of the correct type.
    // let playerInfo = JSON.parse(JSON.stringify(res)) as Types.IPlayerData;
    // playerInfo.password;
    // console.log(`the password is ${res.password}`);

    // console.log(`the password is ${playerInfo.password}`);
  }
});

// getPlayerInfo(`tesail.com`).then((res) => {
//   if (res) {
//     //! probably a better way to do this
//     // this lets us assert that playerInfo is of the correct type.
//     let playerInfo = JSON.parse(JSON.stringify(res)) as Types.IPlayerData;
//     playerInfo.password;
//     console.log(`the password is ${res.password}`);

//     console.log(`the password is ${playerInfo.password}`);
//   }
// });
