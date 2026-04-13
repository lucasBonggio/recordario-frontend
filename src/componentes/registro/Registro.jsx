import { useState } from "react";
import { registro } from "../../api/usuarioServicio";

function Registro({cambiarTab}) {

    const [nombreUsuario, setNombreUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    const enviarDatos = async (e) => {
        e.preventDefault();

        setError("");
        setExito("");
        
        if(contrasena.length < 8){
            setError("La contraseña debe tener mas de 8 caracteres.");
            return;
        }
        
        if(!regexEmail.test(email)){
            setError("Introduzca un email válido.")
            return;
        }
        setCargando(true);
        
        try {
            const respuestaRegistro = await registro(nombreUsuario, contrasena, email);

            setExito(respuestaRegistro);

            setNombreUsuario("");
            setEmail("");
            setContrasena("");

            setTimeout(
                () => {
                cambiarTab()
                }, 1000
            )
        } catch (err) {
            setError(err.response.data);
        }finally{
            setCargando(false);
        }
    }

    return ( 
        <div>
            <h2 className="saludo">¡BIENVENIDO!</h2>
            <span className="subtitulo">REGISTRATE Y EMPEZÁ A USAR RECORDARIO</span>
            <form  className="formulario-registro" onSubmit={enviarDatos}>
                <div className="campo">
                    <input 
                        type="text"
                        value={nombreUsuario}
                        onChange={ (e) => setNombreUsuario(e.target.value)}
                        placeholder="Nombre de usuario"
                        required />
                </div>
                <div className="campo">
                    <input type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    required />
                </div>
                <div className="campo">
                    <input 
                        type="password"
                        value={contrasena} 
                        onChange={(e) => setContrasena(e.target.value)}
                        placeholder="Contraseña"
                        required/>
                </div>

                <button className="boton-principal"  disabled={cargando}>
                    {cargando ? "REGISTRANDO..." : "REGISTRARSE"}
                </button>
            </form>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}
        </div>
    );
}

export default Registro;