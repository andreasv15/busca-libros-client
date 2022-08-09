import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { editDetallesLibroService, getDetalleLibroService, uploadImgService } from '../services/libro.services';
import { getAllLocalizacionesService } from '../services/localizacion.services';

function EditarLibro() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [ imagen, setImagen ] = useState();
    const [ titulo, setTitulo ] = useState();
    const [ autor, setAutor ] = useState();
    const [ sinopsis, setSinopsis ] = useState();
    const [ localizacion, setLocalizacion ] = useState();
    const [ listaLocalizaciones, setListaLocalizaciones ] = useState(null);
    const [ errorMessage, setErrorMessage ] = useState(null);

    useEffect(() => {
        getLibroDetalles();

    }, []);

    const getLibroDetalles = async () => {
        try {
            const response = await getDetalleLibroService(id);
            //console.log(response);
            const { imagen, titulo, autor, sinopsis, localizacion } = response.data;
            setImagen(imagen);
            setTitulo(titulo);
            setAutor(autor);
            setSinopsis(sinopsis);
            setLocalizacion(localizacion);
            
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
                localizacion
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

            <input type="file" lassName="custom-file-input" id="customFileLang"  onChange={handleImgChange} />
            <br />
            <br />

            {
                imagen !== undefined && <img src={imagen} alt="img" className='card-img-top imgAddLibro' />
            }

            <br />
            <br />

            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Escribe el título del libro" onChange={handleChangeTitulo} value={titulo} />
                <label htmlFor='titulo floatingInput'> Título </label>
            </div>

            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Escribe el autor del libro" onChange={handleChangeAutor} value={autor} />
                <label htmlFor='autor floatingInput'> Autor </label>
            </div>

            <textarea className='form-control' id="floatingInput exampleFormControlTextarea1" placeholder='Escribe la sinopsis del libro' onChange={handleChangeSinopsis} value={sinopsis} rows="5"></textarea>

            <br />

            { listaLocalizaciones != null && (
                <select className='form-control' id='exampleFormControlSelect1' name='localizacion' value={localizacion} onChange={handleChangeLocaliz}>
                {
                    listaLocalizaciones.map( (eachLocalizacion) => {
                        return (
                            <option value={eachLocalizacion._id}> {eachLocalizacion.lugar} </option>
                        )
                    })
                }
                </select>
            )
            }
            <br />

            { errorMessage !== null && <p> {errorMessage} </p>}

            <div className='botonesLocalizacion'>
                <Button type='submit' variant="contained"> Guardar </Button>

                <Link to={`/libros/${id}/details`}><Button variant="contained"> Cancelar </Button> </Link>
            </div>
        </form>

    </div>
  )
}

export default EditarLibro