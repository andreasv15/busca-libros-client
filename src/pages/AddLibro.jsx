import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addLibroService, uploadImgService } from '../services/libro.services';
import { getAllLocalizacionesService } from '../services/localizacion.services';

function AddLibro() {
    const navigate = useNavigate();

    const [ imagen, setImagen ] = useState();
    const [ titulo, setTitulo ] = useState("");
    const [ autor, setAutor ] = useState("");
    const [ sinopsis, setSinopsis ] = useState("");
    const [ localizacion, setLocalizacion ] = useState("");
    const [ listaLocalizaciones, setListaLocalizaciones ] = useState(null);
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

    // const handleChangeCategoria = (e) => {
    //     console.log(e)
    //     // const cat = e.target.value;
    //     // if ()

    //     // setCategoria();
    // };

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
            localizacion
        }

        try {
            await addLibroService(libro);
            navigate("/libros");

        } catch (error) {
            if (error.response.status === 400) {
                setErrorMessage(error.response.data.errorMessage)
            } else {
                navigate("/error")
            }
        }
    }



  return (
    <div>
        <h1> Añadiendo libro </h1>
    
        <form onSubmit={handleAddLibro}>
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
                {/* <input type="text" className="localizacion" placeholder="Escribe la localización del libro" onChange={handleChangeLocalizacion} value={localizacion} /> */}
                { errorMessage !== null && <p> No tienes ninguna localización. <Link to="/add-localizacion"> Crear una </Link> </p> }


                { listaLocalizaciones !== null && (
                    <select name='localizacion' onChange={handleChangeLocaliz}>
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

                {/* <label htmlFor='categoria'> Selecciona a qué categoría pertenece: </label><br/>
                <input type="checkbox" className="categoria[]" value="Drama" onChange={handleChangeCategoria} /> Drama <br/>
                <input type="checkbox" className="categoria[]" value="Ficcion" onChange={handleChangeCategoria} /> Ciencia Ficción <br/>
                <input type="checkbox" className="categoria[]" value="Romance" onChange={handleChangeCategoria} /> Romance <br/>
                <input type="checkbox" className="categoria[]" value="Fantasia" onChange={handleChangeCategoria} /> Fantasía <br/>
                */}



            </div>
            { errorMessage === null && <button type='submit'> Añadir </button>}
            
        </form>
                
    </div>
  )
}

export default AddLibro