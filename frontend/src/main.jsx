import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppThemeProvider from './themeprovider.jsx';
import './styles/globals.css';
import './styles/helpers.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  </React.StrictMode>
);
