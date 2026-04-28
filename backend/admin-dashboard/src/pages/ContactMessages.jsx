import { useState, useEffect } from 'react'
import axios from 'axios'
import './ContactMessages.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function ContactMessages() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      const response = await axios.get(`${API_URL}/contact`, { headers })
      setMessages(response.data)
    } catch (err) {
      setError('Failed to fetch messages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (id) => {
    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      await axios.patch(`${API_URL}/contact/${id}`, { is_read: true }, { headers })
      setMessages(messages.map(msg =>
        msg.id === id ? { ...msg, is_read: true } : msg
      ))
    } catch (err) {
      setError('Failed to update message')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      await axios.delete(`${API_URL}/contact/${id}`, { headers })
      setMessages(messages.filter(msg => msg.id !== id))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    } catch (err) {
      setError('Failed to delete message')
    }
  }

  const unreadCount = messages.filter(m => !m.is_read).length

  if (isLoading) {
    return <div className="loading">Loading messages...</div>
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1 className="page-title">Contact Messages</h1>
        <p className="page-subtitle">
          {unreadCount > 0 && (
            <span className="badge badge-danger">{unreadCount} unread</span>
          )}
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError('')}>&times;</button>
        </div>
      )}

      <div className="messages-grid">
        <div className="messages-list card">
          <div className="card-header">
            <h3 className="card-title">All Messages ({messages.length})</h3>
          </div>
          {messages.length > 0 ? (
            <div className="message-list">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message-item ${!msg.is_read ? 'unread' : ''} ${selectedMessage?.id === msg.id ? 'selected' : ''}`}
                  onClick={() => setSelectedMessage(msg)}
                >
                  <div className="message-header">
                    <span className="message-name">{msg.name}</span>
                    <span className="message-date">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="message-email">{msg.email}</div>
                  <div className="message-preview">{msg.message.substring(0, 50)}...</div>
                  {!msg.is_read && <span className="unread-dot"></span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state-text">No messages yet</p>
            </div>
          )}
        </div>

        <div className="message-detail card">
          {selectedMessage ? (
            <>
              <div className="card-header">
                <h3 className="card-title">Message Details</h3>
                <div className="detail-actions">
                  {!selectedMessage.is_read && (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleMarkAsRead(selectedMessage.id)}
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(selectedMessage.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="message-full">
                <div className="detail-row">
                  <strong>From:</strong> {selectedMessage.name}
                </div>
                <div className="detail-row">
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a>
                </div>
                <div className="detail-row">
                  <strong>Date:</strong> {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
                <div className="detail-message">
                  <strong>Message:</strong>
                  <p>{selectedMessage.message}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p className="empty-state-text">Select a message to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
