import { useState } from 'react'
import DisplayPersons from './components/displayPersons'
import SearchInput from './components/searchInput'
import AddPersonForm from './components/AddPersonForm'

const App = () => {

  //state hook elements
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [search, setSearch] = useState('')

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
      alert(`${newName} is already on the phonebook`)
    }else if(persons.reduce((found,person)=>{return found||person.phone==newPhone},false)){
      alert('Phone already on the phonebook')
    }else if(newName==''||newPhone==''){
      alert('Please complete both person and phone number')
    }else{
      const personObject = {
        name: newName,
        phone: newPhone,
        id: persons.length + 1
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewPhone('')
    }
  }
  
  //displayed persons (filtered by search, case insensitive)
  const personsShown = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
  console.log(personsShown)

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchInput value={search} onChange={handleSearchChange}/>
      <h3>Add New Person</h3>
      <AddPersonForm onSubmit={addPerson} nameVal={newName} nameOnChange={handleNameChange} numberVal={newPhone} numberOnChange={handlePhoneChange}/>
      <h3>Numbers</h3>
      <DisplayPersons persons={personsShown}/>
    </div>
  )
}

export default App