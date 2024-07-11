const express = require('express')
const router = express.Router()

const AuthControllers = require('../controllers/auth') 

router.get('/', AuthControllers.getSignup )
router.post('/', AuthControllers.postSignup )


module.exports = router