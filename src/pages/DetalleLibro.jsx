import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteLibroService, getDetalleLibroService } from '../services/libro.services';
import { getDetalleLocalizacionService } from '../services/localizacion.services';
import { SpinnerRoundOutlined } from "spinners-react";
import Button from '@mui/material/Button';


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
    <div className='divDetallesLibro'>

        {
            errorMessage !== null && <p> {errorMessage} </p>
        }
        <div className='infoLibro'>
        
            <img src={detalleLibro.imagen} alt="img" width="300px" />

            <h4 className='card-title'> {detalleLibro.titulo} </h4>
            <p className='card-subtitle mb-2 text-muted'> Autor: {detalleLibro.autor}</p>
            <p className='card-text'> {detalleLibro.sinopsis}</p>
            <p> <strong> ¿Dónde está? </strong> {nomLugar} </p>

            <div className='botonesLocalizacion'>
                <Button variant="contained" onClick={handleDelete}>Borrar</Button>
                <Link to={`/libros/${id}/edit`}><Button variant="contained"> Editar </Button></Link>
            </div>
        </div>


    </div>
  )
}

export default DetalleLibro