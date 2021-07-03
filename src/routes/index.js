var express = require("express");
var router = express.Router();
const Thaichana = require("../services/thaichana");
const ThaichanaInstance = new Thaichana();
const cors = require("cors");
var fetch = require("node-fetch");
var petitio = require("petitio");
const { raw } = require("body-parser");
require("dotenv").config();

router.get("/checkin", async(req, res) => {
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

router.get("/checkout", async(req, res) => {
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
router.get("/beacon-event", async(req, res) => {
    try {
        let usertoken = await petitio(`https://api-scanner.thaichana.com/usertoken`, "POST").body({
            generatedId: "MCobJG-ILytTzB9-aVJ4__",
        }).header({
            "User-Agent": "curl/7.64.1",
            credentials: "include",
        }).text();

        console.log(usertoken);

        return res.json({
            status: "ok",
            raw_response: usertoken,
            response: usertoken,
        });
    } catch (error) {
        console.log(error);

        return res.json({
            status: "fail",
            response: error.message,
        });
    }
});

module.exports = router;