const express = require('express')
const router = express.Router()

const AuthControllers = require('../controllers/auth') 


router.post('/', AuthControllers.postLogout )


module.exports = router