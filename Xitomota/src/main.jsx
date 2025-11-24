import { StrictMode, React } from 'react'
import { createRoot, ReactDOM } from 'react-dom/client'
import App from './App.jsx'
import './config/axiosConfig.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
