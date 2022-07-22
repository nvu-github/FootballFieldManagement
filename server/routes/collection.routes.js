const express = require('express');
const router = express.Router();
const Cnews = require('../app/controllers/collection.controllers');

router.get('/:slug', Cnews.showData);
router.post('/insertdata', Cnews.insertdata);
router.get('/:id/edit', Cnews.editData);
router.get('/:id/delete', Cnews.delete);
router.get('/', Cnews.index);

module.exports = router