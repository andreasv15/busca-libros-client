import service from "./config.services";

const perfilService = (user) => {
    return service.get("/perfil", user);
}

const updatePerfilService = (usuario, editado) => {
    return service.patch(`/perfil/${usuario}`, editado);

}


export {
    perfilService,
    updatePerfilService
}

