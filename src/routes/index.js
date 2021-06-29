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
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "th-TH,th;q=0.9",
      "content-type": "application/json;charset=UTF-8",
      "sec-ch-ua":
        '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: "https://qr.thaichana.com/",
    referrerPolicy: "strict-origin-when-cross-origin",
    body: '{"generatedId":"MCobJG-ILytTzB9-aVJ4__"}',
    method: "POST",
    mode: "cors",
  })
    .then((result) => {
      console.log(result);
      return result.json();
    })
    .catch((error) => {
      console.log(error);
      return res.json({
        status: "fail",
        message: error.message,
      });
    });

  console.log(usertoken);
  return res.json({
    status: "ok",
    req: req.body,
    response: usertoken,
  });
});

module.exports = router;
