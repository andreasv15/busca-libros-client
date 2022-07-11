import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function Navbar() {

  const { isLoggedIn, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    authenticateUser();
    navigate("/");
  }


  return (
    <div>
    {
      (isLoggedIn === true) && (
        <nav className="navbar" style={{backgroundColor: "yellow"}}>
          <div className="">
            <NavLink className="" to="/libros/add-libro">Añadir libro</NavLink>
            <NavLink className="" to="/libros">Mis libros</NavLink>

            <NavLink className="" to="/localizaciones/add-localizacion">Añadir localización</NavLink>
            <NavLink className="" to="/localizaciones">Mis localizaciones</NavLink>

            <NavLink className="" to="/perfil">Mi perfil</NavLink>

            <button onClick={handleLogout} className="btn btn-danger"> Cerrar sesión </button>
          </div>
        </nav>
      )
    }
    
    </div>
  )
}

export default Navbar