import api from './axios';

export const analizarTexto = async (libro) => {
    try {
        const response = await api.post(`/autenticacion/libros/analizar`,
            libro
        );
        
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje || 
            "Error al analizar las notas."
        );
    }

}

