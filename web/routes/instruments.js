const express = require('express')
const router = express.Router()

const InstrumentsControllers = require('../controllers/instruments') 

// router.get('/', InstrumentsControllers.show)
router.get('/:instrumentId', InstrumentsControllers.show)


module.exports = router