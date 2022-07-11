import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { getAllLibrosService } from '../services/libro.services';

function Libros() {
    const navigate = useNavigate();
    const [ listaLibros, setListaLibros ] = useState([]);
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
        } else {
          setErrorMessage(response.data.errorMessage);
        }
        
      } catch (error) {
          navigate("/error")
      }
  
    }
  

  return (
    <div>
        <h2> Tus libros </h2>
        { errorMessage !== null && <p> {errorMessage} </p> }

        {
          listaLibros !== null && (
            listaLibros.map( (eachLibro) => {
              return (
                <div>
                  <Link to={`/libros/${eachLibro._id}/details`}> <h3> {eachLibro.titulo} </h3> </Link>
                </div>
              )
            })
          )
        }
    
    </div>
  )
}

export default Libros