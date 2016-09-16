'use strict'

const express = require('express')
// For post method - middleware for forms to parse bodies into objects
const bodyParser = require('body-parser')
const chalk = require('chalk')
const routes = require('./routes/') // same as ./routes/index.js
const { connect } = require('./db/database')

//const MONGODB_URL = 'mongodb://localhost:27017/roadkillpizza'

// Initialize
const app = express()

// Configure
// || 3000 sets a default port
const port = process.env.PORT || 3000
app.set('port', port)

app.set('view engine', 'pug')

if (process.env.Node_ENV !== 'production') {
	app.locals.pretty = true	
}

app.locals.company = 'Road Kill Pizza'
app.locals.errors = {} // errors & body added to avoid guard statements
app.locals.body = {} // i.e. value=(body && body.name) vs. value=body.name

// middlewares
// User agents - using methods on req object
app.use((req, res, next) => {
	//console.log(req)
	console.log("REQUEST:", `[${new Date()}]`, chalk.cyan(`${req.method} ${req.url}`), req.headers['user-agent'])
	next()
})

app.use(express.static('public'))
// Listens for form data and renders req.body object
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.use(routes)

// 404 catch and forward to error handler
app.use((req, res) => {
	res.render('404')
})

app.use((err, req, res, next) => {
	//console.log(res)
	res.sendStatus(err.status || 500)
	console.log("REQUEST:", `[${new Date()}]`, chalk.red(`${req.method} ${req.url}`), req.headers['user-agent'])
})


// Listen to requests on the provided port and log when available
connect()
	.then(() => {
		app.listen(port, () =>
			console.log(`Listening on port: ${port}`)
		)
	})
	.catch(console.error)