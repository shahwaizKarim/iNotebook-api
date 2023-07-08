require("dotenv").config()
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userColl = require("../models/user");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
// create users
router.post("/createuser", async (req, res) => {
    let reqbody = req.body;
    try {
        reqbody.password = await bcrypt.hash(reqbody.password, 12)
        let dbData = new userColl(reqbody)
        let savedData = await dbData.save();
        const payload = {
            user: {
                id: savedData.id
            }
        }
        let userData = await userColl.findOne(savedData._id).select("-password");
        let token = jwt.sign(payload, JWT_SECRET_KEY);
        let { _id, name, email } = userData;
        res.status(201).json({ _id, name, email, token, success: true })

    } catch (error) {
        res.status(500).json({ error: error, success: false })
            (error);
    }
})
// get users


router.post("/login", async (req, res) => {
    try {
        let { password, email } = req.body;
        const cheakDb = await userColl.findOne({ email });
        const verify = await bcrypt.compare(password, cheakDb.password)
        if (!verify) {
            return res.status(400).json({ error: "Your credentials are invalid please try again with correct  details" })
        }
        else {

            const payload = {
                user: {
                    id: cheakDb.id
                }
            }


            let userData = await userColl.findOne(cheakDb._id).select("-password");
            let token = jwt.sign(payload, JWT_SECRET_KEY);
            let { _id, name, email } = userData;
            res.status(200).json({ _id, name, email, token, success: true })

        }

    } catch (error) {
        return res.json({ error: error.message })
    }
})



module.exports = router