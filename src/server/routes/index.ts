// collect all routes here

import * as express from "express";
import authRouter from "./auth";
import apiRouter from "./api";
const baseRouter = express.Router();

baseRouter.use("/api", apiRouter);
baseRouter.use("/auth", authRouter);

export default baseRouter;

/************************************************* Route Details *************************************************
 * /api
 * - /getplayerinfo - fetch player data
 * - /updateplayerinfo- update player data
 * /auth
 * - /verify - verify JWT
 * - /login - login a player
 * - /register - register a new player
 */
