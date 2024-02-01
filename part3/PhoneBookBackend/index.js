const express = require('express')
const app = express()
app.use(express.json())

//hardcoded example db
let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

//get requests

app.get('/', (request,response)=>{
    response.send('<div><h1>PhoneBook DB</h1><p>Endpoints: "/api/persons"</p></div>')
})

app.get('/api/persons', (request,response)=>{
    response.json(persons)
})

app.get('/api/persons/:id', (request,response)=>{
    let id = Number(request.params.id)
    let person = persons.find(note => note.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})


//post requests

const generateId = ()=>{
    const maxId = persons.length > 0
      ? Math.max(...persons.map(p => p.id))
      : 0
    return maxId + 1
}

app.post('/api/persons', (request,response)=>{
    let body = request.body

    //check if there's any name and number in the body
    if(!body.name||!body.number){
        return response.status(400).json({error: "content missing"})
    }

    //name has to be unique
    if(persons.find(p=>p.name=body.name)){
        return response.status(400).json({error: "name has to be unique"})
    }

    //console.log(persons)

    let person = {
        "id" : generateId(),
        "name" : body.name,
        "number" : body.number
    }

    persons = persons.concat(person)
    //console.log(persons)

    response.json(person)
})

//update requests
app.put('/api/persons/:id', (request,response)=>{
    let body = request.body
    //check if there's any name and number in the body
    if(!body.name||!body.number){
        return response.status(400).json({error: "content missing"})
    }

    //name has to be unique
    if(persons.find(p=>p.name=body.name)){
        return response.status(400).json({error: "name has to be unique"})
    }

    //console.log(persons)
    let person = {
        "id" : Number(request.params.id),
        "name" : body.name,
        "number" : body.number
    }
    persons = persons.map(p=>p.id!==person.id ? p : person)
    //console.log(persons)
    response.json(person)
})

//delete requests
app.delete('/api/persons/:id', (request,response)=>{
    let id = Number(request.params.id)
    persons = persons.filter(p=>p.id!==id)
    //console.log(persons)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})