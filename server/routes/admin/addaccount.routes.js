const express = require('express');
const router = express.Router();
const Cmanageaccount = require('../../app/controllers/admin/manageaccount.controllers');

router.post('/insert', Cmanageaccount.addAccount);
router.post('/delete', Cmanageaccount.delAccount);
router.post('/getaccountupdate', Cmanageaccount.getAccountUpdate);
router.post('/update', Cmanageaccount.updateAccount);
router.get('/getaccount', Cmanageaccount.index);

module.exports = router