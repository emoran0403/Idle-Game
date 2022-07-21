import { DB_CONFIG } from "../config";

//! not quite sure how to use this

const { MongoClient, ServerApiVersion } = require("mongodb");

const Mongo_Name = DB_CONFIG.name;
const Mongo_Pass = DB_CONFIG.password;

const uri = `mongodb+srv://${Mongo_Name}:${Mongo_Pass}@cluster0.2twg6.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

//******************************************************************************************************************************** */

//! not quite sure how to use this
var axios = require("axios");
var data = JSON.stringify({
  collection: "PlayerInfo",
  database: "EricDB",
  dataSource: "Cluster0",
  projection: {
    _id: 1,
  },
});

var config = {
  method: "post",
  url: "https://data.mongodb-api.com/app/data-szzks/endpoint/data/v1/action/findOne",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key": "r0a9IFv1rPl9sowNi4VaFO5Kgu13xRJYBPO0MjUc84806VpR9MSOGBHgMMLth2Tj",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
