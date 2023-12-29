const express = require('express')
const router = express.Router()

const siteControllers = require('../controllers/site') 

router.get('/post', siteControllers.index2)
router.get('/', siteControllers.getInstrument)
// router.get('/homepage', siteControllers.getInstrument2)

module.exports = router