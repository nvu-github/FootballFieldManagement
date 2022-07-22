const express = require('express');
const router = express.Router();
const Chome = require('../app/controllers/home.controllers');

router.get('/search', Chome.search);
router.get('/', Chome.index);

module.exports = router