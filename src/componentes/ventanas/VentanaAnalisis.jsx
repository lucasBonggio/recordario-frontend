import { useState } from "react";
import { analizarTexto } from "../../api/analisisServicio";
import './VentanaAnalisis.css'

function VentanaAnalisis({cerrar, cargarTarjetas }) {
    const [titulo, setTitulo] = useState("");
    const [tituloCapitulo, setTituloCapitulo] = useState("");
    const [estado, setEstado] = useState("LEYENDO");
    const [capitulos, setCapitulos] = useState("");
    const [notas, setNotas] = useState([""]);
    const [texto, setTexto] = useState("");
    
    const [tarjetasCreadas, setTarjetasCreadas] = useState("");
    const [error, setError] = useState("");

    const agregarNota = () => {
        setNotas([...notas, ""]);
    }

    const cambiarNota = (index, valor) => {
        const nuevasNotas = [...notas];
        nuevasNotas[index] = valor;

        setNotas(nuevasNotas);
    }
    

    const enviarResumen = async (e) => {
        e.preventDefault();

        const libro = {
            titulo: titulo,
            estado: estado,
            capitulos: [{
                titulo: tituloCapitulo,
                notas: notas.map(n =>({texto: n}))
            }]
        };

        try {
            const respuestaAnalisis = await analizarTexto(libro);

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

                <h2>ANÁLISIS DEL LIBRO</h2>
                <span className="subtitulo-modal">CONVERTÍ TUS NOTAS EN TARJETAS</span>

                <form onSubmit={enviarResumen}>
                    <div className="contenedor-formulario">
                        <div className="info-libro">
                            <h3>LIBRO</h3>
                            <input
                                type="text"
                                placeholder="Título del libro"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                            />

                            <select
                                value={estado}
                                onChange={(e) => setEstado(e.target.value)}
                            >
                                <option value="LEYENDO">LEYENDO</option>
                                <option value="PAUSADO">PAUSADO</option>
                                <option value="COMPLETO">COMPLETO</option>
                                <option value="REVISADO">REVISADO</option>
                                <option value="OBSOLETO">OBSOLETO</option>
                            </select>
                        </div>

                        <div className="info-capitulo">
                            <h3>CAPÍTULO</h3>
                            <input
                                type="text"
                                placeholder="Título del capítulo"
                                value={tituloCapitulo}
                                onChange={(e) => setTituloCapitulo(e.target.value)}
                            />

                            <div className="contenedor-notas">
                                {notas.map((nota, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        placeholder={`Nota ${index + 1}`}
                                        value={nota}
                                        onChange={(e) => cambiarNota(index, e.target.value)}
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