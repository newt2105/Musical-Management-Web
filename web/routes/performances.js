const express = require('express')
const router = express.Router()
const isAuth = require('../middleware/is-Auth')

const PerformanceControllers = require('../controllers/performance') 

router.get('/', PerformanceControllers.getPerformances);
router.get('/:performanceId', PerformanceControllers.show)


module.exports = router