
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Viewport height fix for mobile
const setVh = () => {
  const vh = window.innerHeight * 0.01
  document.documentElement.style.setProperty('--vh', `${vh * 100}px`)
}
setVh()
window.addEventListener('resize', setVh)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
