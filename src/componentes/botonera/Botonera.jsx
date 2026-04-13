import './Botonera.css'

function Botonera({ abrirModalAnalisis, abrirModalRepaso}) {

    return ( 
        <div className="contenedor-botonera">
            <div className="contenedor-botones">
                <button
                    className="boton-accion boton-analizar"
                    onClick={abrirModalAnalisis}>ANALIZAR</button>
                <button
                    className="boton-accion boton-repasar"
                    onClick={abrirModalRepaso}
                >REPASAR</button>
            </div>
        </div>
    );
}

export default Botonera;