import service from "./config.services.js";


const getAllLocalizacionesService = () => {
    return service.get(`/localizaciones`)
}

const getDetalleLocalizacionService = (localizacion) => {
    return service.get(`/localizaciones/${localizacion}`)
}

const addLocalizacionService = (localizacion) => {
    return service.post("/localizaciones/anadir", localizacion)
}

const deleteLocalizacionService = (localizacion) => {
    return service.delete(`/localizaciones/${localizacion}`);

}
export {
    getAllLocalizacionesService,
    getDetalleLocalizacionService,
    deleteLocalizacionService,
    addLocalizacionService
}