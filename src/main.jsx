import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import PageWrapper from './Animation/PageWrapper.jsx'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <PageWrapper> */}
  <StrictMode>
    <App />
  </StrictMode>,
  {/* </PageWrapper> */}
  </BrowserRouter>
)
