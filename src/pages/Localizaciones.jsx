import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllLocalizacionesService } from '../services/localizacion.services';

function Localizaciones() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [ listaLocalizaciones, setListaLocalizaciones ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState(null);


  useEffect(() => {
    getLocalizaciones();

  }, [])


  const getLocalizaciones = async () => {

    try {
      const response = await getAllLocalizacionesService();
      // console.log("ubicaciones service: ", response.data);

      if (response.data.errorMessage === undefined) {
        setListaLocalizaciones(response.data);
      } else {
        setErrorMessage(response.data.errorMessage);
      }

      
    } catch (error) {
        navigate("/error")
    }

  }

  return (
    <div className='divLocalizaciones d-flex'>
    
      <br />
    
      {
        errorMessage !== null && listaLocalizaciones !== null ? 
        <Alert className='alert alert-danger alertError' severity="error"> { errorMessage } </Alert>
        
         : 
         listaLocalizaciones.map( (eachLocalizacion) => {
              return (
                <div>
                  <h5> Puede editar la localización deseada pulsando sobre ella. </h5>
                  <br />

                  <div className='cadaLocalizacion'>
                    <Link to={`/localizaciones/${eachLocalizacion._id}/details`}> <h3> ➤ {eachLocalizacion.lugar} </h3> </Link>
                    <hr />
                  </div>
                </div>

              )
            })

      }
      <p> Haz click <Link to={"/localizaciones/add-localizacion"}>aquí</Link> si quiere añadir una nueva localización. </p>
      <br />
      <br />
      {/* <h5> Puede editar la localización deseada pulsando sobre ella. </h5>
      <br />

        {/* { errorMessage !== null && <p> {errorMessage} </p> } */}

        {/* {
          listaLocalizaciones !== null && (
            listaLocalizaciones.map( (eachLocalizacion) => {
              return (
                <div className='cadaLocalizacion'>
                  <Link to={`/localizaciones/${eachLocalizacion._id}/details`}> <h3> ➤ {eachLocalizacion.lugar} </h3> </Link>
                  <hr />
                </div>

              )
            })
          )
        }

        <p> Haz click <Link to={"/localizaciones/add-localizacion"}>aquí</Link> si quiere añadir una nueva localización. </p> */}

    </div>
  )
}

export default Localizaciones