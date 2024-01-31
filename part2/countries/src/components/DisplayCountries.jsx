//expanded country display
const DisplaySingleCountry = ({country})=>{
    const languages = country.languages
    return(
        <div>
            <h2>{country.name.official}</h2>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area} sqr. Km</p>
            <h3>Languages</h3>
            <ul>
                {Object.keys(languages).map((k)=><li key={k}>{languages[k]}</li>)}
            </ul>
            <img src={country.flags.png}/>
        </div>
    )
}

//display list of countries matched
const DisplayCountries = ({countries, expandListener})=>{

    //conditional rendering
    if(countries.length==0){
        return(null)
    }else if(countries.length==1){
        return(<DisplaySingleCountry country={countries[0]}/>)
    }else if(countries.length>10){
        return(
            <div>
                Too many matches, specify more filters
            </div>
        )
    }else{
        return(
            <ul>
                {countries.map(country => 
                    <li key={country.name.official}>
                        {country.name.common} <button onClick={expandListener(country.name.common)}>Show</button>
                    </li>)}
            </ul>
        )
    }
}

export default DisplayCountries