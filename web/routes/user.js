
const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middleware/is-Auth')


router.get('/create', isAuth, userController.getCreate);
router.post('/create', userController.postCreate);


module.exports = router;
