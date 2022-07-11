import service from "./config.services.js";

const getAllLibrosService = () => {
    return service.get("/libros");
}

const addLibroService = (libro) => {
    return service.post("/libros/anadir", libro);
}

const getDetalleLibroService = (libro) => {
    return service.get(`/libros/${libro}`);
}

const editDetallesLibroService = (libro, editado) => {
    return service.patch(`/libros/${libro}`, editado);
}

const deleteLibroService = (libro) => {
    return service.delete(`/libros/${libro}`);
}

const uploadImgService = (uploadForm) => {
    return service.post("/uploader", uploadForm);
}

export {
    getAllLibrosService,
    addLibroService,
    getDetalleLibroService,
    editDetallesLibroService,
    deleteLibroService,
    uploadImgService
}