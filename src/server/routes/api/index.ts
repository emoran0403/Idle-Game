// this will collect all routes other than those used for auth

import * as express from "express";
import { MongoQuery } from "../../mongodb";

// current route is /api
const apiRouter = express.Router();

//! go over these with Andrew in class

//@ fetch this route after successfully logging a player in
// this way we know that we have a legitimate player email with which to query the db
apiRouter.get("/getplayerinfo", async (req, res) => {
  // grab the player's email from the req body
  const playerEmail = req.body.playerEmail;

  try {
    // contact the db with the player email
    // this query will throw an error if the player was not found
    const playerDataDB = await MongoQuery.getPlayerInfo(playerEmail);

    // if no error was thrown, the player exists, so respond with the playerdata
    res.status(200).json(playerDataDB);
  } catch (error) {
    // if an error was thrown, log it
    console.error(error);
    // and respond with the error message
    res.status(400).json({ message: `${error.message}` });
  }
});

//@ fetch this route to update the player data in the db
apiRouter.put("/updateplayerinfo", async (req, res) => {
  // grab the player's username and data from the req body
  const username = req.body.username;
  const playerdata = req.body.playerdata;

  try {
    // query the db with the username, and attempt to set the player data
    // this query will throw an error if there was an issue
    const mongoRes = await MongoQuery.updatePlayerInfo(username, playerdata);

    // if no error was thrown, the player exists and their data was successfully set
    res.status(200).json(mongoRes);
  } catch (error) {
    // if an error was thrown, log it
    console.error(error);
    // and respond with the error message
    res.status(400).json({ message: `${error.message}` });
  }
});

export default apiRouter;
