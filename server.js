'use strict'

const express = require('express')
// For post method - middleware for forms to parse bodies into objects
const bodyParser = require('body-parser')

const app = express()

// || 3000 sets a default port
const port = process.env.PORT || 3000
app.set('port', port)

app.set('view engine', 'pug')

if (process.env.Node_ENV !== 'production') {
	app.locals.pretty = true	
}

app.locals.company = 'Road Kill Pizza'

// middlewares
app.use(express.static('public'))
// Listens for form data and renders req.body object
app.use(bodyParser.urlencoded({ extended: false }))

// routes
app.get('/', (req, res) => 
	res.render('index', { page: 'Home'})
)

app.get('/about', (req, res) => {
  res.render('about', { page: 'About'})
})	

app.get('/contact', (req, res) => {
  res.render('contact', { page: 'Contact'})
})

app.post('/contact', (req, res) => {
	console.log(req.body)
	res.redirect('/')
})	

// Listen to requests on the provided port and log when available
app.listen(port, () => {
	console.log(`Listening on port: ${port}`)
})