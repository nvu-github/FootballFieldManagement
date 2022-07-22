const express = require('express');
const router = express.Router();
const Chomeadmin = require('../../app/controllers/admin/homadmin.controllers');

router.get('/', Chomeadmin.index);
module.exports = router