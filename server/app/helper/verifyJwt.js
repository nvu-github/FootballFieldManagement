const jwt = require('jsonwebtoken');
module.exports = (token) => {
    const dataVerify = jwt.verify(token, process.env.ACCESS_SECRET_KEY_JWT);
    return dataVerify;
}