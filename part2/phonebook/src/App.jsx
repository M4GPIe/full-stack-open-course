import { useState, useEffect } from 'react'
import phoneBookService from './services/dbService'
import DisplayPersons from './components/displayPersons'
import SearchInput from './components/searchInput'
import AddPersonForm from './components/AddPersonForm'

const App = () => {

  //state hook elements
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

  //fething data from local server with useEffect hook, activated after every finished render
  useEffect(() => {
    phoneBookService.getAll()
      //manage returned promise's fulfilled updating persons
      .then(persons=>setPersons(persons))
      //display alert dialog if rejected
      .catch(error=>alert(`could not find server, please check url\nerror: ${error}`))
  }, [])

  //input event handlers
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event)=>{
    setNewPhone(event.target.value)
  }

  const handleSearchChange = (event)=>{
    setSearch(event.target.value)
  }

  //form submit handler
  const addPerson = (event) => {
    event.preventDefault()
    if(persons.reduce((found,person)=>{return found||person.name==newName},false)){
      //update an existing person's phone, make sure a new phone was typed
      let personId = persons.find(person=>person.name===newName).id
      updatePerson(personId)
    }else if(persons.reduce((found,person)=>{return found||person.number==newPhone},false)){
      alert('Phone already on the phonebook')
    }else if(newName===''||newPhone===''){
      alert('Please complete both person and phone number')
    }else{
      //person's id is asigned by the server
      const personObject = {
        name: newName,
        number: newPhone
      }
      phoneBookService.create(personObject)
        //service responds with the stored new person object
        .then(newPerson =>{
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewPhone('')
        })
        .catch(error=>alert(`Something wrong happened :(\nerror:${error}`))
    }
  }

  //update person function
  const updatePerson = (personId)=>{
    //check if there's any number typed and if the number doesn't already exists in phonebook
    if(newPhone!==''&&!persons.reduce((found,person)=>{return found||person.number==newPhone},false)){
      //find current person's object
      const oldPerson = persons.find(person=>person.id===personId)
      //show confirmation dialog
      if(confirm(`Do you wanna update ${oldPerson.name}'s number?`)){
        //create updated person's object
        const updatedPerson = {...oldPerson, number: newPhone}
        //update in the server
        phoneBookService.update(personId,updatedPerson)
          .then(response=>{
            //update local persons list
            setPersons(persons.map(person=> person.id === personId ? updatedPerson : person))
          })
          .catch(error=>`Person could not be found in server\nerror:${error}`)
      }
    }else if(newPhone===''){
      alert('Please complete both person and phone number')
    }else{
      alert('Phone already on the phonebook')
    }
  }

  //delete person's button onClickHandler
  const deletePerson = (personId)=>{
    return ()=>{
      //show confirmation dialog
      if(confirm('Are you sure you want to delete this person?')){
        phoneBookService.remove(personId)
          //update local person list when deleted
          .then(response =>{
            setPersons(persons.filter(person => person.id!=personId))
          })
          .catch(error=>`Person not found in server\nerror:${error}`)
      }
    }
  }
  
  //displayed persons (filtered by search, case insensitive)
  const personsShown = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchInput value={search} onChange={handleSearchChange}/>
      <h3>Add New Person</h3>
      <AddPersonForm onSubmit={addPerson} nameVal={newName} nameOnChange={handleNameChange} numberVal={newPhone} numberOnChange={handlePhoneChange}/>
      <h3>Numbers</h3>
      <DisplayPersons persons={personsShown} deletePerson={deletePerson}/>
    </div>
  )
}

export default App