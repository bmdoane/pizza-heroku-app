'use strict'

const Contact = require('../models/contact')

module.exports.new = (req, res) => 
	res.render

// If you use promises, catch the errors with error handling middleware
module.exports.create = (req, res, err) =>
 	Contact
 		.create(req.body)
 		.then(() => res.redirect('/'))
 		.catch(err)	