const jwt = require("jsonwebtoken");
const userColl = require("../models/user");
const JWT_SECRET_KEY = "Thenameofthepassportisnotcomplexat$"
const cheakToken = async (req, res, next) => {
    try {
        let token = req.headers.token;
        let tokenData = jwt.verify(token, JWT_SECRET_KEY);
        req.user = tokenData.user

    } catch (error) {
        return res.json({ error: "You are note allowed to use iNotebook without token." })
    }
    next()
}

module.exports = cheakToken