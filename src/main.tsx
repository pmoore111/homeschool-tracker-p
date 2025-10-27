import { createRoot } from 'react-dom/client'
import "@github/spark/spark"

import App from './App.tsx'
import ErrorBoundary from './ErrorBoundary.tsx'

import "./main.css"
import "./styles/theme.css"
import "./index.css"

// Add global error handlers
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
})

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)
