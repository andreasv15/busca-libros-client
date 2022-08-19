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
    const [ errorMessage, setErrorMessage] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
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
            //console.log(response);
            if (response.data.errorMessage === undefined) {
                setDetalleLocalizacion(response.data);
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
    <div className='divDetalleLocalizacion'>
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
            </Box>

        </Modal>

        <br />
        
        { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
        
        <br />

    </div>
  )
}

export default DetalleLocalizacion