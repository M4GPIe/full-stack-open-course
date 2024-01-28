const DisplayPersons = ({persons})=>{
    return(
    <ul>
        {persons.map((person => <li key={person.id}>Name: {person.name}. Phone: {person.phone}</li>))}
    </ul>
    )
}

export default DisplayPersons