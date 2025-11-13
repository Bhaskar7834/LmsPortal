// src/main.jsx (The CORRECTED version)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// 💡 CRITICAL FIX: Import your global CSS file here
import './styles/App.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);