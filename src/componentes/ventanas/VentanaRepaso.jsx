import { useState } from "react";
import { responderTarjeta } from "../../api/repasoServicio";
import { finalizarSesion } from "../../api/repasoServicio";
import Tarjeta from "../tarjeta/Tarjeta";
import VentanaEvaluacion from "./VentanaEvaluacion";
import './VentanaRepaso.css'

function VentanaRepaso({cerrar, tarjeta}) {
    const [mostrarVentanaEvaluacion, setMostrarVentanaEvaluacion] = useState(false);
    const [mensajeSesion, setMensajeSesion] = useState("");
    const [tarjetaActual, setTarjetaActual] = useState(tarjeta);

    const enviarNota = async (nota) => {
        try { 
            const respuesta = await responderTarjeta(nota);
            
            if (respuesta.estadoSesion?.sesionFinalizada) {
                setMensajeSesion(respuesta.mensaje);
                
                setTimeout(() => {
                    cerrar();
                }, 500);
            }
            setTarjetaActual(respuesta.tarjeta);
        } catch (error) {
            console.error(error);
        }
    }

    const terminarSesion = async () => {
        try {
            const respuesta = await finalizarSesion();
            
            setMensajeSesion(respuesta.mensaje);

            setTimeout(() => {
                cerrar();
            }, 500);

        } catch (error) {
            console.error(error);
        }
    }

    return (  
    <div className="modal-overlay">
        <div className="modal">
            <div className="contenedor-ventana">
                <button 
                    className="boton-cerrar"
                    onClick={cerrar}
                >
                    &times;
                </button>
                <Tarjeta tarjeta={tarjetaActual}
                            variante="modal"/>
                <div className="contenedor-respuesta">
                    <textarea   className="input-respuesta"
                                placeholder="Escribe tu respuesta aquí"/>
                    <div className="contenedor-accion">
                        <button 
                            className="boton-continuar"
                            onClick={() => setMostrarVentanaEvaluacion(true)}
                        >
                            CONTINUAR
                        </button>
                        <button className="boton-finalizar"
                                onClick={terminarSesion}>
                            FINALIZAR SESIÓN
                        </button>
                    </div>
                </div>

                {mostrarVentanaEvaluacion && (
                    <VentanaEvaluacion cerrar={() => setMostrarVentanaEvaluacion(false)} enviarNota={enviarNota}/>
                )}

                {mensajeSesion && (
                    <div className="mensaje-final">
                        {mensajeSesion}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
}

export default VentanaRepaso;