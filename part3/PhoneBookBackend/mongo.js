//example programm for adding sample persons to the phonebook DB (exercise 3.12)
const mongoose = require('mongoose')

//check if enough params
if(process.argv.length!=3&&process.argv.length!=5){
	console.log('Usage:\n Add a person to the DB - node mongo.js <DB_password> <person_name> <person_number>\n See persons in DB - node mongo.js <DB_password>')
	process.exit(1)
}

//connection params
const DB_name = 'phoneBookApp'
const DB_password = process.argv[2]

//connection string
const url = `mongodb+srv://fullstack:${DB_password}@cluster0.dq6k6c9.mongodb.net/${DB_name}?retryWrites=true&w=majority`

//conect to MongoDB Atlas
mongoose.set('strictQuery',false)
mongoose.connect(url)


//create app level schema
const personSchema = new mongoose.Schema({
	name : String,
	number : String
})

const Person = mongoose.model('Person', personSchema)


if(process.argv.length==3){//display 
	//print all persons in DB and close connection
	Person.find({}).then(response => {
		response.forEach(person => console.log(person))
		mongoose.connection.close()
	})
}else{
	//person atributes params
	const person_name = process.argv[3]
	const person_number = process.argv[4]

	//create new person object
	const person = new Person({
		name : person_name,
		number : person_number
	})

	//save new person
	person.save().then(response =>{
		console.log('Added: \n',response)
		mongoose.connection.close()
	})
}