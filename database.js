'use strict'
// changes out mongodb for mongoose
const mongoose = require('mongoose')

const MONGODB_URL = 'mongodb://localhost:27017/roadkillpizza'

// Says use native node promise library (instead of mongoose promise)
mongoose.Promise = Promise

// Mongoose model
// Args - file, fields and datatypes
mongoose.model('Contact', {
	name: String,
	email: String,
	phone: String,
	message: String
})

module.exports.connect = () => mongoose.connect(MONGODB_URL)
