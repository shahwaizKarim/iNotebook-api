require("dotenv").config()
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const notesColl = require("../models/notes");
const cheakToken = require("../middleware/authantication");
"Thenameofthepassportisnotcomplexat$"

// create notes

router.post("/createnote/:id", cheakToken, async (req, res) => {
    try {

        if (req.params.id === req.user.id) {
            let data = { user: req.user.id, ...req.body }
            let dbData = new notesColl(data)
            let savedData = await dbData.save();
            const { _id, title, date, description } = savedData
            res.status(200).json({ _id, title, date, description })
        }
        else {
            res.status(400).json({ success: false, error: "You are not allowed" })
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})
// get users
router.get("/readnotes/:id", cheakToken, async (req, res) => {
    try {
        if (req.params.id === req.user.id) {
            let result = await notesColl.find({ user: req.params.id });
            res.json(result)
        }
        else {
            res.status(400).json({ success: false, error: "You are not allowed" })
        }
    } catch (error) {
        return res.status(400).json({ error: "You are trying to access notes with invalid user id" })
    }
})


router.put("/updatenote/:id", cheakToken, async (req, res,) => {

    try {
        let dbnote = await notesColl.findById({ _id: req.params.id });

        if (dbnote.user.toString() === req.user.id) {
            const { title, description } = req.body
            // const note = {}
            if (title && description) {
                let note = await notesColl.findByIdAndUpdate({ _id: req.params.id }, { $set: { title, description } }, { new: true });
                res.status(201).json(note)
            }
            else if (description) {
                let note = await notesColl.findByIdAndUpdate({ _id: req.params.id }, { $set: { description } }, { new: true });
                res.status(201).json(note)
            }
            else if (title) {
                let note = await notesColl.findByIdAndUpdate({ _id: req.params.id }, { $set: { title } }, { new: true });
                res.status(201).json(note)
            }
            else {
                res.status(400).json({ success: false, error: "Cheak your input fields again!" })
            }
        }
        else {
            res.status(400).json({ success: false, error: "Cheak your input fields again!" })
        }

    } catch (error) {
        return res.json({ error: error.message })
    }
})
router.delete("/deletenote/:id", cheakToken, async (req, res) => {
    console.log(req.params.id.toString(), req.user.id)
    try {
        let note = await notesColl.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json({ success: true })

    } catch (error) {
        return res.json({ error: error.message })
    }
})



module.exports = router