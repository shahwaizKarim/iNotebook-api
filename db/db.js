require("dotenv").config()
const mongoose = require("mongoose");
const connectToDb = () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("succesfully connected to the database");
    }).catch((err) => {
        console.log("Unable to connect to the database:  " + err.message);
    })

}

module.exports = connectToDb;

