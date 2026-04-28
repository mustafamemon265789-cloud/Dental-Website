import { useState, useEffect } from 'react'
import axios from 'axios'
import './Dashboard.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    unreadMessages: 0,
    totalMessages: 0,
  })
  const [recentAppointments, setRecentAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      const [appointmentsRes, messagesRes] = await Promise.all([
        axios.get(`${API_URL}/appointments`, { headers }),
        axios.get(`${API_URL}/contact`, { headers }),
      ])

      const appointments = appointmentsRes.data
      const messages = messagesRes.data

      const today = new Date().toISOString().split('T')[0]
      const todayApps = appointments.filter(apt => apt.preferred_date === today)
      const unreadMsgs = messages.filter(msg => !msg.is_read)

      setStats({
        totalAppointments: appointments.length,
        todayAppointments: todayApps.length,
        unreadMessages: unreadMsgs.length,
        totalMessages: messages.length,
      })

      setRecentAppointments(appointments.slice(0, 5))
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">Overview of your dental practice</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{stats.totalAppointments}</div>
          <div className="stat-label">Total Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.todayAppointments}</div>
          <div className="stat-label">Today's Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.unreadMessages}</div>
          <div className="stat-label">Unread Messages</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.totalMessages}</div>
          <div className="stat-label">Total Messages</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Appointments</h3>
        </div>
        {recentAppointments.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>{apt.first_name} {apt.last_name}</td>
                    <td>{apt.service}</td>
                    <td>{apt.preferred_date}</td>
                    <td>{apt.preferred_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <p className="empty-state-text">No appointments yet</p>
            <p className="empty-state-subtext">Appointments will appear here when patients book</p>
          </div>
        )}
      </div>
    </div>
  )
}
