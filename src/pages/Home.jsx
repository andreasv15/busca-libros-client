import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material';


function Home() {
  return (
    <div className='container home'>
      <div className='introduccionHome'>
        <h1 className='display-1'> Tu biblioteca casera </h1>

        <p className='display-6'>
          Muchas veces te has encontrado en situaciones donde no recordabas dónde dejaste guardado 
          un libro que necesitas en este preciso momento. Gracias a esta aplicación web podrás localizar dónde
          dejaste los libros, en qué casa, en qué habitación, en qué estantería, etc.

          Para utilizar esta aplicación primeramente necesitarás darte de alta y posteriormente iniciar sesión.

        </p>

        <div className='botonesHome'>

          <Link to="/login"> <Button variant="contained" className="btnsHome btn btn-primary"> Iniciar sesión </Button> </Link> <br />
          <Link to="/signup"> <Button variant="contained" className="btnsHome btn btn-primary"> Registrarse </Button> </Link>
        </div>
      </div>



    </div>
  )
}

export default Home