import { DB_CONFIG } from "../config";
import mongoose from "mongoose";
import { playerInfoModel, wow } from "./models";

const Mongo_Name = DB_CONFIG.name;
const Mongo_Pass = DB_CONFIG.password;

const uri = `mongodb+srv://${Mongo_Name}:${Mongo_Pass}@cluster0.2twg6.mongodb.net/?retryWrites=true&w=majority`;

//@ connect to MongoDB
async function main() {
  await mongoose.connect(uri);

  const playerInfoSchema = new mongoose.Schema(wow);

  const Player = mongoose.model("Player", playerInfoSchema);

  const Eric = new Player();
  console.log(Eric);

  await Eric.save();
}
// just in case
main().catch((err) => console.log(err));

// const kittySchema = new mongoose.Schema({
//   name: String,
//   age: Number,
// });

// const Kitten = mongoose.model("Kitten", kittySchema);

// const Lunatic = new Kitten({ name: "Lunatic", age: 6 });
// console.log(Lunatic.name); // 'Silence'
// console.log(Lunatic.age);

//! not quite sure how to use this
// import { MongoClient, ServerApiVersion } from "mongodb";

//@ this works!
// const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
// client.connect(async (err, result) => {
//   const collection = result?.db("EricDB").collection("PlayerInfo");
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`results below lol`);
//     collection?.find().toArray((error, result) => {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log(result);
//         client.close();
//       }
//     });
//   }
// });

/**
 * get one player info
 * put a player info
 * post a new player info
 *
 */

//******************************************************************************************************************************** */

// //! not quite sure how to use this
// var axios = require("axios");
// var data = JSON.stringify({
//   collection: "PlayerInfo",
//   database: "EricDB",
//   dataSource: "Cluster0",
//   projection: {
//     _id: 1,
//   },
// });

// var config = {
//   method: "post",
//   url: "https://data.mongodb-api.com/app/data-szzks/endpoint/data/v1/action/findOne",
//   headers: {
//     "Content-Type": "application/json",
//     "Access-Control-Request-Headers": "*",
//     "api-key": "r0a9IFv1rPl9sowNi4VaFO5Kgu13xRJYBPO0MjUc84806VpR9MSOGBHgMMLth2Tj",
//   },
//   data: data,
// };

// axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
