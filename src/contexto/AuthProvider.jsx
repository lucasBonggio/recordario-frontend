import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_AUTH = "http://localhost:8080/api/v1/autenticacion/usuario/me";

export function AuthProvider({children}) {
    const [autenticado, setAutenticado] = useState(false);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const verificarSesion = async () => {
            try {
                await axios.get(
                    API_AUTH,
                    { 
                        headers: {"Content-Type": "application/json"},
                        withCredentials: true
                    }
                )
                setAutenticado(true);
            } catch (error) {
                setAutenticado(false);                
            }finally{
                setCargando(false);
            }
        };
        verificarSesion();
    }, [])

    const login = () => {
        setAutenticado(true);
    };

    const logout = () => {
        setAutenticado(false);
    }

    return ( 
        <AuthContext.Provider value={{ autenticado, cargando, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}