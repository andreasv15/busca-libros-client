import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import SearchBar from '../components/SearchBar';
import { getAllLibrosService } from '../services/libro.services';
import Alert from '@mui/material/Alert';


function Libros() {
    const navigate = useNavigate();
    const [ listaLibros, setListaLibros ] = useState([]); //* todos los libros
    const [ filteredLibros, setFilteredLibros ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(null);


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
      // mostramos los elementos que concuerden con el search
      
      const filteredArr = listaLibros.filter( (eachLibro) => {
        return eachLibro.titulo.toUpperCase().includes(search.toUpperCase());
      } )

      setFilteredLibros(filteredArr);

    }

  return (
    <div className='listaLibros d-flex'>

      
      {/* <SearchBar /> */}

      <SearchBar searchListProp={searchList} /> 
      <br />

        { errorMessage !== null && <Alert className='alert alert-danger alertError' severity="error"> { errorMessage } Agrega <Link to={`/libros/add-libro/`}>uno</Link>. </Alert> }


        {
          filteredLibros !== null && (
            filteredLibros.map( (eachLibro) => {
              return (
                <div key={eachLibro._id} className='cadaLibro d-flex'>
                  
                  <img src={eachLibro.imagen} alt="img" className='card-img-top imgLibro cadaLibroImg' />

                  <div className='infoLibro'>
                    <h3 className='card-title cadaLibroTitulo'> {eachLibro.titulo} </h3> 
                    <p className='card-subtitle mb-2 text-muted cadaLibroAutor'> {eachLibro.autor} </p>
                    <p className="card-text cadaLibroSinopsis"> {eachLibro.sinopsis} </p>
                    <Link className='cadaLibroLink' to={`/libros/${eachLibro._id}/details`}> <p> Ver más </p> </Link> 
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