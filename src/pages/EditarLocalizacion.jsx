import { Button } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editarLocalizacionService, getDetalleLocalizacionService } from '../services/localizacion.services';

function EditarLocalizacion() {


    const navigate = useNavigate();
    const { id } = useParams();

    const [ lugar, setLugar ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    useEffect(() => {
        getDetallesLocaliz();
    }, [])

    const getDetallesLocaliz = async () => {
        try {
            const response = await getDetalleLocalizacionService(id);
            //console.log(response);
            setLugar(response.data.lugar);
            
        } catch (error) {
            navigate("/error");
        }
    }

    const handleChangeLugar = (e) => setLugar(e.target.value);

    const handleEditLocaliz = async (e) => {
        e.preventDefault();

        try {
            const localizActualizada = {
                lugar
            }

            await editarLocalizacionService(id, localizActualizada);
            navigate(`/localizaciones/${id}/details`)

            
        } catch (error) {
            navigate("/error");
        }
    }


  return (
    <div className='divEditarLocalizacion'>

        <form onSubmit={handleEditLocaliz} className='formEditarLocalizacion'>
    
            <h2> Cambiando nombre de localización </h2>
            <br />

            <div className="form-floating mb-3">
                <input type="text" className="lugar form-control" placeholder="Escribe el lugar" onChange={handleChangeLugar} value={lugar} />
            </div>

            { errorMessage !== null && <p className="alert alert-danger" role="alert"> {errorMessage} </p>}
            
            <div className='botonesLocalizacion'>
                <Button variant='contained' type='submit' > Guardar </Button>

                <Link to={`/localizaciones/${id}/details`}><Button variant='contained'> Cancelar </Button> </Link>
            </div>
        </form>

    </div>
  )
}

export default EditarLocalizacion