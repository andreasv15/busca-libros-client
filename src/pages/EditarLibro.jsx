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
    const [ opcionSelec, setOpcionSelec ] = useState(null);
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
    <div>
        <h1> Editando detalles del libro </h1>
        <form onSubmit={handleEditLibro}>
            <div>
                <label htmlFor='imagen'> Imagen: </label>
                <input type="file" className="imagen" onChange={handleImgChange} />
                <br />

                {
                    imagen !== undefined && <img src={imagen} alt="img" width="200px" />
                }
                
                <br />

                <label htmlFor='titulo'> Título: </label>
                <input type="text" className="titulo" placeholder="Escribe el título del libro" onChange={handleChangeTitulo} value={titulo} />
                <br />

                <label htmlFor='autor'> Autor: </label>
                <input type="text" className="autor" placeholder="Escribe el autor del libro" onChange={handleChangeAutor} value={autor} />
                <br />

                <label htmlFor='sinopsis'> Sinopsis: </label>
                <textarea className='sinopsis' placeholder='Escribe la sinopsis del libro' onChange={handleChangeSinopsis} value={sinopsis} ></textarea>
                <br />

                <label htmlFor='localizacion'> Localización: </label>
                { listaLocalizaciones != null && (
                    <select name='localizacion' value={localizacion} onChange={handleChangeLocaliz}>
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

            </div>
            { errorMessage !== null && <p> {errorMessage} </p>}
            
            <button type='submit'> Guardar </button>

            <Link to={`/libros/${id}/details`}><button> Cancelar </button> </Link>
        </form>

    </div>
  )
}

export default EditarLibro