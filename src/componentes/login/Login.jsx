import { useState } from "react";
import { logear } from "../../api/usuarioServicio";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexto/AuthProvider";

function Login() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contrasena, setContrasena] = useState("");

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState("");
    const [exito, setExito] = useState("");

    const navegar = useNavigate();

    const { login } = useAuth();

    const iniciarSesion = async (e) => {
        e.preventDefault();

        setCargando(true);
        setError("");
        setExito("");

        try {
            const respuestaLogin = await logear(nombreUsuario, contrasena);

            login();

            setExito(respuestaLogin.message)
            setNombreUsuario("");
            setContrasena("");

            navegar("/inicio");

        } catch (error) {
            setError(error);
        }finally{
            setCargando(false);
        }
    }

    return (
        <div className="tarjeta-login">
            
            <h2 className="saludo">¡HOLA!</h2>
            <span className="subtitulo">BIENVENIDO DE NUEVO</span>

            <form className="formulario-login" onSubmit={iniciarSesion}>
            
            <div className="campo">
                <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                required
                placeholder="Nombre de usuario"
                />
            </div>

            <div className="campo">
                <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="Contraseña"
                required
                />
            </div>

            <button className="boton-principal" disabled={cargando}>
                {cargando ? "INICIANDO SESIÓN..." : "INICIAR SESIÓN"}
            </button>

            {error && <p className="mensaje-error">{error}</p>}
            {exito && <p className="mensaje-exito">{exito}</p>}
            
            </form>
        </div>
    );
}

export default Login;