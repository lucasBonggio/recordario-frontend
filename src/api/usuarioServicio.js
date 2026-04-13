import axios from 'axios';
import api from './axios';

const url = import.meta.env.VITE_BACKEND_URL;
const API_PUBLICA =  url + "/api/v1/publico";

export const registro = async (nombreUsuario, contrasena, email) => {

    try {
        const response = await axios.post(
            `${API_PUBLICA}/usuarios/registro`,
            {nombreUsuario, contrasena, email},
            { 
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al registrar al usuario."
        );        
    }
}

export const logear = async (nombreUsuario, contrasena) => {
    try {
        const response = await axios.post(
            `${API_PUBLICA}/usuarios/login`,
            {nombreUsuario, contrasena},
            {
                headers: {"Content-Type": "application/json"},
                withCredentials: true
            }
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al iniciar sesión."
        );        
    }
}

export const obtenerDatos = async () => {
    try {
        const response = await api.get(
            `/autenticacion/usuario/me`
        )

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al obtener datos del usuario."
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

export const obtenerEstadisticas = async () => {
    try {
        const response = await api.get(
            `/autenticacion/usuario/progreso`
        );

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje || 
            "Error al obtener estadísticas."
        );        
    }
}

export const actualizarContrasena = async (contrasenaActual, nuevaContrasena) => {
    try {
        const response = await api.post(
            `/autenticacion/usuario/contraseña/cambiar`,
            {contrasenaActual, nuevaContrasena}
        )

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje || 
            "Error al actualizar la contraseña."
        )
    }
}

export const finalizarSesion = async () => {
    try {
        const response = await api.post(
            `/autenticacion/usuario/logout`, {}
        )

        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.mensaje ||
            "Error al finalizar sesión."
        );        
    }
}