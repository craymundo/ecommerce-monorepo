
import { createRoot } from 'react-dom/client'
import React from 'react'

import './styles/reset.css'
import './styles/variables.css'
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
