import './Tarjetero.css'

import Tarjeta from './Tarjeta';

function Tarjetero({tarjetas}) {

    return ( 
        <div className="contenedor-tarjetas">
            {tarjetas.map((tarjeta) => (
                <Tarjeta key={tarjeta.tarjetaId} 
                            tarjeta={tarjeta}
                            variante='mazo' />
            ))}

        </div>
    );
}

export default Tarjetero;
