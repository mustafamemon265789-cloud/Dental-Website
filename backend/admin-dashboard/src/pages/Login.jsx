import { useState } from 'react'
import axios from 'axios'
import './Login.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Login({ onLogin }) {
  const [apiKey, setApiKey] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/verify`, { api_key: apiKey })
      if (response.data.valid) {
        onLogin(apiKey)
      } else {
        setError('Invalid API key')
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to verify API key')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
          <h1>BrightSmile Admin</h1>
          <p>Enter your API key to access the admin dashboard</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="apiKey" className="form-label">API Key</label>
            <input
              type="password"
              id="apiKey"
              className="form-input"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary login-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Login'}
          </button>
        </form>

        <div className="login-help">
          <p>Don't have an API key?</p>
          <p className="help-text">
            Run: <code>cd backend && python generate_api_key.py</code>
          </p>
        </div>
      </div>
    </div>
  )
}
