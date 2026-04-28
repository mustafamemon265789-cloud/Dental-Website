import { useState } from 'react'
import './Contact.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const location = {
    address: '123 Dental Street, Suite 100',
    city: 'Beverly Hills, CA 90210',
    phone: '(555) 123-4567',
    email: 'info@brightsmile.com',
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
      } else {
        alert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div className="section-title">
          <span>Get In Touch</span>
          <h2>Visit Our Clinic</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon location">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-content">
                <h4>Our Location</h4>
                <p>{location.address}</p>
                <p>{location.city}</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon phone">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-content">
                <h4>Phone Number</h4>
                <p>General: <a href="tel:+15551234567">{location.phone}</a></p>
                <p>Emergency: <a href="tel:+15559876543">(555) 987-6543</a></p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
              </div>
              <div className="contact-content">
                <h4>Email Us</h4>
                <p><a href={`mailto:${location.email}`}>{location.email}</a></p>
                <p>Response within 24 hours</p>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon clock">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div className="contact-content">
                <h4>Working Hours</h4>
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 4:00 PM</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-section">
              {submitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <path d="M22 4L12 14.01l-3-3"/>
                    </svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-textarea"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={5}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                    </svg>
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="contact-map">
            <div className="map-placeholder">
              <svg viewBox="0 0 400 300" width="100%" height="100%">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#eff6ff"/>
                    <stop offset="100%" stopColor="#f0fdf4"/>
                  </linearGradient>
                </defs>
                <rect width="400" height="300" fill="url(#mapGradient)"/>
                <line x1="0" y1="100" x2="400" y2="100" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="100" y1="0" x2="100" y2="300" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="300" y1="0" x2="300" y2="300" stroke="#cbd5e1" strokeWidth="2"/>
                <line x1="0" y1="0" x2="400" y2="300" stroke="#e2e8f0" strokeWidth="1"/>
                <line x1="400" y1="0" x2="0" y2="300" stroke="#e2e8f0" strokeWidth="1"/>
                <g className="map-marker">
                  <circle cx="200" cy="150" r="30" fill="#3b82f6" opacity="0.2"/>
                  <circle cx="200" cy="150" r="20" fill="#3b82f6" opacity="0.3"/>
                  <circle cx="200" cy="150" r="10" fill="#3b82f6"/>
                  <path d="M200 145 L200 155 M195 150 L205 150" stroke="white" strokeWidth="2"/>
                </g>
                <rect x="50" y="50" width="30" height="40" fill="#94a3b8" opacity="0.5"/>
                <rect x="320" y="200" width="40" height="50" fill="#94a3b8" opacity="0.5"/>
                <rect x="80" y="220" width="35" height="45" fill="#94a3b8" opacity="0.5"/>
                <rect x="350" y="80" width="25" height="35" fill="#94a3b8" opacity="0.5"/>
                <rect x="250" y="50" width="60" height="40" rx="5" fill="#86efac" opacity="0.4"/>
                <ellipse cx="100" cy="250" rx="40" ry="20" fill="#7dd3fc" opacity="0.4"/>
              </svg>
              <div className="map-overlay">
                <div className="map-pin">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>BrightSmile Dental</span>
                </div>
              </div>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address + ', ' + location.city)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary map-cta"
            >
              Open in Google Maps
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <path d="M15 3h6v6"/>
                <path d="M10 14L21 3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
