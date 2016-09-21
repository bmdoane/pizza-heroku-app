'use strict'

const { Router } = require('express')

const router = Router()

const contact = require('./contact')
const login = require('./login')
const register = require('./register')
const home = require('./home')
const about = require('./about')
const logout = require('./logout')
const order = require('./order')


router.use(home)
router.use(about)
router.use(contact)
router.use(login)
router.use(register)

// login guard middleware - guard between public and private routes
router.use((req, res, next) => {
  if (req.session.email) {
    next()
  } else {
    res.redirect('/login')
  }
})

router.use(order)
router.use(logout)

module.exports = router