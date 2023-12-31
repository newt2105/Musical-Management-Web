const express = require('express')
const router = express.Router()

const PerformanceControllers = require('../controllers/performance') 


router.get('/:performanceId', PerformanceControllers.show)


module.exports = router