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
  Order
    .create(body)
    .then(() => res.redirect('/'))
    .catch(({ errors })  =>
      Promise.all([ // retrieve sizes and toppings again,
        Promise.resolve(errors), // but pass the errors along as well
        Size.find().sort({ inches: 1 }),
        Topping.find().sort({ name: 1 }),
      ])
    )
    .then(([
        errors,
        sizes,
        toppings,
      ]) =>
      // UI/UX additions
      // send errors to renderer to change styling and add error messages
      // also, send the req.body to use as initial form input values
      res.render('order', { page: 'Order', sizes, toppings, errors, body })
    )
    .catch(err)
})

router.get('/login', (req, res) =>
  res.render('login')
)

router.post('/login', (req, res) => {
  if(req.body.password === 'password') {
    res.redirect('/')
  } else {
    res.render('login', { error: `Email and password combination do not match`})
  }
})

router.get('/register', (req, res) =>
  res.render('register')
)

router.post('/register', (req, res) => {
  if(req.body.password === req.body.confirmation) {
    res.redirect('/')
  } else {
    res.render('register', { error: `Password and password combination do not match`})
  }
})

module.exports = router