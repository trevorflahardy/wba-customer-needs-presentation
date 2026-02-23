/**
 * Application entry point.
 *
 * Mounts the root `<App />` component into the `#root` div defined in
 * `index.html` and wraps it in React's `<StrictMode>` to surface
 * potential problems during development.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
