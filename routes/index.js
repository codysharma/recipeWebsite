const express = require('express')
const router = express.Router()

//input links from controllers pages 
const index = require('../controllers/indexController')

router.get('/', index)

module.exports = router