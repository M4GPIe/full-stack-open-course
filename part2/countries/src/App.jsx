import { useState, useEffect } from 'react'
import serviceObject from './services/countriesService'
import DisplayCountries from './components/DisplayCountries'
import SearchInput from './components/SearchInput'

function App() {
  //state hook elements
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  //countries shown by search
  const countriesShown = countries.filter(country => {
    //return true if the common name contains search
    return country.name.common.toLowerCase().includes(search.toLowerCase()) 
  })

  //fetching data from server
  useEffect(()=>{
    serviceObject.getCountries()
      .then(response=>{
        setCountries(response)
      })
      .catch(error=>{
        alert(`Something wrong happened :( \n ${error}`)
      })
  },[])

  //search form listener 
  const handleSearchChange = (event)=>{
    setSearch(event.target.value)
  }

  //expand country button onClick
  const handleExpandClick = (country)=>{
    return ()=>{setSearch(country)}
  }


  return (
    <>
      <h1>Country searcher</h1>
      <SearchInput value={search} onChange={handleSearchChange}/>
      <DisplayCountries countries={countriesShown} expandListener={handleExpandClick}/>
    </>
  )
}

export default App
