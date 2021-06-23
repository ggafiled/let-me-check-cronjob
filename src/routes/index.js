var express = require("express");
var router = express.Router();
const Thaichana = require("../services/thaichana");
const ThaichanaInstance = new Thaichana();
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const cors = require("cors");
var fetch = require("node-fetch");
var rp = require("request-promise");
require("dotenv").config();

router.get("/checkin", async (req, res) => {
  try {
    let realData = await ThaichanaInstance.checkin();
    return res.json({
      status: "ok",
      realData: realData,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      realData: [],
      message: error.message,
    });
  }
});

router.get("/checkout", async (req, res) => {
  try {
    let realData = await ThaichanaInstance.checkout();
    return res.json({
      status: "ok",
      realData: realData,
    });
  } catch (error) {
    return res.json({
      status: "fail",
      realData: [],
      message: error.message,
    });
  }
});

router.options("/beacon-event", cors());
router.get("/beacon-event", async (req, res) => {
  var request = require("request");
  var options = {
    method: "POST",
    url: "https://api-scanner.thaichana.com/register",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mobileNumber: "0902640670",
    }),
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
  });
});

module.exports = router;
