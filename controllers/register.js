'use strict'

const bcrypt = require('bcrypt')
const User = require('../models/user')


module.exports.new = (req, res) =>
  res.render('register')

// Returns from form
module.exports.create = ({ body: { email, password, confirmation } }, res, err) => {
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
}