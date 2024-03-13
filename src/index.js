import React from 'react';
import { createRoot } from 'react-dom/client';  
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');
const rootInstance = createRoot(root);  
rootInstance.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
