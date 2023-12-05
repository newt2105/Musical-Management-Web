
const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();


router.get('/create', adminController.getCreate);

router.post('/create', adminController.postCreate);

router.get('/instruments', adminController.getInstruments);

router.get('/edit/:instrumentId', adminController.getEdit);

router.post('/edit', adminController.postEdit);

router.post('/delete', adminController.postDelete);

module.exports = router;
