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
    <div>
        <h2> Tus localizaciones </h2>
        { errorMessage !== null && <p> {errorMessage} </p> }

        {
          listaLocalizaciones !== null && (
            listaLocalizaciones.map( (eachLocalizacion) => {
              return (
                <div>
                  <Link to={`/localizaciones/${eachLocalizacion._id}/details`}><h3> {eachLocalizacion.lugar} </h3> </Link>
                </div>
              )
            })
          )
        }

    
    </div>
  )
}

export default Localizaciones