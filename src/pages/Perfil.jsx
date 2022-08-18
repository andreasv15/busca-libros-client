import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { verifyService } from '../services/auth.services';
import { getAllLibrosService } from '../services/libro.services';
import { perfilService, updatePerfilService } from '../services/profile.services';
import { SpinnerRoundOutlined } from "spinners-react";
import { Button, FormControl, FormHelperText, Input } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';



function Perfil() {
  const { id } = useParams();

  const [ user, setUser ] = useState(null);

  const [ nombre, setNombre ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ username, setUsername ] = useState("");

  const [ leidos, setLeidos ] = useState([]);
  const [ favoritos, setFavoritos ] = useState([]);
  const [ open, setOpen ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showNewPassword, setShowNewPassword ] = useState(false);
  const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ message, setMessage ] = useState(null);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChangeNombre = (e) => setNombre(e.target.value);
  const handleChangePassword = (e) => setPassword(e.target.value);
  const handleChangeNewPassword = (e) => setNewPassword(e.target.value);
  const handleChangeConfirmPassword = (e) => setConfirmPassword(e.target.value);


  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '45%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };


  const navigate = useNavigate();

  useEffect(() => {
    getInfoUser();

  }, [])

  const getInfoUser = async () => {
    try {
      const responseLibros = await getAllLibrosService();
      // console.log("libros ", responseLibros);

      // console.log("length: ", responseLibros.data.length);
      let librosLeidos = [];
      for (let i=0; i<responseLibros.data.length; i++) {
          if (responseLibros.data[i].leido === true) {
            //console.log(responseLibros.data[i]);
            librosLeidos.push(responseLibros.data[i]);
            
          }
      }

      let librosFavoritos = [];
      for (let i=0; i<responseLibros.data.length; i++) {
        if (responseLibros.data[i].esFavorito === true) {
          //console.log(responseLibros.data[i]);
          librosFavoritos.push(responseLibros.data[i]);
          
        }
      }

      // console.log(librosLeidos);
      setLeidos(librosLeidos);
      setFavoritos(librosFavoritos);

      //const response = await verifyService();
      const response = await perfilService();
      //console.log(response)
      // console.log(response);
      // console.log("verify service: ", response);
      //console.log("que es ", response.data);
      setUser(response.data);
      setNombre(response.data.nombre);
      //setPassword(response.data.password);
      setUsername(response.data.username);

    } catch (error) {
        navigate("/error")
    }
  }


  const handleEditPerfil = async (e) => {
    e.preventDefault();

    try {
       const editarUsuario = {
          nombre,
          password,
          newPassword,
          confirmPassword
          
        }

        // console.log(editarRestaurante.nombre,editarRestaurante.direccion);
  
        //await axios.patch(`http://localhost:5005/api/restaurantes/${id}`, editarRestaurante);
        //console.log(response)
        
        const response = await updatePerfilService(id, editarUsuario);
        setErrorMessage(null);
        setMessage(response.data);
        navigate(`/login`)
        //window.location.reload();

  
    } catch (error) {
        if (error.response.status === 400) {
            setErrorMessage(error.response.data.errorMessage)
        } else {
            navigate("/error")
        }
    }
};

  



  return (
    <div className='divPerfil'>
    <br />

        { user === null && <SpinnerRoundOutlined /> }
        {
          user !== null && (
            <h1> Perfil de {user.nombre} </h1>
          )
        }

        <Button variant="contained" onClick={handleOpen}>Modificar datos</Button>
    <br />
        
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} className="mod">
            <form onSubmit={handleEditPerfil}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                  Modificando datos
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField  value={username} disabled className='textFieldModal' id="standard-basic" label="Nombre de usuario (no se puede modificar)" variant="standard" />
                <br />
                <br />
                <TextField onChange={handleChangeNombre} value={nombre} className='textFieldModal' id="standard-basic" label="Nombre" variant="standard" />
                <br />
                <br />
                <FormControl variant="standard" className='textFieldModal'  >
                  <InputLabel htmlFor="standard-adornment-password">Contraseña actual</InputLabel>
                  <Input
                    value={password}
                    onChange={handleChangePassword}
                    label="Contraseña actual"
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="password-helper-text">Sólo si quieres cambiarla</FormHelperText>
                </FormControl>
                <br />
                <br />
                <FormControl variant="standard" className='textFieldModal'>
                  <InputLabel htmlFor="standard-adornment-password2">Nueva contraseña</InputLabel>
                  <Input
                    value={newPassword}
                    onChange={handleChangeNewPassword}
                    label="Contraseña actual"
                    id="standard-adornment-password2"
                    type={showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="password-helper-text">Sólo si quieres cambiarla</FormHelperText>
                </FormControl>
                
                <br />
                <br />
                <FormControl variant="standard" className='textFieldModal'  >
                  <InputLabel htmlFor="standard-adornment-password3">Confirma la nueva contraseña</InputLabel>
                  <Input
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                    label="Confirma la nueva contraseña"
                    id="standard-adornment-password3"
                    type={showConfirmPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText id="password-helper-text">Sólo si quieres cambiarla</FormHelperText>
                </FormControl>



                {/* <TextField type="password" helperText="Sólo si quieres cambiarla" onChange={handleChangeNewPassword} value={newPassword} className='textFieldModal' id="standard-basic" label="Nueva contraseña" variant="standard" /> */}
                <br />
                <br />
                {/* <TextField helperText="Sólo si quieres cambiarla" onChange={handleChangeConfirmPassword} value={confirmPassword} className='textFieldModal' id="standard-basic" label="Repite la nueva contraseña" variant="standard" /> */}
              </Typography>
              <br />
              <br />
              <div className='d-flex justify-content-evenly botonesPerfil'>
                <Button type='submit' variant="contained"> Guardar </Button>
                  <br />
                  <br />
                <Button type='button' onClick={handleClose} variant="contained"> Cancelar </Button>
              </div>
              <br />

              { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
              { message !== null && <Alert className='alert alert-success' severity="success"> { message } </Alert> }

            </form>
          </Box>
        </Modal>
        <br />
        <br />
        <br />

        <div className='perfilLibros d-flex flex-column'>
          <h2> Mis libros favoritos </h2>
          <div className='divLibrosLeidos d-flex flex-wrap'>
            {
              favoritos !== null && (
                favoritos.map((eachFavorito) => {
                  return (
                    <div className='cadaLibroPerfil card'>
                    <Link to={`/libros/${eachFavorito._id}/details`}>
                      <img src={eachFavorito.imagen} class="card-img-top imgLibroPerfil" alt="..."  />
                    </Link>
                      <div className='card-body'>
                        <Link to={`/libros/${eachFavorito._id}/details`}>
                          <h5> {eachFavorito.titulo} </h5> 
                          <p className="card-subtitle mb-2 text-muted">{eachFavorito.autor}</p>
                        </Link>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
          <br />

          <h2 className='text-left'> Mis libros leídos </h2>
          <div className='divLibrosLeidos d-flex flex-wrap'>
            {
              leidos !== null && (
                leidos.map((eachLeido) => {
                  return (
                    <div className='cadaLibroPerfil card'>
                    <Link to={`/libros/${eachLeido._id}/details`}>
                      <img src={eachLeido.imagen} class="card-img-top imgLibroPerfil" alt="..."  />
                    </Link>
                      <div className='card-body'>
                        <Link to={`/libros/${eachLeido._id}/details`}>
                          <h5> {eachLeido.titulo} </h5> 
                          <p className="card-subtitle mb-2 text-muted">{eachLeido.autor}</p>
                        </Link>
                      </div>
                    </div>
                  )
                })
              )
            }
          </div>
        </div>

    </div>
  )
}

export default Perfil