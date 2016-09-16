'use strict'
// changes out mongodb for mongoose
// The databse is available throughout the app
const mongoose = require('mongoose')

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/roadkillpizza'

// Says use native node promise library (instead of mongoose promise)
mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()
