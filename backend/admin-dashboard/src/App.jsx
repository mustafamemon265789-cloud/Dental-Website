import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Appointments from './pages/Appointments'
import ContactMessages from './pages/ContactMessages'
import Settings from './pages/Settings'
import Sidebar from './components/Sidebar'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const apiKey = localStorage.getItem('adminApiKey')
    if (!apiKey) {
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post(`${API_URL}/auth/verify`, { api_key: apiKey })
      if (response.data.valid) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('adminApiKey')
      }
    } catch (err) {
      console.error('Auth check failed:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = (apiKey) => {
    localStorage.setItem('adminApiKey', apiKey)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminApiKey')
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Router>
      <div className="admin-app">
        {!isAuthenticated ? (
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        ) : (
          <>
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              onLogout={handleLogout}
            />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/contact" element={<ContactMessages />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </>
        )}
      </div>
    </Router>
  )
}

export default App
