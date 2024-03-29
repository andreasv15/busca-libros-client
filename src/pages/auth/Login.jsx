import React, { useContext, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/auth.context'
import { loginService } from '../../services/auth.services';
import Alert from '@mui/material/Alert';
import { Button } from '@mui/material';


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

      navigate("/libros");

    } catch (error) {
      if (error.response.status === 400 || error.response.status === 401 ) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error")
      }

    }

  };


  return (
    <div className='paginaLogin'>

        <form className='formLogin border border-5 rounded-top' onSubmit={handleLogin}>
            <h1> Login </h1>

            <div className="form-floating mb-3">
                <input type="text" placeholder="Escribe tu nombre de usuario" className="username form-control" id="floatingInput1" value={username} onChange={handleUserChange} />
                <label htmlFor='username floatingInput1'> Usuario </label>
            </div>

            <div className="form-floating mb-3">
                <input type="password" className='password form-control' placeholder='Escribe tu contraseña' id="floatingInput2" value={password} onChange={handlePassChange} />
                <label htmlFor='password floatingInput2'> Contraseña </label>
            </div>
            <Button type='submit' variant="contained" color="success" className='btn btn-success'> Iniciar sesión </Button>
            <br />
            <br />

            { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }

            Si no tienes cuenta, puedes crearla haciendo click <Link to="/signup">aquí</Link>.

        </form>

    
    </div>
  )
}

export default Login