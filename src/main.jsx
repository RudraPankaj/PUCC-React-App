import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import Router from './routes/Routes.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <NotificationProvider> {/* Wrap with NotificationProvider */}
        <RouterProvider router={Router} />
      </NotificationProvider>
    </ThemeProvider>
  </StrictMode>,
)