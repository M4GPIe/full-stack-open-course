require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//expressapp and input middlwares
const app = express()

//used so that the backend server also gives the hmtl frontend of the application
app.use(express.static('dist'))

app.use(express.json())
app.use(cors())

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
app.use(morgan((tokens, req, res)=>{

    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req,res,tokens.method(req,res))
    ].join(' ')
  }))

//get requests

app.get('/api/persons', (request,response)=>{
    Person.find({})
        .then(persons=>response.json(persons))
        .catch(error=>next(error))
})

app.get('/api/persons/:id', (request,response)=>{
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

app.post('/api/persons', (request,response)=>{
    let body = request.body

    //check if there's any name and number in the body
    if(!body.name||!body.number){
        return response.status(400).json({error: "content missing"})
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
app.put('/api/persons/:id', (request,response)=>{
    let body = request.body

    //check if there's any name and number in the body
    if(!body.name||!body.number){
        return response.status(400).json({error: "content missing"})
    }

    let person = {
        name : body.name,
        number : body.number
    }

    //to pass directly the updated object we added the {new:true} param
    Person.findByIdAndUpdate(request.params.id, person, {new:true})
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
app.delete('/api/persons/:id', (request,response)=>{
    Person.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end()) //return code 204 when no DB errors, even if there wasn't found any object
        .catch(error=>next(error))
})


//Error middlewares

//unknown endopoint
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//error handler middleware
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    //if the error is a malformed object id
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    
    //else use the default error handling from express
    next(error)
}

app.use(errorHandler)


//app listen from env variable or default 3001
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})