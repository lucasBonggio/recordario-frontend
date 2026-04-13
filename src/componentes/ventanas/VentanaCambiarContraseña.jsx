import { useEffect, useState } from "react";
import { actualizarContrasena } from "../../api/usuarioServicio";

import './VentanaCambiarContraseña.css'

function VentanaCambiarContraseña({cerrarVentana}){
    const [contrasenaActual, setContrasenaActual] = useState("");
    const [nuevaContrasena, setNuevaContrasena] = useState("");
    const [repetirContrasena, setRepetirContrasena] = useState("");
    
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const editarContrasena = async (e) => {
        e.preventDefault();

        if(nuevaContrasena !== repetirContrasena){
            setError("Las contraseñas deben coincidir.");
            return;
        }

        setError("");

        try {
            const respuestaEdicion = await actualizarContrasena(contrasenaActual, nuevaContrasena);

            setMensaje(respuestaEdicion);

            setTimeout(() => {
                cerrarVentana();
            }, 500);
            
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="modal-overlay">
            <div className="modal-password">
                <button 
                    className="boton-cerrar"
                    onClick={cerrarVentana}
                >
                    &times;
                </button>

                <h3 className="titulo-modal">
                    Editar contraseña
                </h3>

                <form className="contenedor-inputs">
                    <input 
                        type="password"
                        value={contrasenaActual}
                        onChange={(e) => setContrasenaActual(e.target.value)}
                        placeholder="Contraseña actual"
                        required
                    />
                    <input 
                        type="password"
                        value={nuevaContrasena}
                        onChange={(e) => setNuevaContrasena(e.target.value)}
                        placeholder="Nueva contraseña"
                        required
                    />
                    <input 
                        type="password"
                        value={repetirContrasena}
                        onChange={(e) => setRepetirContrasena(e.target.value)}
                        placeholder="Repetir nueva contraseña"
                        required
                    />

                    {error && (
                        <span className="mensaje-error">{error}</span>
                    )}
                </form>

                <button 
                    className="boton-editar"
                    onClick={editarContrasena}
                >
                    ACTUALIZAR
                </button>

                {mensaje && (
                    <span className="mensaje-final">{mensaje}</span>
                )}

            </div>
        </div>
    );
}

export default VentanaCambiarContraseña;