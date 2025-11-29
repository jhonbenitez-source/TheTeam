import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { setupErrorHandler } from './errorHandler';

// Configurar supresión de errores de Firebase en modo demo
setupErrorHandler();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
