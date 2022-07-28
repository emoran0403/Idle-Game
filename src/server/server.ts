// this is the start of the server routes - initialize the server here

import * as express from "express";
import baseRouter from "./Routes/index";
import * as path from "path";

import { configurePassport } from "../server/ServerUtils/JWTStrategies";

const app = express();

configurePassport(app);

app.use(express.static("public"));
app.use(express.json());
app.use(baseRouter);
app.get(`*`, (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
