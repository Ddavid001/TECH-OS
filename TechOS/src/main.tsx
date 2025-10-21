import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthProvider } from './hooks/useAuth'; // Asegúrate que la importación sea correcta
import { BrowserRouter } from 'react-router-dom';
import './i18n/config'; // Configuración de i18next

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider> {/* <--- AuthProvider debe envolver a App */}
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);