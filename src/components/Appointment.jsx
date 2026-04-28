import { useState } from 'react'
import './Appointment.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Appointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          preferred_date: formData.date,
          preferred_time: formData.time,
          service: formData.service,
          notes: formData.message || null,
        }),
      })
      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            service: '',
            message: '',
          })
        }, 3000)
      } else {
        alert('Failed to submit appointment. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to submit appointment. Please try again.')
    }
  }

  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ]

  const services = [
    'General Checkup',
    'Teeth Cleaning',
    'Teeth Whitening',
    'Dental Filling',
    'Root Canal',
    'Dental Crown',
    'Orthodontics',
    'Dental Implant',
    'Emergency Care',
    'Other',
  ]

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0]

  return (
    <section id="appointment" className="section appointment">
      <div className="container">
        <div className="section-title">
          <span>Book Appointment</span>
          <h2>Schedule Your Visit</h2>
        </div>

        <div className="appointment-container">
          <div className="appointment-info">
            <div className="info-card">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="info-content">
                <h4>Opening Hours</h4>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="info-content">
                <h4>Emergency Contact</h4>
                <p>24/7 Emergency Line:</p>
                <a href="tel:+15551234567">(555) 123-4567</a>
              </div>
            </div>

            <div className="info-card highlight">
              <div className="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
              </div>
              <div className="info-content">
                <h4>Same-Day Appointments</h4>
                <p>We reserve slots for urgent care. Call us to book your same-day visit.</p>
              </div>
            </div>

            <div className="appointment-visual">
              <div className="visual-decoration">
                <svg viewBox="0 0 200 200" width="200" height="200">
                  <defs>
                    <linearGradient id="visualGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6"/>
                      <stop offset="100%" stopColor="#14b8a6"/>
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="80" fill="url(#visualGradient)" opacity="0.1"/>
                  <circle cx="100" cy="100" r="60" fill="url(#visualGradient)" opacity="0.2"/>
                  <circle cx="100" cy="100" r="40" fill="url(#visualGradient)" opacity="0.3"/>
                  <path d="M100 60 L110 80 L130 80 L115 95 L120 115 L100 105 L80 115 L85 95 L70 80 L90 80 Z" fill="url(#visualGradient)"/>
                </svg>
              </div>
              <div className="visual-text">
                <span className="visual-number">98%</span>
                <span className="visual-label">Patient Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="appointment-form-wrapper">
            <form className="appointment-form" onSubmit={handleSubmit}>
              {submitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <path d="M22 4L12 14.01l-3-3"/>
                    </svg>
                  </div>
                  <h3>Request Submitted!</h3>
                  <p>Our team will contact you within 2 hours to confirm your appointment.</p>
                </div>
              ) : (
                <>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="date">Preferred Date</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="time">Preferred Time</label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select a time</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Service Needed</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Additional Notes (Optional)</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about any concerns or special requests..."
                      rows={4}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary submit-btn">
                    Request Appointment
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                    </svg>
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
