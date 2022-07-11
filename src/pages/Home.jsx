import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
    
        <h2> --- Explicacion del proyecto --- </h2>

        <Link to="/login"> <button> Login </button> </Link> <br />
        <Link to="/signup"> <button> Crear nueva cuenta </button> </Link>

    </div>
  )
}

export default Home