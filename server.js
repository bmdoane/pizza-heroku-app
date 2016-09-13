'use strict'

const express = require('express')
// For post method - middleware for forms to parse bodies into objects
const bodyParser = require('body-parser')
const chalk = require('chalk')
const routes = require('./routes/') // same as ./routes/index.js
const { connect } = require('./database')

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
// app.get('/', (req, res) => {
// 	// const x = 'y'
// 	// x = 'z' 
// 	res.render('index', { page: 'Home'})
// })

// app.get('/about', (req, res) => {
//   res.render('about', { page: 'About'})
// })	

// app.get('/contact', (req, res) => {
//   res.render('contact', { page: 'Contact'})
// })

// app.post('/contact', (req, res) => {
// 	console.log(req.body)
// 	res.redirect('/')
// })

// Not needed
// app.get('/404', (req, res) => {
// 	res.render('404')
// })

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