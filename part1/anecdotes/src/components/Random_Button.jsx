const Random_Button = (props)=>{
    const {handleClick} = props
    return(
      <button onClick={handleClick}>Show Random Anecdote</button>
    )
}

export default Random_Button