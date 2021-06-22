var express = require("express");
var router = express.Router();
const Thaichana = require("../services/thaichana");
const ThaichanaInstance = new Thaichana();
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});
const axios = require("axios");
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
  let usertoken = await axios
    .post(
      "https://cors-anywhere.herokuapp.com/api-scanner.thaichana.com/usertoken",
      JSON.stringify({
        generatedId: "nayJlzoX0rerxUT9TgLAU",
      }),
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "User-Agent": httpsAgent,
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return res.json({
        status: "ok",
        req: req.body,
        response: response.data,
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
