import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import RegistrationPage from './pages/Registration'

function App() {
  return (
    <>
      <Router>

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegistrationPage />} />
        </Routes>

      </Router>
      
    </>
  )
}

export default App