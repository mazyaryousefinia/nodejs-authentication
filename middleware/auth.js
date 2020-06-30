const jwt = require('jsonwebtoken')
const config = require('config')
const { func } = require('joi')

module.exports = function(req, res, next){
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied. No token provided.")

    try {
        const decode = jwt.verify(token, config.get("myprivatekey"));
        req.user = decode;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
};