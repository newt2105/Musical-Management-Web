const express = require('express')
const router = express.Router()

const InstrumentsControllers = require('../controllers/instruments') 


router.get('/:instrumentId', InstrumentsControllers.show)


module.exports = router