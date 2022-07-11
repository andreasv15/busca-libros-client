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
    <div>
        <h1> Editando detalles de la localización </h1>
        <form onSubmit={handleEditLocaliz}>
            <div>

                <label htmlFor='lugar'> Lugar: </label>
                <input type="text" className="lugar" placeholder="Escribe el lugar" onChange={handleChangeLugar} value={lugar} />
                <br />

            </div>
            { errorMessage !== null && <p> {errorMessage} </p>}
            
            <button type='submit'> Guardar </button>

            <Link to={`/libros/${id}/details`}><button> Cancelar </button> </Link>
        </form>

    </div>
  )
}

export default EditarLocalizacion