import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/global.css'
import App from './App.jsx'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { AnonUserProvider } from './components/chat/AnonUserProvider.jsx'

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ConvexProvider client={convex}> 
      <AnonUserProvider>
         <App />
      </AnonUserProvider>
    </ConvexProvider>
    </BrowserRouter>
  </StrictMode>,
)
