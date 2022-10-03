import './App.css'
import React, { useState } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cookies from 'js-cookie'
import Login from './pages/Login.jsx'
import Landing from './pages/Landing.jsx'
import Signup from './pages/Signup.jsx'
import ClickyConfigurator from './pages/ClickyConfigurator.jsx'
import { BackendUrlProvider } from './components/BackendUrl.jsx'
import PrivateRoutes from './components/PrivateRoutes.jsx'
import Models from './pages/Models.jsx'

// make sure that axios always sends the cookies to the backend server
axios.defaults.withCredentials = true

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3004'

export default function App() {
  const [user, setUser] = useState(() => {
    // Reading value of Cookie with name 'user
    const loggedInUser = Cookies.get('user')
    console.log(`user: ${loggedInUser}`)
    if (loggedInUser) {
      // Storing cookie value in user
      return JSON.parse(loggedInUser)
    }
    return {}
  })
  return (
    <BackendUrlProvider backendUrlData={BACKEND_URL}>
      <Router>
        <Routes>
          <Route path='/' element={<Landing user={user} />} />
          <Route path='/login' element={<Login setUser={setUser} />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            {/* all protected routes here */}
          </Route>
          <Route path='/clicky' element={<ClickyConfigurator />} />
          <Route path='/models' element={<Models />} />
        </Routes>
      </Router>
    </BackendUrlProvider>
  )
}
