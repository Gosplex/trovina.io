import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider
      reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <BrowserRouter>
        <HelmetProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </HelmetProvider>
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
)
