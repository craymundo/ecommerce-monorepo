
import { createRoot } from 'react-dom/client'
import React from 'react'

import './assets/styles/reset.css'
import './assets/styles/variables.css'
import "./mocks/mockProducts";
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
