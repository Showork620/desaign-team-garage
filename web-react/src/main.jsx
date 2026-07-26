import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import './styles/roadmap.css'
import App from './App.jsx'
import ProgressProvider from './progress/ProgressProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </HashRouter>
  </StrictMode>,
)
