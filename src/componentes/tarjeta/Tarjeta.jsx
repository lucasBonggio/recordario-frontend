import './Tarjeta.css'

function Tarjeta({tarjeta, variante = "mazo"}) {
    return (
        <div className={`tarjeta tarjeta-${variante}`}>
            <div className="tarjeta-inner">
                <h3 className="tarjeta-id">TARJETA #{tarjeta.tarjetaId}</h3>
                <h3 className='tarjeta-texto'>CONCEPTO:</h3>
                <h3 className='tarjeta-concepto'>{tarjeta.tituloTema}</h3>
                <span className="tarjeta-pregunta">{tarjeta.pregunta}</span>
                <div className="tarjeta-ideas">
                    {tarjeta.puntosPrincipales
                        ?.split(",")
                        .map((idea, index) => (

                            <span className="idea-chip" key={index}>
                                {idea.trim()}
                            </span>

                        ))}
                </div>
            </div>
        </div>
    );
}
export default Tarjeta;