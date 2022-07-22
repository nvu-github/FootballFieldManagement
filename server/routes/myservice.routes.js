const express = require('express');
const router = express.Router();
const Cmyservice = require('../app/controllers/myservice.controller');

router.get('/', Cmyservice.index);

module.exports = router