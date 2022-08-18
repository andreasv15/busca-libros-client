import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLocalizacionService, getDetalleLocalizacionService } from '../services/localizacion.services';
import { SpinnerRoundOutlined } from "spinners-react";
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';



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
            // console.log(response);
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
        <br />

        <h4> {detalleLocalizacion.lugar} </h4>
        <br />

        <div className='botonesLocalizacion'>
            <Button variant="contained" onClick={handleDelete} > Borrar </Button>
            <Link to={`/localizaciones/${id}/edit`}><Button variant="contained"> Editar </Button></Link>
        </div>
        
        <br />
        
        { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
        
        <br />

    </div>
  )
}

export default DetalleLocalizacion