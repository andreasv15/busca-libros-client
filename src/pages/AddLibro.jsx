import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addLibroService, uploadImgService } from '../services/libro.services';
import { getAllLocalizacionesService } from '../services/localizacion.services';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


function AddLibro() {
    const navigate = useNavigate();

    const [ imagen, setImagen ] = useState();
    const [ titulo, setTitulo ] = useState("");
    const [ autor, setAutor ] = useState("");
    const [ sinopsis, setSinopsis ] = useState("");
    const [ localizacion, setLocalizacion ] = useState("holita");
    const [ listaLocalizaciones, setListaLocalizaciones ] = useState(null);
    const [leido, setLeido] = useState(false);
    const [esFavorito, setFavorito] = useState(false);
    // const [ categoria, setCategoria ] = useState([]);
    const [ errorMessage, setErrorMessage ] = useState(null);

    useEffect(() => {
        getLocalizaciones();
    }, [])

    const getLocalizaciones = async () => {

        try {
            const response = await getAllLocalizacionesService();

            if (response.data.errorMessage === undefined) {
                //console.log(response.data[0]._id)
                setLocalizacion(response.data[0]._id)
                setListaLocalizaciones(response.data);
            } else {
                setErrorMessage(response.data.errorMessage);
            }
                    
        } catch (error) {
            navigate("/error");
        }
    }

    const handleChangeTitulo = (e) => setTitulo(e.target.value);
    const handleChangeAutor = (e) => setAutor(e.target.value);
    const handleChangeSinopsis = (e) => setSinopsis(e.target.value);
    const handleChangeLocaliz = (e) => setLocalizacion(e.target.value);
    const handleLeidoChange = (e) => setLeido(e.target.checked); // para los checkbox no usamos .value, sino .checked
    const handleFavoritoChange = (e) => setFavorito(e.target.checked); // para los checkbox no usamos .value, sino .checked

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

    const handleAddLibro = async (e) => {
        e.preventDefault();
        
        const libro = {
            imagen,
            titulo,
            autor,
            sinopsis,
            localizacion,
            leido,
            esFavorito
        }

        try {
            await addLibroService(libro);
            navigate("/libros");

        } catch (error) {
            if (error.response.status === 400) {
                //console.log("error: ", error);
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }
    }


  return (
    <div className='divFormAddLibro'>


        <form onSubmit={handleAddLibro} className="formAddLibro">
            <br />
            <br />
            <Button
            variant="contained"
            component="label"
            >
            Imagen del libro
            <input
                type="file"
                hidden
                onChange={handleImgChange}
            />
            </Button>

            <span> </span>

            {
                imagen !== undefined && <img src={imagen} alt="img" className='card-img-top imgAddLibro' />
            }
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
            { listaLocalizaciones === null && <Alert severity="error"> Para poder agregar libros tienes que tener mínimo una localización. Agrega <Link to={"/localizaciones/add-localizacion"}>una</Link>. </Alert>}
            
            <br />

            <TextField
                id="standard-select-currency"
                select
                label="Localización"
                value={localizacion}
                defaultValue={localizacion}
                onChange={handleChangeLocaliz}
                helperText="Donde se guarda el libro"
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
            <FormControlLabel className='checkBoxAdd d-flex' control={<Checkbox defaultChecked icon={<FavoriteBorder /> } checkedIcon={<Favorite />} /> } label="Añadir a mis favoritos" value="favorito" onChange={handleFavoritoChange} checked={esFavorito} />

            { errorMessage !== null && <Alert className='alert alert-danger' severity="error"> { errorMessage } </Alert> }
            <br />

            <Button type='submit' variant="contained"> Añadir </Button>
            
        </form>
                
    </div>
  )
}

export default AddLibro