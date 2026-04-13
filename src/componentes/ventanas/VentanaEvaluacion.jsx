import {useState} from 'react';
import './VentanaEvaluacion.css'

function VentanaEvaluacion({cerrar, enviarNota}) {
    const [nota, setNota] = useState(null);

    const enviar = () => {
            if(!nota) return;
            enviarNota(nota);
            cerrar();
        }

    return (  
        <div className="modal-overlay">
            <div className="modal-evaluacion">
                <button 
                    className="boton-cerrarEvaluacion"
                    onClick={cerrar}
                >
                    &times;
                </button>
                <span className="titulo-evaluacion">
                    ¿Cómo evaluarías tu desempeño en esta pregunta?
                </span>

                <div className="contenedor-calificaciones">
                    <button className="nota nota-1" onClick={() => setNota(1)}>1</button>
                    <button className="nota nota-2" onClick={() => setNota(2)}>2</button>
                    <button className="nota nota-3" onClick={() => setNota(3)}>3</button>
                    <button className="nota nota-4" onClick={() => setNota(4)}>4</button>
                    <button className="nota nota-5" onClick={() => setNota(5)}>5</button>
                </div>

                <button 
                    className="boton-enviar-evaluacion"
                    onClick={enviar}
                >
                    ENVIAR
                </button>
            </div>
        </div>
    );
}

export default VentanaEvaluacion;