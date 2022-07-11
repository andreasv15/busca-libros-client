import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteLibroService, getDetalleLibroService } from '../services/libro.services';
import { getDetalleLocalizacionService } from '../services/localizacion.services';
import { SpinnerRoundOutlined } from "spinners-react";

function DetalleLibro() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ detalleLibro, setDetalleLibro ] = useState(null);
    const [ nomLugar, setNomLugar ] = useState("");
    const [ errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        getLibroDetails();
    }, [])


    const getLibroDetails = async () => {
        try {
            const response = await getDetalleLibroService(id);
            //console.log(response);
            if (response.data.errorMessage === undefined) {
                setDetalleLibro(response.data);
                const response2 = await getDetalleLocalizacionService(response.data.localizacion);
                //console.log("local", response2.data.lugar);
                setNomLugar(response2.data.lugar);
            } else {
                setErrorMessage(response.data.errorMessage);
            }
      
        } catch (error) {
            navigate("/error");
        }
    }

    const handleDelete = async () => {
        try {
            await deleteLibroService(id);
            navigate("/libros");
            
        } catch (error) {
            navigate("/error");
        }
    }


    if (detalleLibro === null) {
        return <SpinnerRoundOutlined />
    }
    
  return (
    <div>

        {
            errorMessage !== null && <p> {errorMessage} </p>
        }

        <h3> Detalles del libro </h3>

        <img src={detalleLibro.imagen} alt="img" width="300px" />
        <h4> Título: {detalleLibro.titulo} </h4>
        <p> Autor: {detalleLibro.autor}</p>
        <p> Sinopsis: {detalleLibro.sinopsis}</p>
        <p> Localización: {nomLugar}</p>

        <button onClick={handleDelete}> Borrar </button>
        <br />
        <Link to={`/libros/${id}/edit`}><button> Editar </button></Link>

    </div>
  )
}

export default DetalleLibro