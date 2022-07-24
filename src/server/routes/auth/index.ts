// this can hold the auth routes, there aren't too many
import * as express from "express";
import * as Types from "../../../../Types";
import * as DB from "../../mongodb/index";
import * as passport from "passport";
import { generateHash, generateToken } from "../../ServerUtils/Passwords";

//current route is /auth
const authRouter = express.Router();

//verify token
authRouter.get(`/verify`, passport.authenticate("jwt"), (req, res) => {
  // when verifying, check for this exact message
  res.status(200).json({ message: "valid token" });
});

//login existing user
//! refactor to work with MongoDB
authRouter.post(`/login`, passport.authenticate("local"), (req, res) => {
  try {
    const token = generateToken(req.user.username);
    res.json(token);
  } catch (error) {
    console.log(`login error...\n`);
    console.error(error);
  }
});

//register new user
//! refactor to work with MongoDB
authRouter.post(`/register`, async (req, res) => {
  const newUser = req.body;
  try {
    newUser.password = generateHash(newUser.password);
    const results = await DB.Users.insertNewUser(newUser);
    if (results.affectedRows) {
      const token = generateToken(newUser.username);
      res.json(token);
    } else {
      res.status(400).json({ message: "duplicate email" });
    }
  } catch (error) {
    console.log(`register error...\n`);
    console.error(error);
  }
});

export default authRouter;
