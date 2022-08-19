import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteLocalizacionService, getDetalleLocalizacionService } from '../services/localizacion.services';
import { SpinnerRoundOutlined } from "spinners-react";
import { Box, Button, Modal, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';



function DetalleLocalizacion() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [ detalleLocalizacion, setDetalleLocalizacion ] = useState(null);
    const [ librosLocalizacion, setLibrosLocalizacion ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false); 
        setErrorMessage(null)
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
      


    useEffect(() => {
        getDetalleLocalizacion();
    }, []);

    const getDetalleLocalizacion = async () => {

        try {
            const response = await getDetalleLocalizacionService(id);
            //console.log("hola ", response);
            if (response.data.errorMessage === undefined) {
                setDetalleLocalizacion(response.data.localizacion);
                setLibrosLocalizacion(response.data.libros);
            } else {
                setErrorMessage(response.data.errorMessage);
            }

            
        } catch (error) {
            navigate("/error");
        }

    }

    const handleDelete = async () => {
        try {
            const response = await deleteLocalizacionService(id);
            // console.log(response);
            //navigate("/localizaciones");
            if (response.data.errorMessage === undefined) {
                navigate("/localizaciones");
            } else {
                setErrorMessage(response.data.errorMessage);
            }

        } catch (error) {
            navigate("/error");
        }
    }


    if (detalleLocalizacion === null) {
        return <SpinnerRoundOutlined />
    }


  return (
    <div className='divDetalleLocalizacion d-flex'>
        <br />

        <h4> {detalleLocalizacion.lugar} </h4>

        <br />

        <div className='botonesLocalizacion'>
            <Button variant="contained" onClick={handleOpen}> Borrar </Button>
            <br />
            <Link to={`/localizaciones/${id}/edit`}><Button variant="contained"> Editar </Button></Link>
        </div>
        
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Selecciona una opción
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    ¿Estás seguro/a de que quieres borrar esta localización?
                </Typography>

            <div className='d-flex justify-content-evenly'>
                <Button type='button' onClick={handleDelete} variant="contained"> Sí </Button>
                <Button type='button' onClick={handleClose} variant="contained"> No </Button>
            </div>
            <br />
            { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
            </Box>

        </Modal>

        <br />
        <br />

            {
                librosLocalizacion.length === 0 ?
                    <Alert className='alert alert-info alertError' severity="info"> No hay libros en esta localización. Agrega <Link to={`/libros/add-libro/`}>uno</Link>. </Alert>
                 :
                <div>
                    <h4> Libros que están en {detalleLocalizacion.lugar} </h4>
                    <div className='divLibrosLeidos d-flex flex-wrap'>
                        {
                            librosLocalizacion !== null && (
                                librosLocalizacion.map((eachLibro) => {
                            return (
                                <div className='cadaLibroPerfil card'>
                                <Link to={`/libros/${eachLibro._id}/details`}>
                                <img src={eachLibro.imagen} class="card-img-top imgLibroPerfil" alt="..."  />
                                </Link>
                                <div className='card-body'>
                                    <Link to={`/libros/${eachLibro._id}/details`}>
                                    <h5> {eachLibro.titulo} </h5> 
                                    <p className="card-subtitle mb-2 text-muted">{eachLibro.autor}</p>
                                    </Link>
                                </div>
                                </div>
                            )
                            })
                        )
                        }
                    </div>
                </div>
            }

        <br />

    </div>
  )
}

export default DetalleLocalizacion