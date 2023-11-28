const express = require('express')
const router = express.Router()

const siteControllers = require('../controllers/site') 

router.get('/search', siteControllers.index2)
router.get('/', siteControllers.getInstrument)

module.exports = router