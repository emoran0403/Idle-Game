// collect all routes here

import * as express from "express";
import authRouter from "./auth";
import apiRouter from "./api";
const baseRouter = express.Router();

baseRouter.use("/api", apiRouter);
baseRouter.use("/auth", authRouter);

export default baseRouter;
