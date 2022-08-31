const jwt = require('jsonwebtoken');
module.exports.middleware = function name(req, res, next) {
    try {
        const accessToken = req.headers['x-access-token'];
        const dataVerify = jwt.verify(accessToken, process.env.ACCESS_SECRET_KEY_JWT);
        if (dataVerify) {
            next();
        }
    } catch (err) {
        // console.log(err);
        res.status(401).json({err});
    } 
}