'use strict'

const mongoose = require('mongoose')

module.exports = mongoose.model('Order', {
	name: { type: String, required: true},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	phone: { type: String, required: true},
	size: { type: Number, required: true},
	toppings: { type: [String], default: ['Cheese'] },
})