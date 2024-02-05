const morgan = require('morgan')


/*
*for exercise 3.8 I made a console log of the post method's content
*this is only with learning purposes since any sensitive information
*of the db should be logged
*/
morgan.token('body', function (req, res, method) { 
	if(method=='POST'){
		return JSON.stringify(req.body)
	}else{
		return ''
	}
})

//custom logger middleware
const requestLogger = morgan((tokens, req, res)=>{

	return [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms',
		tokens.body(req,res,tokens.method(req,res))
	].join(' ')
})


//Error middlewares

//unknown endopoint
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

//error handler middleware
const errorHandler = (error, request, response, next) => {
	console.error(error.message)

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