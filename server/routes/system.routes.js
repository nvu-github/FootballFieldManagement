const express = require('express');
const router = express.Router();
const Csystem = require('../app/controllers/system.controllers');

router.get('/getinfo', Csystem.getInfoUser);
router.post('/change-status', Csystem.changeStatus);

module.exports = router