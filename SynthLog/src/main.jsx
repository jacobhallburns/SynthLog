import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Boot from './boot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
)
