import { createContext, useContext, useEffect, useState } from "react";

const TemaContexto = createContext();

export function TemaProvider({children}) {
    const [tema, setTema] = useState("claro");

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-tema",
            tema
        )
    }, [tema]);

    const cambiarTema = () => {
        setTema( t => 
                t === "claro" ? "oscuro" : "claro"
        );
    };

    return ( 
        <TemaContexto.Provider
            value={{tema, cambiarTema}}>
                {children}        
        </TemaContexto.Provider>
    );
}

export function useTema(){
    return useContext(TemaContexto);
};