import { useState } from "react";
import Login  from "../../componentes/login/Login";
import Registro from "../../componentes/registro/Registro";
import './Inicio.css'

function Inicio() {
    const [tab, setTab] = useState("login");

    const cambiarTab = () => {
        setTab("login");
    }

    return (
    <div className="contenedor-principal">
        
        <div className="presentacion">
            <div className="contenedor-bienvenida">
                <h1>RECORDARIO</h1>
                <h3>APRENDÉ MÁS.</h3>
                <h3>RECORDÁ MEJOR.</h3>
                <h4>ORGANIZÁ TUS NOTAS,
                    REPASA CUANDO LO NECESITES Y
                    GENERÁ CONOCIMIENTO REAL.
                </h4>
            </div>
            <div className="contenedor-beta">
                <h4>!ADVERTENCIA!</h4>
                <p>RECORDARIO SE ENCUENTRA EN SU VERSIÓN BETA. QUIZÁS LAS PREGUNTAS SEAN MEDIAS BÁSICAS. ¡ESTAMOS TRABAJANDO EN MEJORAS!</p>
            </div>
        </div>

        <div className="panel-login">
            <div className="tabs">
                <button 
                className={`boton-tab ${tab === "login" ? "activo" : ""}`}
                onClick={() => setTab("login")}
                >
                INICIAR SESIÓN
                </button>

                <button 
                className={`boton-tab ${tab === "registro" ? "activo" : ""}`}
                onClick={() => setTab("registro")}
                >
                REGISTRO
                </button>
            </div>

            {tab === "login" && <Login />}
            {tab === "registro" && <Registro cambiarTab= {cambiarTab}/>}

            <div className="switch-auth">
                {tab === "login" ? (
                    <>
                        <label>¿TODAVÍA NO TENÉS CUENTA?</label>
                        <span onClick={() => setTab("registro")}>REGISTRATE</span>
                    </>
                ) : (
                    <>
                        <label>¿YA TENÉS UNA CUENTA?</label>
                        <span onClick={() => setTab("login")}>INICIÁ SESIÓN</span>
                    </>
                )}

            </div>

        </div>
    </div>
    );
}

export default Inicio;