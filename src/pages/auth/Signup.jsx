import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
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
    <div>
        <h1> Página de registro </h1>

        <form onSubmit={handleSignup}>
            <div>
                <label htmlFor='nombre'> Nombre: </label>
                <input type="text" className="nombre" placeholder="Escribe tu nombre" onChange={handleNombre} />
                <br />
                <label htmlFor='username'> Nombre de usuario: </label>
                <input type="text" className="username" placeholder="Escribe tu nombre de usuario" onChange={handleUsername} />
                <br />
                <label htmlFor='password'> Contraseña: </label>
                <input type="password" className='password' placeholder='Escribe tu contraseña' onChange={handlePassword} />
            </div>

            <button type='submit'> Registrarse </button>

            {
              errorMessage !== null && <p> {errorMessage} </p>
            }

        </form>
    
    </div>
  )
}

export default Signup