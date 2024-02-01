//import express
const express = require('express')
//create a default express app
const app = express()
//allow use of the express json parser
/*
*the json-parser takes the JSON data of a request, 
*transforms it into a JavaScript object 
*and then attaches it to the body property of the request object
*/
app.use(express.json())

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        important: true
    },
    {
        id: 2,
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

//express authomatically sets response content types

//get operations
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
    //no need to specifically transform notes to JSON
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note) {//found
        response.json(note)
    } else {//not found
        response.status(404).end()
    }
})

//delete operations
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    //when success and fail
    response.status(204).end()
})

//post operations
const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    //check if the JSON object sent has not the content property
    if (!body.content) {
        return response.status(400).json({ 
        error: 'content missing' 
        })
    }

    //create the new note, if the note sent hasn't the important property the value false is set by default
    const note = {
        content: body.content,
        important: Boolean(body.important) || false,
        id: generateId(),
    }

    notes = notes.concat(note)

    response.json(note)
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})