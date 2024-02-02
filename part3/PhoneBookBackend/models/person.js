const mongoose = require('mongoose')
require('dotenv').config({ path: '../.env' })

mongoose.set('strictQuery',false)

//take the URI from .env
const DB_URI = process.env.MONGODB_URI

//connecto to DB with mongoose and URI
mongoose.connect(DB_URI)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

//person schema
const personSchema = new mongoose.Schema({
    name : String,
    number : String
})

//define a custom toJSON so that it converts object _id to string and ignores __v param of the objects
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

//export the Person model created by adding the schema to mongoose
module.exports = mongoose.model('Person', personSchema)

