const express = require('express')
const router = express.Router()

const AuthControllers = require('../controllers/auth') 

router.get('/', AuthControllers.getLogin )
router.post('/', AuthControllers.postLogin )


module.exports = router