import { Navigate } from "react-router-dom";
import { useAuth } from "../contexto/AuthProvider";

function ProtectedRoute({children}) {
    const {autenticado, cargando} = useAuth();

    if(cargando){
        return <div>Cargando...</div>
    }

    if(!autenticado){
        return <Navigate to="/" replace />
    }

    return children;
}

export default ProtectedRoute;