
const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();
const isAuth = require('../middleware/is-Auth')


router.get('/create', isAuth, adminController.getCreate);

router.post('/create', adminController.postCreate);

router.get('/instruments', adminController.getInstruments);

router.get('/edit/:instrumentId', isAuth, adminController.getEdit);

router.post('/edit', adminController.postEdit);

router.post('/delete', adminController.postDelete);


router.get('/pending-instruments', isAuth, adminController.getPendingInstruments);

router.post('/approve/:instrumentId', isAuth, adminController.approveInstrument);


router.post('/reject/:instrumentId', isAuth, adminController.rejectInstrument);

module.exports = router;
