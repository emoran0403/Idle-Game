import * as express from "express";
import apiRouter from "./routes";

//! for testing purposes
// import "./mongodb";

const app = express();

app.use(express.static("public"));
app.use(express.json()); // body parser ftw just in case lol
app.use(apiRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
