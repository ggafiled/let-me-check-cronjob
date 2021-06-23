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
  var options = {
    method: "POST",
    uri: "https://example.com/",
    body: {
      generatedId: "nayJlzoX0rerxUT9TgLAU",
    },
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
    },
    json: true, // Automatically stringifies the body to JSON
  };
  let usertoken = await rp(options)
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
    });

  return res.json({
    status: "ok",
    req: req.body,
    response: usertoken,
  });
});

module.exports = router;
