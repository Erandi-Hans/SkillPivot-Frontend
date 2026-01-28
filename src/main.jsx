import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
    <GoogleOAuthProvider clientId="643620464773-vt4d4pr5jnl1u16cl16v7dohfoq2m21k.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)