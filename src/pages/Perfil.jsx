import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { verifyService } from '../services/auth.services';
import { SpinnerRoundOutlined } from "spinners-react";

function Perfil() {
  
  const [ user, setUser ] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getInfoUser();

  }, [])

  const getInfoUser = async () => {
    try {
      const response = await verifyService();
      // console.log("verify service: ", response);
      setUser(response.data);

    } catch (error) {
        navigate("/error")
    }
  }


  



  return (
    <div>
        { user === null && <SpinnerRoundOutlined /> }
        {
          user !== null && (
            <h1> Perfil de {user.nombre} </h1>
          )
        }

        <h2> Mis libros favoritos </h2>
        
        <h2> Mis libros leídos </h2>

    </div>
  )
}

export default Perfil