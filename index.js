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
// const express = require("express");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// app.post("/ussd", (req, res) => {
//   // Read the variables sent via POST from our API
//   const { sessionId, serviceCode, phoneNumber, text } = req.body;

//   let response = "";

//   if (text == "") {
//     // This is the first request. Note how we start the response with CON
//     response = `CON What would you like to check
//         1. My account
//         2. My phone number`;
//   } else if (text == "1") {
//     // Business logic for first level response
//     response = `CON Choose account information you want to view
//         1. Account number`;
//   } else if (text == "2") {
//     // Business logic for first level response
//     // This is a terminal request. Note how we start the response with END
//     response = `END Your phone number is ${phoneNumber}`;
//   } else if (text == "1*1") {
//     // This is a second level response where the user selected 1 in the first instance
//     const accountNumber = "ACC100101";
//     // This is a terminal request. Note how we start the response with END
//     response = `END Your account number is ${accountNumber}`;
//   }

//   // Send the response back to the API
//   res.set("Content-Type: text/plain");
//   res.send(response);
// });
app.listen(4000, async () => {
  console.log(`Server Running 4000`);
});
