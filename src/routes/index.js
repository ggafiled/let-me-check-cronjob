var express = require("express");
var router = express.Router();
const Thaichana = require("../services/thaichana");
const ThaichanaInstance = new Thaichana();
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
var fetch = require("node-fetch");
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

router.get("/beacon-event", async (req, res) => {
  let usertoken = await fetch("https://api-scanner.thaichana.com/usertoken", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": httpsAgent,
    },
    body: JSON.stringify({
      generatedId: "nayJlzoX0rerxUT9TgLAU",
    }),
  })
    .then((response) => {
      console.log(response);
      return res.json({
        status: "ok",
        req: req.body,
        response: response.json(),
      });
    })
    .catch((error) => {
      return res.json({
        status: "fail",
        realData: [],
        message: error.message,
      });
    });
});

module.exports = router;
