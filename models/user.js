const mongoose = require("mongoose");
const validator = require("validator");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                return `Your entered email is not correct please try again with a correct email`
            }
        }
    },
    password: {
        required: true,
        type: String,
        minLength: 6
    },
    phone: {
        type: String,

    }
})

const userModel = new mongoose.model("noteauth", User);

module.exports = userModel;


