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
        // let usertoken = await petitio(`https://api-scanner.thaichana.com/usertoken`, "POST").body({
        //     generatedId: "MCobJG-ILytTzB9-aVJ4__",
        // }).header({
        //     mode: "cors",
        //     Host: "api-scanner.thaichana.com",
        //     Referer: "https://api-scanner.thaichana.com",
        //     "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1",
        //     credentials: "include",
        // }).text();

        const data = JSON.stringify({
            generatedId: "MCobJG-ILytTzB9-aVJ4__",
        });

        const https = require('https')
        var options = {
            hostname: 'api-scanner.thaichana.com',
            path: '/usertoken',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, ress => {
            console.log(`statusCode: ${ress.statusCode}`)

            ress.on('data', d => {
                process.stdout.write(d)
                return res.json({
                    status: "ok",
                    response: Buffer.from(d).toString(),
                });
            })
        })

        req.on('error', error => {
            console.error(error)
        })

        req.write(data)
        req.end()

        // console.log(usertoken);

        // return res.json({
        //     status: "ok",
        //     response: usertoken,
        // });
    } catch (error) {
        console.log(error);

        return res.json({
            status: "fail",
            response: error.message,
        });
    }
});

module.exports = router;