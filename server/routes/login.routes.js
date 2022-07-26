const express = require('express');
const router = express.Router();
const Clogin = require('../app/controllers/hethong/login.controllers');

router.post('/dangnhap', Clogin.authentication);
router.post('/register', Clogin.register);
router.post('/auth/refreshToken', Clogin.refreshToken);
// router.get('/', Clogin.index);

module.exports = router