
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middleware/is-Auth')


router.get('/create', isAuth, userController.getCreate);

router.post('/create', userController.postCreate);

// router.get('/instruments', userController.getInstruments);

// router.get('/edit/:instrumentId', isAuth, userController.getEdit);

// router.post('/edit', userController.postEdit);

// router.post('/delete', userController.postDelete);

module.exports = router;
