import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { getAllLibrosService } from '../services/libro.services';

function Libros() {
    const navigate = useNavigate();
    const [ listaLibros, setListaLibros ] = useState([]); //* todos los libros
    const [ filteredLibros, setFilteredLibros ] = useState([]);
    // const [ filteredLibros, setFilteredLibros ] = useState(listaLibros); // elementos filtrados, segun lo que se busque en el campo de busqueda
    const [ errorMessage, setErrorMessage ] = useState(null);

  //   const searchList = (search) => {
  //     //console.log("buscando: ", search)
  //     // solo mostrar los elementos que concuerden con el argumento search

  //     const filteredArr = listaLibros.filter((eachBook) => {
  //         //console.log(eachBook);
  //         return eachBook.titulo.toUpperCase().includes(search.toUpperCase())
  //     })

  //     setFilteredLibros(filteredArr);

  // }


    useEffect(() => {
        getLibros();
    }, [])

    const getLibros = async () => {
      try {
        
        const response = await getAllLibrosService();
        // console.log(response.data);
        // setLibros(response.data);
  
        if (response.data.errorMessage === undefined) {
          setListaLibros(response.data);
          setFilteredLibros(response.data);
        } else {
          setErrorMessage(response.data.errorMessage);
        }
        
      } catch (error) {
          navigate("/error")
      }
  
    }
  

    const searchList = (search) => {
      //console.log("en libros.jsx: ", search);
      // mostramos los elementos que concuerden con el search
      
      const filteredArr = listaLibros.filter( (eachLibro) => {
        return eachLibro.titulo.toUpperCase().includes(search.toUpperCase());
      } )

      // console.log("filteredArr: ", filteredArr); 
      setFilteredLibros(filteredArr);


    }


  return (
    <div className='listaLibros d-flex'>

      
      {/* <SearchBar /> */}

      <SearchBar searchListProp={searchList} /> 

        { errorMessage !== null && <p> {errorMessage} </p> }



        {
          filteredLibros !== null && (
            filteredLibros.map( (eachLibro) => {
              return (
                <div className='cadaLibro d-flex'>
                  <img src={eachLibro.imagen} alt="img" className='card-img-top imgLibro' />

                  <div className='infoLibro'>
                    <h3 className='card-title'> {eachLibro.titulo} </h3> 
                    <p className='card-subtitle mb-2 text-muted'> {eachLibro.autor} </p>
                    <p class="card-text"> {eachLibro.sinopsis} </p>
                    <Link to={`/libros/${eachLibro._id}/details`}> <p> Ver más </p> </Link> 
                  </div>

                </div>
              )
            })
          )
        }
    
    </div>
  )
}

export default Libros