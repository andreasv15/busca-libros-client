import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { deleteLibroService, getDetalleLibroService } from '../services/libro.services';
import { getDetalleLocalizacionService } from '../services/localizacion.services';
import { SpinnerRoundOutlined } from "spinners-react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai"; 
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';


function DetalleLibro() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [ detalleLibro, setDetalleLibro ] = useState(null);
    const [ nomLugar, setNomLugar ] = useState("");
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
        // console.log(leido)
        getLibroDetails();
    }, [])

    
    const getLibroDetails = async () => {
        try {
            const response = await getDetalleLibroService(id);
            //console.log(response);
            if (response.data.errorMessage === undefined) {
                // console.log("fav ",response.data.esFavorito);
                setDetalleLibro(response.data);
                // setFavorito(response.data.esFavorito);

                const response2 = await getDetalleLocalizacionService(response.data.localizacion);
                //console.log("local", response2.data.localizacion.lugar);
                setNomLugar(response2.data.localizacion.lugar);
            } else {
                setErrorMessage(response.data.errorMessage);
            }


      
        } catch (error) {
            navigate("/error");
        }
    }


    const handleDelete = async () => {
        try {
            await deleteLibroService(id);
            navigate("/libros");
            
        } catch (error) {
            navigate("/error");
        }
    }

    if (detalleLibro === null) {
        return <SpinnerRoundOutlined />
    }

  return (
    <div className='divDetallesLibro'>

        { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }

        <div className='infoLibro'>
            <img src={detalleLibro.imagen} alt="img" width="300px" className='imgDetalleLibro' />

                <div className='d-flex justify-content-center'>
                    <h4 className='card-title'> {detalleLibro.titulo} </h4>
                    <div className='iconFav d-flex justify-content-center align-items-center'>
                    {
                        detalleLibro.esFavorito ? <img className='imgFav' src='/images/fav.png' alt='Desmarcar favorito' width="30px" height="30px" /> : <img className='imgFav' src='/images/nofav.png' alt='Marcar favorito' /> 
                    }
                    </div>
                </div>
            

            <h6 className='card-subtitle mb-2 text-muted'> Autor: {detalleLibro.autor}</h6>
            <p className='card-text'> {detalleLibro.sinopsis}</p>
            <p> <strong> ¿Dónde está? </strong> {nomLugar} </p>
            
            <p className={detalleLibro.leido ? "badge bg-success" : "badge bg-danger"}> 
            {
                detalleLibro.leido ? <span> <AiFillCheckCircle size={15} /> Leído </span> : <span> <AiFillCloseCircle size={15} /> Sin leer </span>
            }
            </p>


            <br />
            <br />

            <div className='botonesLocalizacion'>
                <Button variant="contained" onClick={handleOpen}>Borrar</Button>

                <br />
                <Link to={`/libros/${id}/edit`}><Button variant="contained"> Editar </Button></Link>
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
                        ¿Estás seguro/a de que quieres borrar el libro?
                    </Typography>

                <div className='d-flex justify-content-evenly'>
                    <Button type='button' onClick={handleDelete} variant="contained"> Sí </Button>
                    <Button type='button' onClick={handleClose} variant="contained"> No </Button>
                </div>
                </Box>

            </Modal>

        </div>


    </div>
  )
}

export default DetalleLibro