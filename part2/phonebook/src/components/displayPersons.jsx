const DeleteButton = ({onClickHandle})=>{
    return(
        <button onClick={onClickHandle}>Delete</button>
    )
}

const DisplayPersons = ({persons,deletePerson})=>{
    return(
    <ul>
        {persons.map((person => 
            <li key={person.id}>
                Name: {person.name}. Phone: {person.number} <DeleteButton onClickHandle={deletePerson(person.id,person.name)}/>
            </li>))}
    </ul>
    )
}

export default DisplayPersons