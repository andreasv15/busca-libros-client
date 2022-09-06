import { Button } from '@mui/material';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addLocalizacionService } from '../services/localizacion.services';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';


function AddLocalizacion() {

  const navigate = useNavigate();
  const [ lugar, setLugar ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleChangeLugar = (e) => setLugar(e.target.value);

  const handleAddLocalizacion = async (e) => {
    e.preventDefault();

    const localizacion = {
      lugar,
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

            <TextField onChange={handleChangeLugar} value={lugar} className='textfield' id="standard-basic" label="Localización" variant="standard" />

            <br />
            <br />

        </div>

        { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
          
          <br />

        <Button variant="contained" type='submit'> Añadir </Button>
    </form>


    </div>
  )
}

export default AddLocalizacion