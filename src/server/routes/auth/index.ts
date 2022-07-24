// this can hold the auth routes, there aren't too many
import * as express from "express";
import * as Types from "../../../types";
import * as DB from "../../database";
import * as passport from "passport";
import { generateHash, generateToken } from "../../server_utils/Passwords";

//current route is /auth
const authRouter = express.Router();

//verify token
authRouter.get(`/verify`, passport.authenticate("jwt"), (req, res) => {
  res.status(200).json({ message: "valid token" }); // make sure i check for this exact message on navbar!
});

//login existing user
authRouter.post(`/login`, passport.authenticate("local"), (req: Types.ReqUser, res) => {
  try {
    const token = generateToken(req.user.id, req.user.email, req.user.name);
    res.json(token);
  } catch (error) {
    console.log(`login error...\n`);
    console.error(error);
  }
});

//register new user
authRouter.post(`/register`, async (req, res) => {
  const newUser = req.body;
  try {
    newUser.password = generateHash(newUser.password);
    const results = await DB.Users.insertNewUser(newUser);
    if (results.affectedRows) {
      const token = generateToken(results.insertId, newUser.email, newUser.name);
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
