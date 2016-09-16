'use strict'

const { connect, disconnect } = require('./database')

const Size = require('./models/size')
//const Topping = require('./models/topping')
const toppings = require('./topppings') //JSON option

connect()
  // This keeps from duplicating data
	.then(() => Size.remove({}))
	.then(() => 
		Size.insertMany([{
			name: 'Small',
			inches: 10,
		},{
			name: 'Medium',
			inches: 12,			
		},{
			name: 'Large',
			inches: 14,				
		},{
			name: 'Murica',
			inches: 50,
		}])
	)
	.then(() => Topping.remove({}))
	.then(() => Topping.insertMany(toppings)
	.then(disconnect)
	.catch(console.error)