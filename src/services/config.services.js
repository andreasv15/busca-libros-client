import axios from "axios";

const service = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}/api`
})


//aqui es donde hacemos que el token se envie al backend
service.interceptors.request.use((config) => {

    // buscamos el token en localStorage
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
        config.headers = { authorization: `Bearer ${authToken}` }
    }

    return config;

})


export default service;