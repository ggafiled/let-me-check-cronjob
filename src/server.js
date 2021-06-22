const express = require("express");
const app = express();
const cors = require("cors");
var _ = require("lodash");
var moment = require("moment");
const bodyParser = require("body-parser");
const router = require("./routes");
require("dotenv").config();
moment.locale("th");

app.use(
  cors({
    credentials: true,
    origin: "https://let-me-check.herokuapp.com",
  })
);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/cronjob-thaichana", router);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
