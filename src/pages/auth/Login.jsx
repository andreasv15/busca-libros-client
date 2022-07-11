import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/auth.context'
import { loginService } from '../../services/auth.services';


function Login() {

  const { authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState(null);

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = {
      username,
      password
    }

    try {
      // Validamos usuario y password
      const response = await loginService(user);
      // console.log(response);

      // si es correcto, guardamos el token en localStorage.
      localStorage.setItem("authToken", response.data.authToken);
      authenticateUser(); // aqui esta la info del usuario (nombre, username, id)

      navigate("/perfil");

    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401 ) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error")
      }

    }

  };


  return (
    <div>
        <h1> Página de login </h1>

        <form onSubmit={handleLogin}>
            <div>
                <label htmlFor='username'> Nombre de usuario: </label>
                <input type="text" className="username" placeholder="Escribe tu nombre de usuario" value={username} onChange={handleUserChange} />
                <br />
                <label htmlFor='password'> Contraseña: </label>
                <input type="password" className='password' placeholder='Escribe tu contraseña' value={password} onChange={handlePassChange} />
            </div>

            <button type='submit'> Iniciar sesión </button>
            <br />
            <Link to="/signup"> <button> Crear nueva cuenta </button> </Link>

            {
              errorMessage !== null && <p> {errorMessage} </p>
            }

        </form>

    
    </div>
  )
}

export default Login