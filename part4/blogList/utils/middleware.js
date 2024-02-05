const morgan = require('morgan')
const logger = require('./logger')

//morgan logger
const requestLogger = morgan('common')

//unknown endopoint
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

//error handler middleware
const errorHandler = (error, request, response, next) => {
	logger.error(error.message)

	//the return param avoids running the express default error handling after managing the identified errors
	if (error.name === 'CastError') {//error is caused by a malformed object id
		return response.status(400).json({ error: 'malformatted id' })
	}else if(error.name === 'ValidationError'){//validation errors sent by DB
		return response.status(400).json({error: error.message})
	}
    
	//use the default error handling from express for other errors
	next(error)
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}