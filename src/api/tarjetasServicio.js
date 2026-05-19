import api from "./axios";

export const crearTarjeta = async (tema) => {
    try{
        const response = await api.post(
            '/autenticacion/tarjetas/',
            tema
        )

        return response.data;
    } catch(error){
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al crear la tarjeta."
        )
    }
}

export const obtenerTarjetas = async () => {
    try {
        const response = await api.get(
            `/autenticacion/tarjetas/obtener`
        )

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener tarjetas."
        );        
    }
}