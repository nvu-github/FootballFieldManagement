const express = require('express');
const router = express.Router();
const Ccontact = require('../app/controllers/contact.controllers');

router.get('/', Ccontact.index);

module.exports = router