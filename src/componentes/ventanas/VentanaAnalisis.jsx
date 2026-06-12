import { useState } from "react";
import { crearTarjeta } from "../../api/tarjetasServicio";
import './VentanaAnalisis.css'

function VentanaAnalisis({cerrar, cargarTarjetas }) {
    const [titulo, setTitulo] = useState("");
    const [ideasPrincipales, setIdeasPrincipales] = useState([""]);
    
    const [tarjetasCreadas, setTarjetasCreadas] = useState("");
    const [error, setError] = useState("");

    const agregarNota = () => {
        setIdeasPrincipales([...ideasPrincipales, ""]);
    }

    const cambiarNota = (index, valor) => {
        const nuevasNotas = [...ideasPrincipales];
        nuevasNotas[index] = valor;

        setIdeasPrincipales(nuevasNotas);
    }
    

    const enviarResumen = async (e) => {
        e.preventDefault();

        const tema = {
            titulo: titulo,
            ideasPrincipales: ideasPrincipales.filter(
                idea => idea.trim() !== ""
            )
        };

        try {
            const respuestaAnalisis = await crearTarjeta(tema);

            setTarjetasCreadas(respuestaAnalisis);
            
            cargarTarjetas();
            cerrar()
        } catch (error) {
            setError(error);            
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <button 
                    className="boton-cerrar"
                    onClick={cerrar}
                >
                    &times;
                </button>

                <h2>ANÁLISIS DEL CONCEPTO</h2>
                <span className="subtitulo-modal">CONVERTÍ TUS NOTAS EN TARJETAS</span>

                <form onSubmit={enviarResumen}>
                    <div className="contenedor-formulario">
                        <div className="info-libro">
                            <h3>CONCEPTO</h3>
                            <input
                                type="text"
                                placeholder="Título del concepto"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />
                        </div>

                        <div className="info-capitulo">
                            <h3>IDEAS PRINCIPALES</h3>

                            <div className="contenedor-notas">
                                {ideasPrincipales.map((nota, index) => (

                                    <input
                                        key={index}
                                        type="text"
                                        placeholder={`Idea ${index + 1}`}
                                        value={nota}
                                        onChange={(e) =>
                                            cambiarNota(index, e.target.value)
                                        }
                                    />
                                ))}

                                <button 
                                    type="button"
                                    className="boton-agregar-nota"
                                    onClick={agregarNota}
                                >
                                    AGREGAR NOTA
                                </button>
                            </div>
                        </div>
                    </div>
                    <button className= "boton-enviar"
                                type="submit">
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VentanaAnalisis;