const Mlogin = require('../models/hethong/login.models');
module.exports.middleware = function name(req, res, next) {
    // if (!req.cookies.cookieLogin) {
    //     res.redirect('login');
    //     return;
    // }

    // gia tri chi ton tai trong phien lam viec
    // res.locals.user = (req.cookies.cookieLogin) ? JSON.parse(req.cookies.cookieLogin)[1] : '';
    // res.locals.permission = (req.cookies.cookieLogin) ? JSON.parse(req.cookies.cookieLogin)[2] : '';
    next()
}