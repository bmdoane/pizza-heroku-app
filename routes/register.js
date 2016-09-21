'use strict'

const { Router } = require('express')
const bcrypt = require('bcrypt')

const router = Router()

const User = require('../models/user')

router.get('/register', (req, res) =>
  res.render('register')
)

// Works - initial post code
// router.post('/register', (req, res, next) => {
//   bcrypt.hash(req.body.password, 10, (err, hash) => {
//     User 
//       .create({ email: req.body.email, password: hash })
//       .then(() => res.redirect('/'))
//       .catch(err => next(err))
//   })
// })

// Returns from form
router.post('/register', ({ body: { email, password, confirmation } }, res, err) => {
  if (password === confirmation) {
    User.findOne({ email })
      .then(user => {
        if (user) {
          res.render('register', { msg: 'Email is already registered' })
        } else {
          return new Promise((resolve, reject) => {
            // Fat arrow did not work here
            bcrypt.hash(password, 13, function(err, hash) {
              if (err) {
                reject(err)
              } else {
                resolve(hash)
              }
            })
          })
        }
      })
      .then(hash => User.create({ email, password: hash }))
      .then(() => res.redirect('/login'))
      .catch(err)
  } else {
    res.render('register', { msg: 'Password & password confirmation do not match' })
  }
})


module.exports = router