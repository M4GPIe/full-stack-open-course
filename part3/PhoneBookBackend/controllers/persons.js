//controllers will be stored in a express.router object to be consumed by the app
const notesRouter = require('express').Router()
const Person = require('../models/person')

//get requests

notesRouter.get('/', (request,response)=>{
	Person.find({})
		.then(persons=>response.json(persons))
		.catch(error=>next(error))
})

notesRouter.get('/:id', (request,response)=>{
	Person.findById(request.params.id)
		.then(person => {
			if(person){//person found in DB
				response.json(person)
			}else{//person not found ->404
				response.status(404).end()
			}
		})
	//error fetching from DB
		.catch(error=>next(error))
})


//post requests

notesRouter.post('/', (request,response)=>{
	let body = request.body

	//check if there's any name and number in the body
	if(!body.name||!body.number){
		return response.status(400).json({error: 'content missing'})
	}

	let person = new Person({
		name : body.name,
		number : body.number
	})

	person.save()
		.then(savedPerson=>response.send(savedPerson))
		.catch(error=>next(error))
})

//update requests
notesRouter.put('/:id', (request,response)=>{
	let body = request.body

	//check if there's any name and number in the body
	if(!body.name||!body.number){
		return response.status(400).json({error: 'content missing'})
	}

	let person = {
		name : body.name,
		number : body.number
	}

	//to pass directly the updated object we added the {new:true} config param
	//also we added run validators in queries since they are disabled by default on updates
	Person.findByIdAndUpdate(request.params.id, person, {new:true, runValidators : true, context : 'query'})
		.then(personUpdated => {
			if(personUpdated){
				response.json(personUpdated)
			}else{
				response.status(404).end()
			}
		})
		.catch(error=>next(error))
})

//delete requests
notesRouter.delete('/:id', (request,response)=>{
	Person.findByIdAndDelete(request.params.id)
		.then(() => response.status(204).end()) //return code 204 when no DB errors, even if there wasn't found any object
		.catch(error=>next(error))
})

module.exports = notesRouter