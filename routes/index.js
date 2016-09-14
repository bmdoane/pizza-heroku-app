'use strict'

const { Router } = require('express')
const router = Router()

const { db } = require('../database')

router.get('/', (req, res) =>
  res.render('index')
)

router.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

const mongoose = require('mongoose')
// Convention to capitalize
const Contact = mongoose.model('Contact')
// If you use promises, catch the errors

router.post('/contact', (req, res) => {
	//console.log(req.body)
	const msg = new Contact(req.body)
	msg.save()
  	.then(() => res.redirect('/'))
  	.catch(() => res.send('BAD'))
})

module.exports = router