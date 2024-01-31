const SearchInput = ({value,onChange})=>{
    return(
        <div>
            Search country: <input value={value} onChange={onChange}/>
        </div>
    )
}
export default SearchInput