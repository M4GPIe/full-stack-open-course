require('dotenv').config()
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

//avoid logging middleware when running tests
if(process.env.NODE_ENV !=='test') app.use(middleware.requestLogger)

//blogs route handling, use the token extractor to check authorization
app.use('/api/blogs',middleware.tokenExtractor,blogsRouter)

//users route handling
app.use('/api/users',usersRouter)

//login route handler
app.use('/api/login',loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app