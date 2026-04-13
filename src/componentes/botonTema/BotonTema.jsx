import { useTema } from "../../contexto/TemaContexto";
import '../botonTema/BotonTema.css'

function BotonTema() {

    const { tema, cambiarTema } = useTema();

    return (
        <button className="boton-tema"
                onClick={cambiarTema}>
            {tema === "claro"
                ? "🌙"
                : "☀"}
        </button>
    );
}

export default BotonTema;