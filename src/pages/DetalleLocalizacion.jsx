import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLocalizacionService, getDetalleLocalizacionService } from '../services/localizacion.services';
import { SpinnerRoundOutlined } from "spinners-react";

function DetalleLocalizacion() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [ detalleLocalizacion, setDetalleLocalizacion ] = useState(null);
    const [ errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getDetalleLocalizacion();
    }, []);

    const getDetalleLocalizacion = async () => {

        try {
            const response = await getDetalleLocalizacionService(id);
            //console.log(response);
            if (response.data.errorMessage === undefined) {
                setDetalleLocalizacion(response.data);
            } else {
                setErrorMessage(response.data.errorMessage);
            }

            
        } catch (error) {
            navigate("/error");
        }

    }

    const handleDelete = async () => {
        try {
            const response = await deleteLocalizacionService(id);
            //console.log(response);
            //navigate("/localizaciones");
            if (response.data.errorMessage === undefined) {
                navigate("/localizaciones");
            } else {
                setErrorMessage(response.data.errorMessage);
            }

        } catch (error) {
            navigate("/error");
        }
    }


    if (detalleLocalizacion === null) {
        return <SpinnerRoundOutlined />
    }


  return (
    <div className='divDetalleLocalizacion'>
        <h3> Detalles de la localización </h3>

        <h4> Lugar: {detalleLocalizacion.lugar} </h4>

        <button onClick={handleDelete} className="button-19-red"> Borrar </button>
        
        <Link to={`/localizaciones/${id}/edit`}><button className='button-19-green'> Editar </button></Link>
        
        <br />
        {
            errorMessage !== null && <p> {errorMessage} </p>
        }
        
        <br />

    </div>
  )
}

export default DetalleLocalizacion