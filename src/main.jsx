import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PageWrapper from './Animation/PageWrapper.jsx'
import { AuthProvider } from './context/AuthContext.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <PageWrapper> */}
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
  
  {/* </PageWrapper> */}
  </BrowserRouter>
)
