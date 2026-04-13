import { useEffect, useState } from "react";
import { obtenerEstadisticas } from "../../api/usuarioServicio";
import './Estadisticas.css'

function Estadisticas() {
    const [estadisticas, setEstadisticas] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const datos = await obtenerEstadisticas();
                setEstadisticas(datos);
            } catch (error) {
                setError(error.message);
            }finally{
                setCargando(false);
            }
        };
        cargarDatos();   
    }, []);

    if(cargando) return <p>Cargando estadísticas....</p>;

    return (  
        <div className="contenedor-stats">
            <Estadistica nombre="TARJETAS PENDIENTES" valor={estadisticas?.tarjetasPendientes ?? 0}/>
            <Estadistica nombre="RESPONDIDAS HOY" valor={estadisticas?.tarjetasRepasadasHoy ?? 0}/> 
            <Estadistica nombre="TARJETAS TOTALES" valor={estadisticas?.tarjetasTotales ?? 0}/>
            
            {error && <p className="mensaje-error">{error}</p>}
        </div>

    );

    function Estadistica(props) {
        return (
            <div className="estadistica">
                <h4>{props.nombre}</h4>
                <span>{props.valor}</span>
            </div>
        );
    };
}

export default Estadisticas;