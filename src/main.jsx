import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './contexto/AuthProvider.jsx'
import App from './App.jsx'
import { TemaProvider } from './contexto/TemaContexto.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <AuthProvider>
            <TemaProvider>
                <App />
            </TemaProvider>
        </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
