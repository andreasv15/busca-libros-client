import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signupService } from '../../services/auth.services';

function Signup() {

  const navigate = useNavigate();
  const [ nombre, setNombre ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const user = {
      nombre,
      username,
      password
    }

    try {

      await signupService(user);
      navigate("/login");

    } catch (error) {
      
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage)
      } else {
        navigate("/error")
      }

    }
  }

  return (
    <div className='paginaSignUp'>

        <form className='formSignup border border-5 rounded-top' onSubmit={handleSignup}>
          <h1> Regístrate </h1>
          <div className="form-floating mb-3">
            <input type="text" className="nombre form-control" id="floatingInput" placeholder="Escribe tu nombre" onChange={handleNombre} />
            <label htmlFor='nombre floatingInput'> Nombre </label>
          </div>

          <div className="form-floating mb-3">
            <input type="text" className="username form-control" id="floatingInput" placeholder="Escribe tu nombre de usuario" onChange={handleUsername} />
            <label htmlFor='username floatingInput'> Nombre de usuario </label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className='password form-control' id="floatingInput" placeholder='Escribe tu contraseña' onChange={handlePassword} />
            <label htmlFor='password floatingInput'> Contraseña </label>
          </div>

          <button type='submit' className='btn btn-success'> Registrarse </button>
          <br />
          <br />

          {
            errorMessage !== null && <p className="alert alert-danger" role="alert"> {errorMessage} </p>
          }

          Inicia sesión <Link to="/login">aquí</Link>.

        </form>
    
    </div>
  )
}

export default Signup