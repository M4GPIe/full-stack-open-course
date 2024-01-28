const AddPersonForm = ({onSubmit, nameVal, nameOnChange, numberVal, numberOnChange})=>{
    return(
        <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameVal} onChange={nameOnChange}/>
        </div>
        <div>
          number: <input value={numberVal} onChange={numberOnChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default AddPersonForm