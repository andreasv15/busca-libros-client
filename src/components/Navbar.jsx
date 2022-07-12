import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { verifyService } from '../services/auth.services';

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
        <nav className="navbar navbar-expand-lg bg-light" >
          <div className="container-fluid">
            <Link className="navbar-brand" to="#">Menu</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/libros">Mis libros</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/libros/add-libro">Añadir libro</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/localizaciones">Mis localizaciones</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/localizaciones/add-localizacion">Añadir localización</Link>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Hola, .....
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/perfil">Mi perfil</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout} >Cerrar sesión </button></li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
          </div>

          {/* <div className="">
            <NavLink className="" to="/libros/add-libro">Añadir libro</NavLink>
            <NavLink className="" to="/libros">Mis libros</NavLink>

            <NavLink className="" to="/localizaciones/add-localizacion">Añadir localización</NavLink>
            <NavLink className="" to="/localizaciones">Mis localizaciones</NavLink>

            <NavLink className="" to="/perfil">Mi perfil</NavLink>

            <button onClick={handleLogout} className="btn btn-danger"> Cerrar sesión </button>
          </div> */}
        </nav>
      )
    }
    
    </div>
  )
}

export default Navbar