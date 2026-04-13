import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
        withCredentials: true
});

let refrescando = false;
let cola = [];

const procesarCola = () => {
    cola.forEach(p => p.resolve());
    cola = [];
}

api.interceptors.response.use(
    res => res,

    async error => {

        const originalRequest = error.config;

        if(
            error.response?.status === 401 &&
            !originalRequest._retry
        ){
            originalRequest._retry = true;
            if(refrescando){
                return new Promise((resolve) => {
                    cola.push({resolve});
                }).then(() => api(originalRequest));
            }

            refrescando = true;

            try {
                await  api.post("/publico/usuarios/refrescar",
                    {}, 
                    {
                        withCredentials: true
                    }
                );

                procesarCola();

                refrescando = false;

                return api(originalRequest);
            } catch (e) {
                refrescando = false;

                window.location.href= "/";

                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    } 
);

export default api;