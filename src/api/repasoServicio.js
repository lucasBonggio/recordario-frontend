import api from "./axios";

export const iniciarRepaso = async () => {
    try {
        const response = await api.post(
            `/autenticacion/repaso/iniciar`,{}
        )

        return response.data;
        
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al iniciar la sesión de repaso."
        )
    }
}

export const responderTarjeta = async (nota) => {
    try {
        const response = await api.post(
            `/autenticacion/repaso/sesion/responder`,
            nota,
            {headers: {"Content-Type": "application/json"}}
        )

        return response.data;
        
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al responder la tarjeta."
        );
    }
}

export const finalizarSesion = async () => {
    try {
        const response = await api.post(
                `/autenticacion/repaso/sesion/finalizar`, {}
            )

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al finalizar la sesion."
        );        
    }
}