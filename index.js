const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const ussd = require("./routes/index");

const main = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use("/ussd", ussd);
  app.use("*", (req, res) => res.status(404).send("404 Not Found"));

  app.listen(4000, async () => {
    console.log(`Server Running 4000`);
  });
};

main();
