import { useEffect, useState } from "react";
import { finalizarSesion, obtenerDatos } from "../../api/usuarioServicio";
import VentanaCambiarContraseña from "../Ventanas/VentanaCambiarContraseña";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthProvider";

import './Perfil.css'

function Perfil({cerrarPerfil}) {
    const [usuario, setUsuario] = useState(null);
    const [mostrarModalContra, setMostrarModalContra] = useState(false);

    const [errorDatos, setErrorDatos] = useState("");
    const [errorFinalizarSesion, setErrorFinalizarSesion] = useState("");

    const navegar = useNavigate();

    const { logout } = useAuth();

    useEffect(() => {
        const cargatDatos = async () => {
        try {
            const datos = await obtenerDatos();
            setUsuario(datos);

        } catch (error) {
            setErrorDatos(error.message);
        }
    };
    cargatDatos()
    }, []);


    const cerrarSesion = async () => {
        try {
            const respuesta = await finalizarSesion();
            logout();

            navegar("/")

        } catch (error) {
            setErrorFinalizarSesion(error.message);            
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal-perfil">
                <button 
                    className="boton-cerrar"
                    onClick={cerrarPerfil}
                >
                    &times;
                </button>

                <h3 className="titulo-perfil">MI PERFIL</h3>

                <div className="datos-usuario">
                    <span className="nombre-usuario">{usuario?.nombreUsuario}</span>
                    <span className="email-usuario">{usuario?.email}</span>
                </div>

                <div className="acciones-usuario">
                    <button
                        className="boton-azul"
                        onClick={() => setMostrarModalContra(true)}
                    >
                        CAMBIAR CONTRASEÑA
                    </button>

                    <button className="boton-rojo"
                            onClick={cerrarSesion}>
                        CERRAR SESIÓN
                    </button>
                </div>

                {mostrarModalContra && (
                    <VentanaCambiarContraseña cerrarVentana={() => setMostrarModalContra(false)}/>
                )}
                
                {errorDatos && <p className="mensaje-error">{errorDatos}</p>}
                {errorFinalizarSesion && <p className="mensaje-error">{errorFinalizarSesion}</p>}
            </div>
        </div>
    );
}

export default Perfil;