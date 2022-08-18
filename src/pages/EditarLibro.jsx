import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editDetallesLibroService, getDetalleLibroService, uploadImgService } from '../services/libro.services';
import { getAllLocalizacionesService } from '../services/localizacion.services';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


function EditarLibro() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ imagen, setImagen ] = useState("");
    const [ titulo, setTitulo ] = useState("");
    const [ autor, setAutor ] = useState("");
    const [ sinopsis, setSinopsis ] = useState("");
    const [ localizacion, setLocalizacion ] = useState("");
    const [ leido, setLeido ] = useState(false);
    const [ esFavorito, setFavorito ] = useState(false);
    const [ listaLocalizaciones, setListaLocalizaciones ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    useEffect(() => {
        getLibroDetalles();

    }, []);

    const getLibroDetalles = async () => {
        try {
            const response = await getDetalleLibroService(id);
            //console.log(response);
            const { imagen, titulo, autor, sinopsis, localizacion, leido, esFavorito } = response.data;
            setImagen(imagen);
            setTitulo(titulo);
            setAutor(autor);
            setSinopsis(sinopsis);
            setLocalizacion(localizacion);
            setLeido(leido);
            setFavorito(esFavorito);
            
            const listaLocaliz = await getAllLocalizacionesService();
            if (listaLocaliz.data.errorMessage === undefined) {
                setListaLocalizaciones(listaLocaliz.data);
            } else {
                setErrorMessage(listaLocaliz.data.errorMessage);
            }

        } catch (error) {
            navigate("/error");
        }
    }

    const handleChangeTitulo = (e) => setTitulo(e.target.value);
    const handleChangeAutor = (e) => setAutor(e.target.value);
    const handleChangeSinopsis = (e) => setSinopsis(e.target.value);
    const handleChangeLocaliz = (e) => setLocalizacion(e.target.value);
    const handleLeidoChange = (e) => setLeido(e.target.checked);
    const handleFavoritoChange = (e) => setFavorito(e.target.checked);


    const handleImgChange = async (e) => {
        
        // console.log(e.target.files[0]);

        const uploadForm = new FormData();
        uploadForm.append("image", e.target.files[0]); // "image", el mismo nombre que tenemos en la ruta /uploader del backend (uploader.single("image")) 

        try {
            const response = await uploadImgService(uploadForm);
            // console.log(response);
            setImagen(response.data);
        } catch (error) {
            navigate("/error");
        }
    }



    const handleEditLibro = async (e) => {
        e.preventDefault();

        try {
            const editarLibro = {
                imagen,
                titulo,
                autor,
                sinopsis,
                localizacion,
                leido,
                esFavorito
            }
            // console.log(editarRestaurante.nombre,editarRestaurante.direccion);
      
            //await axios.patch(`http://localhost:5005/api/restaurantes/${id}`, editarRestaurante);
            //console.log(response)
            
            await editDetallesLibroService(id, editarLibro);
            navigate(`/libros/${id}/details`)
      
        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }
    };



  return (
    <div className='divEditarLibro'>
        <form onSubmit={handleEditLibro} className="formEditLibro">

            <br />

            <input type="file" className="custom-file-input" id="customFileLang"  onChange={handleImgChange} />
            <br />
            <br />

            {
                imagen !== undefined && <img src={imagen} alt="img" className='card-img-top imgAddLibro' />
            }

            <br />
            <br />

            <br />

            <TextField onChange={handleChangeTitulo} value={titulo} className='textfield' id="standard-basic" label="Título" variant="standard" />
            <br />
            <br />
            <TextField onChange={handleChangeAutor} value={autor} className='textfield' id="standard-basic" label="Autor" variant="standard" />
            <br />
            <br />
            <TextField
                id="standard-multiline-static"
                className='textfield'
                label="Sinopsis"
                multiline
                rows={5}
                variant="standard"
                onChange={handleChangeSinopsis} 
                value={sinopsis}
            />

            <br />
            <br />

            <TextField
                id="standard-select-currency"
                select
                label="Localización"
                value={localizacion} 
                onChange={handleChangeLocaliz}                
                variant="standard"
                className='textfield'
            >
            {
                listaLocalizaciones !== null && (
                    listaLocalizaciones.map( (eachLocalizacion) => {
                        return (
                            <MenuItem value={eachLocalizacion._id}>
                                <span className='d-flex'>{eachLocalizacion.lugar}</span>
                            </MenuItem>

                        )

                    }
                )
                )
            }
            </TextField>

            <br />
            <br />

            <FormControlLabel className='checkBoxAdd d-flex' control={<Checkbox defaultChecked />} label="Ya lo he leído" value="leido" onChange={handleLeidoChange} checked={leido} />
            <FormControlLabel className='checkBoxAdd d-flex' control={<Checkbox defaultChecked icon={<FavoriteBorder />} checkedIcon={<Favorite />} /> } label="Añadir a mis favoritos" value="favorito" onChange={handleFavoritoChange} checked={esFavorito}  />


            {/* <div class="form-check d-flex">
                <input className="form-check-input" type="checkbox" value="leido" id="flexCheckDefault" onChange={handleLeidoChange} checked={leido}/>
                <label className="form-check-label" for="flexCheckDefault">
                    Ya lo he leído
                </label>
            </div> */}


            <br />

            { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }

            <div className='botonesLocalizacion'>
                <Button type='submit' variant="contained"> Guardar </Button>
                <br />
                <Link to={`/libros/${id}/details`}><Button variant="contained"> Cancelar </Button> </Link>
            </div>
        </form>

    </div>
  )
}

export default EditarLibro