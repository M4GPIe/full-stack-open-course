const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger')
const personsRouter = require('./controllers/persons')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const app = express()       //express app


//connection to DB
mongoose.set('strictQuery',false)

//take the URI from .env
const DB_URI = config.MONGODB_URI
logger.info(DB_URI)

//connecto to DB with mongoose and URI
mongoose.connect(DB_URI)
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch((error) => {
		console.log('error connecting to MongoDB:', error.message)
	})



//middlewares

app.use(cors())     //cross operating resource sharing allowed (make object request to different uri's than the html's origin)
app.use(express.static('dist'))     //used so that the backend server also gives the hmtl frontend of the application
app.use(express.json())     //express json parser 
app.use(middleware.requestLogger)   //custom logging middleware from utils/middleware

app.use('/api/persons',personsRouter)      //router containing all controllers (aka route handlers) and api's uri

app.use(middleware.unknownEndpoint)     //unknown endpoint custom handler from utils/middleware
app.use(middleware.errorHandler)        //custon error handler from utils/middleware


module.exports = app        //export the app so that the index.js file can use it to run the server