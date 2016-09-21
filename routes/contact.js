'use strict'

const { Router } = require('express')
const router = Router()

const Contact = require('../models/contact')


router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

// If you use promises, catch the errors with error handling middleware
router.post('/contact', (req, res, error) => {
 	Contact
 		.create(req.body)
 		.then(() => res.redirect('/'))
 		.catch(err)
})

module.exports = router