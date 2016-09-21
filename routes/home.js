'use strict'

const { Router } = require('express')

const router = Router()

const { index } = require('../controllers/home')

// Home route triggers home controller 
router.get('/', index)

module.exports = router