const express = require('express');
const router = express.Router();
const Cdatsan = require('../app/controllers/datsan.controllers');

router.get('/get-list', Cdatsan.getList);
router.post('/insert', Cdatsan.insert);

module.exports = router