const Mlogin = require('../models/hethong/login.models');
const jwt = require('jsonwebtoken');
module.exports.middleware = function name(req, res, next) {
    try {
        const refreshToken = req.headers['x-access-token'];
        const dataVerify = jwt.verify(refreshToken, process.env.ACCESS_SECRET_KEY_JWT);
        if (dataVerify) {
            next();
        }
    } catch (err) {
        // console.log(err);
        res.status(401).json({err});
    } 
}