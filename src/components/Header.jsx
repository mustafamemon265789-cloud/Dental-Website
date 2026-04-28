import { useState, useEffect } from 'react'
import './Header.css'

export default function Header({ activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'appointment', label: 'Appointment' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <a href="#home" className="logo">
          <div className="logo-icon">
            <svg viewBox="0 0 40 40" width="40" height="40">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6"/>
                  <stop offset="100%" stopColor="#14b8a6"/>
                </linearGradient>
              </defs>
              <path d="M20 4 C12 4 8 10 8 18 C8 28 12 36 20 36 C28 36 32 28 32 18 C32 10 28 4 20 4 Z M20 8 C24 8 27 12 27 18 C27 26 24 32 20 32 C16 32 13 26 13 18 C13 12 16 8 20 8 Z" fill="url(#logoGradient)"/>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-name">BrightSmile</span>
            <span className="logo-tagline">Dental Clinic</span>
          </div>
        </a>

        <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.id)
                setMobileMenuOpen(false)
              }}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <a href="tel:+15551234567" className="phone-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            <span>(555) 123-4567</span>
          </a>
          <button
            className="btn btn-primary header-cta"
            onClick={() => onNavigate('appointment')}
          >
            <span>Book Now</span>
          </button>
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}
