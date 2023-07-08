const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "noteauth"
    },
    title: {
        type: String,
        required: true,
        minLength: 2
    },
    description: {
        type: String,
        required: true,
        minLength: 3
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const noteModel = new mongoose.model("notedataColl", noteSchema);

module.exports = noteModel;