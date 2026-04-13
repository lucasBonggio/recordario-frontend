import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Principal from "./paginas/principal/Principal";
import Inicio from "./paginas/inicio/Inicio";
import ProtectedRoute from "./componentes/ProtectedRoute";
import BotonTema from "./componentes/botonTema/BotonTema";
import { useEffect } from "react";

function App() {

    useEffect(() => {
        document.title = "Recordario";
    }, [])
    
    return (
        <>
            <BotonTema />
            <Routes>
                <Route path="/" element={<Inicio />}/>
                <Route path="/inicio" element={
                    <ProtectedRoute>
                        <Principal />
                    </ProtectedRoute>}/>
            </Routes>
        </>
    )
}

export default App