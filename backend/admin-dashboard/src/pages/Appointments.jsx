import { useState, useEffect } from 'react'
import axios from 'axios'
import './Appointments.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      const response = await axios.get(`${API_URL}/appointments`, { headers })
      setAppointments(response.data)
    } catch (err) {
      setError('Failed to fetch appointments')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return

    const apiKey = localStorage.getItem('adminApiKey')
    const headers = { 'X-API-Key': apiKey }

    try {
      await axios.delete(`${API_URL}/appointments/${id}`, { headers })
      setAppointments(appointments.filter(apt => apt.id !== id))
    } catch (err) {
      setError('Failed to delete appointment')
    }
  }

  const handleExport = () => {
    const csv = [
      ['ID', 'Name', 'Email', 'Phone', 'Date', 'Time', 'Service', 'Created At'].join(','),
      ...appointments.map(apt =>
        [
          apt.id,
          `"${apt.first_name} ${apt.last_name}"`,
          apt.email,
          apt.phone,
          apt.preferred_date,
          apt.preferred_time,
          `"${apt.service}"`,
          new Date(apt.created_at).toLocaleString()
        ].join(',')
      )
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `appointments-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const filteredAppointments = filter === 'all'
    ? appointments
    : appointments.filter(apt => apt.service === filter)

  const services = [...new Set(appointments.map(apt => apt.service))]

  if (isLoading) {
    return <div className="loading">Loading appointments...</div>
  }

  return (
    <div className="appointments-page">
      <div className="page-header">
        <h1 className="page-title">Appointments</h1>
        <p className="page-subtitle">Manage patient appointments</p>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
          <button onClick={() => setError('')}>&times;</button>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div className="filter-group">
            <label>Filter: </label>
            <select
              className="form-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleExport}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export CSV
          </button>
        </div>

        {filteredAppointments.length > 0 ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map((apt) => (
                  <tr key={apt.id}>
                    <td>{apt.first_name} {apt.last_name}</td>
                    <td>{apt.email}</td>
                    <td>{apt.phone}</td>
                    <td>{apt.service}</td>
                    <td>{apt.preferred_date}</td>
                    <td>{apt.preferred_time}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(apt.id)}
                      >
                        Delete
                      </button>
                    </td>
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
            <p className="empty-state-text">No appointments found</p>
            <p className="empty-state-subtext">
              {filter !== 'all' ? 'Try changing the filter' : 'Appointments will appear here when patients book'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
