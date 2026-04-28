import { useState, useEffect } from 'react'
import axios from 'axios'
import './Settings.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Settings() {
  const [keyStatus, setKeyStatus] = useState(null)
  const [newKeyName, setNewKeyName] = useState('')
  const [newApiKey, setNewApiKey] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchKeyStatus()
  }, [])

  const fetchKeyStatus = async () => {
    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      const response = await axios.get(`${API_URL}/auth/status`, { headers })
      setKeyStatus(response.data)
    } catch (err) {
      setError('Failed to fetch API key status')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRotateKey = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      const response = await axios.post(`${API_URL}/auth/rotate`, { name: newKeyName }, { headers })
      setNewApiKey(response.data.api_key)
      setSuccess('API key rotated successfully! Please save the new key below.')
      localStorage.setItem('adminApiKey', response.data.api_key)
      setNewKeyName('')
      fetchKeyStatus()
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to rotate API key')
    }
  }

  const handleCopyKey = () => {
    navigator.clipboard.writeText(newApiKey)
    setSuccess('API key copied to clipboard!')
  }

  if (isLoading) {
    return <div className="loading">Loading settings...</div>
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage API keys and security</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError('')}>&times;</button>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          {success}
          <button onClick={() => setSuccess('')}>&times;</button>
        </div>
      )}

      <div className="settings-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Current API Key</h3>
          </div>
          {keyStatus?.active ? (
            <div className="key-info">
              <div className="info-row">
                <span className="label">Status:</span>
                <span className="badge badge-success">Active</span>
              </div>
              <div className="info-row">
                <span className="label">Name:</span>
                <span>{keyStatus.name}</span>
              </div>
              <div className="info-row">
                <span className="label">Created:</span>
                <span>{new Date(keyStatus.created_at).toLocaleDateString()}</span>
              </div>
              <div className="info-row">
                <span className="label">Last Used:</span>
                <span>{keyStatus.last_used ? new Date(keyStatus.last_used).toLocaleString() : 'Never'}</span>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">No active API key</p>
              <p className="empty-state-subtext">Create one below to access the API</p>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Rotate API Key</h3>
          </div>
          <form onSubmit={handleRotateKey}>
            <p className="form-description">
              Generate a new API key. This will deactivate the current key.
            </p>
            <div className="form-group">
              <label htmlFor="keyName" className="form-label">Key Name</label>
              <input
                type="text"
                id="keyName"
                className="form-input"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                placeholder="e.g., Admin Dashboard Key"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Generate New Key
            </button>
          </form>

          {newApiKey && (
            <div className="new-key-box">
              <div className="key-display">
                <code>{newApiKey}</code>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={handleCopyKey}
                >
                  Copy
                </button>
              </div>
              <p className="key-warning">
                <strong>Warning:</strong> Save this key securely. It won't be shown again!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
