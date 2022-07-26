// this can hold the auth routes, there aren't too many
import * as express from "express";
import * as Types from "../../../../Types";
import { MongoQuery } from "../../mongodb/index";
import * as passport from "passport";
import { generateHash, generateToken } from "../../ServerUtils/Passwords";
import { defaultPlayerData } from "../../../../Constants/DefaultPlayerData";

//current route is /auth
const authRouter = express.Router();

//verify token
//@ can fetch this on an interval to check if the token is valid
authRouter.get(`/verify`, passport.authenticate("jwt"), (req, res) => {
  // when verifying, check for this exact message
  res.status(200).json({ message: "valid token" });
});

//login existing user
authRouter.post(`/login`, passport.authenticate("local"), (req: Types.ReqUser, res) => {
  try {
    const token = generateToken(req.user!.username!, req.user!.email!);
    res.json(token);
  } catch (error) {
    console.log(`login error...\n`);
    console.error(error);
    res.status(500).json({ message: "issue logging in" });
  }
});

//register new user
authRouter.post(`/register`, async (req, res) => {
  // grab the player information from the req body
  const playerRegisterInfo = req.body as Types.IPlayerPayload;
  try {
    // hash the password, and overwrite it to the player information
    let hashedPass = generateHash(playerRegisterInfo.password!);
    playerRegisterInfo.password = hashedPass;

    // combine the player information with the default player data - experience, quests, etc
    let newPlayerData = { ...defaultPlayerData, ...playerRegisterInfo };

    // attempt to register the player - errors will be thrown if there is duplicate data
    const MongoRes = await MongoQuery.registerNewPlayer(newPlayerData);

    // if there was a positive response, log it and send a token to the client
    console.log(MongoRes);

    const token = generateToken(playerRegisterInfo.username!, playerRegisterInfo.email!);

    res.json(token);
  } catch (error) {
    console.log(`register error...\n`);
    console.error(error);
    res.status(400).json({ message: `${error.message}` });
  }
});

export default authRouter;
