const express = require('express');
const router = express.Router();
const Clogin = require('../app/controllers/hethong/login.controllers');

router.post('/dangnhap', Clogin.authentication);
router.get('/dangxuat', Clogin.logout);
router.get('/', Clogin.index);

module.exports = router