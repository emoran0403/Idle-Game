import { MongoClient, ServerApiVersion, WithId } from "mongodb";
import * as Types from "../../../Types";
import { DB_CONFIG } from "../config";

const Mongo_Name = DB_CONFIG.name;
const Mongo_Pass = DB_CONFIG.password;

const uri = `mongodb+srv://${Mongo_Name}:${Mongo_Pass}@cluster0.2twg6.mongodb.net/?retryWrites=true&w=majority`;

const client: MongoClient = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

//@ this function queries the MongoDB cluster for a player matching the specific username
const getPlayerInfo = async (username: string) => {
  try {
    // Connect to the MongoDB cluster
    await client.connect();
    const result = await client.db("EricDB").collection("PlayerInfo").findOne<Types.IPlayerData>({ username });

    if (result !== null) {
      // if there is a result, return it
      return result;
    } else {
      // otherwise throw an error - the user was not found
      throw new Error(`Player with username ${username} not found`);
    }
  } catch (e) {
    // log the error message if any occur
    console.error(e.message);
    // throwing this to the route allows the route to have context of the error message
    throw new Error(e.message);
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

    // attempt to register the player, will throw an error if newPlayerInfo contains a duplicate email or username
    await client.db("EricDB").collection("PlayerInfo").insertOne(newPlayerInfo);
  } catch (e) {
    // log the error message if any occur
    console.error(e.message);
    // throwing this to the route allows the route to have context of the error message
    throw new Error(e.message);
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
      throw new Error();
    }
  } catch (e) {
    // log the error message if any occur
    console.error(e.message);
    // throwing this to the route allows the route to have context of the error message
    throw new Error(e.message);
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
