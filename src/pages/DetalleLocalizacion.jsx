import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLocalizacionService, getDetalleLocalizacionService } from '../services/localizacion.services';

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
            console.log(response);
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
            await deleteLocalizacionService(id);
            navigate("/localizaciones");
            
        } catch (error) {
            navigate("/error");
        }
    }


    if (detalleLocalizacion === null) {
        return <h3> ... Loading </h3>
    }


  return (
    <div>
        {
            errorMessage !== null && <p> {errorMessage} </p>
        }

        <h3> Detalles de la localización </h3>

        <h4> Lugar: {detalleLocalizacion.lugar} </h4>

        <button onClick={handleDelete}> Borrar </button>
        <br />
        {/* <Link to={`/localizaciones/${id}/edit`}><button> Editar </button></Link> */}

    </div>
  )
}

export default DetalleLocalizacion