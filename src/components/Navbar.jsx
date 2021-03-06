
import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { IoLibrarySharp } from "react-icons/io5";
import { MdAddLocationAlt } from "react-icons/md"; 
import { FaBookMedical, FaUserCog } from "react-icons/fa";
import { ImLocation } from "react-icons/im"


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
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 barraNav">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/libros"> <IoLibrarySharp size={30} /> </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/libros/add-libro"><FaBookMedical size={30} /></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/localizaciones"><ImLocation size={30} /></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/localizaciones/add-localizacion"><MdAddLocationAlt size={30} /></Link>
                </li>

                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserCog size={30} /> 
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><Link className="dropdown-item" to="/perfil">Mi perfil</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item" onClick={handleLogout} >Cerrar sesi??n </button></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          {/* <div className="">
            <NavLink className="" to="/libros/add-libro">A??adir libro</NavLink>
            <NavLink className="" to="/libros">Mis libros</NavLink>

            <NavLink className="" to="/localizaciones/add-localizacion">A??adir localizaci??n</NavLink>
            <NavLink className="" to="/localizaciones">Mis localizaciones</NavLink>

            <NavLink className="" to="/perfil">Mi perfil</NavLink>

            <button onClick={handleLogout} className="btn btn-danger"> Cerrar sesi??n </button>
          </div> */}
        </nav>
      )
    }
    
    </div>
  )
}

export default Navbar