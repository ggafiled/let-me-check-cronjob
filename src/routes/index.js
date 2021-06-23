var express = require("express");
var router = express.Router();
const Thaichana = require("../services/thaichana");
const ThaichanaInstance = new Thaichana();
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: true,
});
const cors = require("cors");
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

router.options("/beacon-event", cors());
router.get("/beacon-event", async (req, res) => {
  let usertoken = await fetch("https://api-scanner.thaichana.com/usertoken", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": httpsAgent,
    },
    body: JSON.stringify({
      generatedId: generatedId,
    }),
  })
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        status: "fail",
        message: error.message,
      });
    });

  return res.json({
    status: "ok",
    req: req.body,
    response: usertoken,
  });
});

module.exports = router;
