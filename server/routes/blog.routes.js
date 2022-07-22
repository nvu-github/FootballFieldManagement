const express = require('express');
const router = express.Router();
const Cblog = require('../app/controllers/blog.controllers');

router.get('/', Cblog.index);

module.exports = router