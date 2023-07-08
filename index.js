require("dotenv").config()
const express = require("express");
const connectToDb = require("./db/db");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))
const port = process.env.PORT | 5000;

connectToDb()

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})


