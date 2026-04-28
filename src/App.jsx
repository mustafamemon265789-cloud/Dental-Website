import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Appointment from './components/Appointment'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'pricing', 'appointment', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="app">
      <Header activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        <section id="home" className="hero">
          <div className="hero-bg">
            <div className="hero-gradient"></div>
            <div className="hero-pattern"></div>
          </div>
          <div className="container hero-container">
            <div className="hero-content animate-fade-in-up">
              <span className="hero-badge">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
                Trusted by 10,000+ Patients
              </span>
              <h1>
                Your Smile Starts<br />
                <span className="gradient-text">Here</span>
              </h1>
              <p className="hero-description">
                Experience world-class dental care in a comfortable, modern environment.
                Our expert team is dedicated to creating healthy, beautiful smiles that last a lifetime.
              </p>
              <div className="hero-cta">
                <button className="btn btn-primary" onClick={() => scrollToSection('appointment')}>
                  Book Appointment
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
                  </svg>
                </button>
                <button className="btn btn-secondary" onClick={() => scrollToSection('services')}>
                  Explore Services
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Happy Patients</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction Rate</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-wrapper">
                <div className="hero-image-placeholder">
                  <svg viewBox="0 0 200 200" width="200" height="200">
                    <defs>
                      <linearGradient id="toothGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6"/>
                        <stop offset="100%" stopColor="#14b8a6"/>
                      </linearGradient>
                    </defs>
                    <path d="M100 20 C60 20 40 50 40 90 C40 140 60 180 100 180 C140 180 160 140 160 90 C160 50 140 20 100 20 Z M100 40 C120 40 135 60 135 90 C135 130 120 160 100 160 C80 160 65 130 65 90 C65 60 80 40 100 40 Z" fill="url(#toothGradient)"/>
                    <circle cx="100" cy="90" r="15" fill="#3b82f6" opacity="0.3"/>
                  </svg>
                  <span>Professional Dental Care</span>
                </div>
              </div>
              <div className="hero-floating-card">
                <div className="floating-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 12H18L15 21L9 3L6 12H2"/>
                  </svg>
                </div>
                <div className="floating-text">
                  <strong>Emergency Care</strong>
                  <span>Available 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Services />
        <Pricing />
        <Appointment />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
