import './Tarjeta.css'

function Tarjeta({tarjeta, variante = "mazo"}) {
    return (
        <div className={`tarjeta tarjeta-${variante}`}>
            <div className="tarjeta-inner">
                <h3 className="tarjeta-id">TARJETA #{tarjeta.tarjetaId}</h3>
                <h3 className='tarjeta-texto'>CAPITULO:</h3>
                <h3 className='tarjeta-tipo'>{tarjeta.textoCapitulo}</h3>
                <h5 className="tarjeta-tipo">{tarjeta.tipoCarta}</h5>
                <h4 className="tarjeta-texto">{tarjeta.textoCarta}</h4>
                <span className="tarjeta-pregunta">{tarjeta.pregunta}</span>
            </div>
        </div>
    );
}
export default Tarjeta;