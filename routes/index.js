'use strict'

const { Router } = require('express')
const router = Router()
const Contact = require('../models/contact')
const Order = require('../models/order')
const Size = require('../models/size')
const Topping = require('../models/topping')

router.get('/', (req, res) =>
  res.render('index')
)


router.get('/about', (req, res) =>
  res.render('about', { page: 'About' })
)

router.get('/contact', (req, res) =>
  res.render('contact', { page: 'Contact' })
)

// If you use promises, catch the errors with error handling middleware
router.post('/contact', (req, res, error) => {
	//console.log(req.body)
	// const msg = new Contact(req.body)
	// msg.save()
 //  	.then(() => res.redirect('/'))
 //  	.catch(error)
 	Contact
 		.create(req.body)
 		.then(() => res.redirect('/'))
 		.catch(err)
})

router.get('/order', (req, res, err) =>
  Promise
    .all([
      Size.find().sort({ inches: 1 }),
      Topping.find().sort({ name: 1 })
    ])
    .then(([sizes, toppings]) =>
      res.render('order', {page: 'Order', sizes, toppings})
    )
    .catch(err)
)

router.post('/order', (req, res, err) => {
	//console.log(req.body)
  Order
    .create(req.body)
    .then(() => res.redirect('/'))
    .catch(err)
})

module.exports = router