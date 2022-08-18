
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
                <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                  <NavLink className="nav-link" aria-current="page" to="/libros"> <IoLibrarySharp size={30} /> </NavLink>
                </li>
                <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/libros/add-libro"><FaBookMedical size={30} /></NavLink>
                </li>
                <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/localizaciones"><ImLocation size={30} /></NavLink>
                </li>
                <li className="nav-item" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">
                  <NavLink className="nav-link" to="/localizaciones/add-localizacion"><MdAddLocationAlt size={30} /></NavLink>
                </li>

                <li className="nav-item dropdown" >
                  <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <FaUserCog size={30} /> 
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown" >
                    <li>
                      <NavLink className="dropdown-item" to="/perfil">Mi perfil</NavLink>
                    </li>
                    {/* <li><hr className="dropdown-divider" /></li> */}
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}> Cerrar sesión </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )
    }
    
    </div>
  )
}

export default Navbar