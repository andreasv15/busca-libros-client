import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addLocalizacionService } from '../services/localizacion.services';

function AddLocalizacion() {

  const navigate = useNavigate();
  const [ lugar, setLugar ] = useState("");
  // const [ habitacion, setHabitacion ] = useState("");
  // const [ casa, setCasa ] = useState("");
  // const [ ciudad, setCiudad ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChangeLugar = (e) => setLugar(e.target.value);
  // const handleChangeHabitacion = (e) => setHabitacion(e.target.value);
  // const handleChangeCasa = (e) => setCasa(e.target.value);
  // const handleChangeCiudad = (e) => setCiudad(e.target.value);

  const handleAddLocalizacion = async (e) => {
    e.preventDefault();

    const localizacion = {
      lugar,
      // habitacion,
      // casa,
      // ciudad
  }

    try {

      await addLocalizacionService(localizacion);
      navigate("/localizaciones");

      
    } catch (error) {
      if (error.response.status === 400) {
          setErrorMessage(error.response.data.errorMessage)
      } else {
          navigate("/error")
      }
    }


  }

  return (
    <div className='divFormAddLocalizacion'>

      <br />

    <form className='formAddLocalizacion' onSubmit={handleAddLocalizacion}>  
      <h5> Introduce un nombre que sea lo más descriptivo posible. Por ejemplo: Estantería habitación María, Córdoba. </h5>
      <br />
        <div>
            {/* <label htmlFor='imagen'> Imagen: </label>
            <input type="file" className="imagen" onChange={handleImgChange} />
            <br /> */}


            <div className="form-floating mb-3">
              <input type="text" className="lugar form-control" id="floatingInput" placeholder="Escribe el nombre del lugar" onChange={handleChangeLugar} value={lugar} />
              <label htmlFor='lugar floatingInput'> Lugar </label>
            </div>

            {/* <label htmlFor='habitacion'> Habitación: </label>
            <input type="text" className="habitacion" placeholder="Escribe el nombre de la habitación" onChange={handleChangeHabitacion} value={habitacion} />
            <br />

            <label htmlFor='casa'> Casa: </label>
            <input type="text" className='casa' placeholder='Escribe el nombre de la casa' onChange={handleChangeCasa} value={casa} />
            <br />

            <label htmlFor='ciudad'> Ciudad: </label>
            <input type="text" className="ciudad" placeholder="Escribe el nombre de la ciudad" onChange={handleChangeCiudad} value={ciudad} />
            <br /> */}

        </div>

        {
          errorMessage !== null && <p className="alert alert-danger" role="alert"> {errorMessage} </p>
        }

        <Button variant="contained" type='submit'> Añadir </Button>
    </form>


    </div>
  )
}

export default AddLocalizacion