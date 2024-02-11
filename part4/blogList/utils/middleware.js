const morgan = require('morgan')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

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
	}else if(error.name === 'JsonWebTokenError'){//invalid token decoding
		return response.status(401).json({ error: 'token invalid' })
	}
    
	//use the default error handling from express for other errors
	next(error)
}

//extract token from header middleware
const tokenExtractor = (request,response,next)=>{
    //authorization header
    const authorization = request.get('authorization')

    if(authorization&&authorization.startsWith('Bearer')){
		//quit the Bearer tag, decode the token
		const decodedToken = jwt.verify(authorization.replace('Bearer ', ''),process.env.SECRET)
		
		if (!(decodedToken && decodedToken.id)) {//check if the token has been decoded correctly
			return response.status(401).json({ error: 'token invalid' })
		}

		request.user = decodedToken.userName 

    }else{//no token given, for example in get requests
		request.user = null
    }

	next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
	tokenExtractor
}