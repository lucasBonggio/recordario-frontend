import { useEffect, useState } from "react";
import Botonera from "../Botonera/Botonera";
import Tarjetero from "../tarjeta/Tarjetero";
import VentanaAnalisis from "../ventanas/VentanaAnalisis";
import { obtenerTarjetas } from "../../api/usuarioServicio";
import VentanaRepaso from "../ventanas/VentanaRepaso";
import { iniciarRepaso } from "../../api/repasoServicio";
import Perfil from "../Perfil/Perfil";
import Estadisticas from "../Estadisticas/Estadisticas";
import SinTarjetas from "../tarjeta/SinTarjetas";

import './Panel.css'

function Panel() {
    const [tarjetas, setTarjetas] = useState([]);
    const [tarjeta, setTarjeta] = useState(null);
    
    const [errorTarjetas, setErrorTarjetas] = useState("");
    const [errorRepaso, setErrorRepaso] = useState("");

    const hayTarjetas = tarjetas && tarjetas.length > 0;

    const [mostrarModalAnalisis, setMostrarModalAnalisis] = useState(false);
    const [mostrarModalRepaso, setMostrarModalRepaso] = useState(false);
    const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false);

    const [mensajeRepaso, setMensajeRepaso] = useState();
    
    const cargarTarjetas = async () => {
        try {
            const datos = await obtenerTarjetas();
            setTarjetas(datos);

        } catch (error) {
            setErrorTarjetas(error.message);
        }
    };

    useEffect(() => {
        cargarTarjetas();
    }, [])
    
    const manejarRepaso = async () => {
        try {
            const datos = await iniciarRepaso();

            setMensajeRepaso(datos.mensaje);

            if (!datos.tarjeta) {
                setTimeout(() => setMensajeRepaso(""), 3000);
                return;
            }

            setTarjeta(datos.tarjeta);
            setMostrarModalRepaso(true);

        } catch (error) {
            setErrorRepaso(error.message);
        }
    };

    return (  
        <div className="contenedor-panel">
            <button className="boton-perfil"
                    onClick={() => setMostrarModalPerfil(true)}
            >
            PERFIL
            </button>
            <Estadisticas />

            {hayTarjetas
                ? <Tarjetero tarjetas={tarjetas} /> :
                <SinTarjetas/>
            }
            
            <Botonera  abrirModalAnalisis={() => setMostrarModalAnalisis(true)} 
                        abrirModalRepaso={manejarRepaso}/>

            {mostrarModalPerfil && (
                <Perfil cerrarPerfil={() => setMostrarModalPerfil(false)}/>
            )}

            {mostrarModalAnalisis && (
                <VentanaAnalisis cerrar={() => setMostrarModalAnalisis(false)}
                                    cargarTarjetas={cargarTarjetas}/>
            )}
            
            {mensajeRepaso && (
                <p className="mensaje-repaso">{mensajeRepaso}</p>
            )}

            {mostrarModalRepaso && (
                <VentanaRepaso  cerrar= {() => setMostrarModalRepaso(false)}
                                tarjeta={tarjeta}/>
            )}

            {errorTarjetas && <p className="mensaje-error">{errorTarjetas}</p>}
            {errorRepaso && <p className="mensaje-error">{errorRepaso}</p>}
            
        </div>
    );
}

export default Panel;