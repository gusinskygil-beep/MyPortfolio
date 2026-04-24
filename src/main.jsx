import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GilGusinskyPortfolio from './GilGusinskyPortfolio.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GilGusinskyPortfolio />
  </StrictMode>
)