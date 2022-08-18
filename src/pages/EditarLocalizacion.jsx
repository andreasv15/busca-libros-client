import { Button } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editarLocalizacionService, getDetalleLocalizacionService } from '../services/localizacion.services';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


function EditarLocalizacion() {


    const navigate = useNavigate();
    const { id } = useParams();

    const [ lugar, setLugar ] = useState("");
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
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }
    }


  return (
    <div className='divEditarLocalizacion'>

        <form onSubmit={handleEditLocaliz} className='formEditarLocalizacion'>
    
            <br />
            <br />

            {/* <div className="form-floating mb-3">
                <input type="text" className="lugar form-control" placeholder="Escribe el lugar" onChange={handleChangeLugar} value={lugar} />
            </div> */}

            <TextField onChange={handleChangeLugar} value={lugar} className='textfield' id="standard-basic" label="Título" variant="standard" />

            <br />
            <br />

            { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
            
            <div className='botonesLocalizacion'>
                <Button variant='contained' type='submit' > Guardar </Button>

                <Link to={`/localizaciones/${id}/details`}><Button variant='contained'> Cancelar </Button> </Link>
            </div>


        </form>

    </div>
  )
}

export default EditarLocalizacion