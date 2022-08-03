import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";

function SearchBar(props) {

    const [ search, setSearch ] = useState("");
  
    const handleSearch = (event) => {
        //console.log("en searchBar: ", event.target.value)
        setSearch( event.target.value ) // event.target.value => es lo que el usuario escribe
        props.searchListProp(event.target.value);
    }
  
  return (

    <form className="form-inline my-2 my-lg-0 formSearch">
      <input className="form-control mr-sm-2" type="search" placeholder="Escribe el nombre del libro" aria-label="Search" onChange={handleSearch} value={search} />
    </form>

)
}

export default SearchBar