const SearchInput = ({value,onChange})=>{
    return(
        <div>
          Search Person: <input value={value} onChange={onChange}/>
        </div>
    )
}

export default SearchInput