// this will collect all routes other than those used for auth
import * as Types from "../../../../Types";
import * as express from "express";
import * as passport from "passport";
import { MongoQuery } from "../../mongodb";

// current route is /api
const apiRouter = express.Router();

//@ fetch this route after successfully logging a player in
// this way we know that we have a legitimate player email with which to query the db
apiRouter.get("/getplayerinfo", passport.authenticate("jwt", { session: false }), async (req: Types.ReqUser, res) => {
  // grab the player's email from the req body
  const playerusername = req.user!.username!;

  try {
    // contact the db with the username
    // this query will throw an error if the player was not found

    const playerDataDB = await MongoQuery.getPlayerInfo(playerusername);
    delete playerDataDB.password;

    // if no error was thrown, the player exists, so respond with the playerdata
    res.status(200).json(playerDataDB);
  } catch (error) {
    // if an error was thrown, log it
    console.log(error);
    // and respond with the error message
    res.status(400).json({ message: `${error.message}` });
  }
});

//@ fetch this route to update the player data in the db
apiRouter.put("/updateplayerinfo", passport.authenticate("jwt", { session: false }), async (req: Types.ReqUser, res) => {
  // grab the player's username and data from the req body
  const username = req.user!.username!;
  const playerdata = req.body as Types.IPlayerDataToMongo;
  console.log({ wow: playerdata.Inventory.CurrentInventory });

  try {
    // query the db with the username, and attempt to set the player data
    // this query will throw an error if there was an issue
    const mongoRes = await MongoQuery.updatePlayerInfo(username, playerdata);

    // if no error was thrown, the player exists and their data was successfully set
    console.log(mongoRes);
    res.status(200).json(mongoRes);
  } catch (error) {
    // if an error was thrown, log it
    console.log(error);
    // and respond with the error message
    res.status(400).json({ message: `${error.message}` });
  }
});

export default apiRouter;
