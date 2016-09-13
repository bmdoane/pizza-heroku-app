'use strict'

const { MongoClient: { connect } } = require('mongodb')

const MONGODB_URL = 'mongodb://localhost:27017/roadkillpizza'

// Declaring db globally
let db

module.exports.connect = () => connect(MONGODB_URL).then(_db => db = _db)
// Getter for a private variable
module.exports.db = () => db