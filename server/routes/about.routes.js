const express = require('express');
const router = express.Router();
const Cabout = require('../app/controllers/about.controllers');

router.get('/', Cabout.index);

module.exports = router