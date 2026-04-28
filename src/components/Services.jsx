import './Services.css'

const services = [
  {
    id: 1,
    title: 'Dental Fillings',
    description: 'Restore damaged teeth with our natural-looking composite fillings. We remove decay and fill the cavity to prevent further damage.',
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="#eff6ff"/>
        <path d="M32 12 C20 12 14 20 14 32 C14 44 20 52 32 52 C44 52 50 44 50 32 C50 20 44 12 32 12 Z M32 20 C38 20 42 26 42 32 C42 42 38 48 32 48 C26 48 22 42 22 32 C22 26 26 20 32 20 Z" fill="#3b82f6"/>
        <circle cx="32" cy="32" r="6" fill="#14b8a6"/>
      </svg>
    ),
    features: ['Tooth-colored fillings', 'Minimal discomfort', 'Same-day treatment'],
    image: 'filling-procedure'
  },
  {
    id: 2,
    title: 'Root Canal Therapy',
    description: 'Save infected teeth with advanced root canal treatment. Our gentle approach ensures comfort and long-lasting results.',
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="#f0fdf4"/>
        <path d="M32 12 C24 12 20 18 20 28 L20 48 C20 54 24 58 32 58 C40 58 44 54 44 48 L44 28 C44 18 40 12 32 12 Z" fill="#14b8a6"/>
        <ellipse cx="32" cy="30" rx="6" ry="8" fill="#0d9488"/>
        <ellipse cx="32" cy="42" rx="6" ry="8" fill="#0d9488"/>
      </svg>
    ),
    features: ['Advanced technology', 'Pain-free procedure', 'High success rate'],
    image: 'root-canal'
  },
  {
    id: 3,
    title: 'Teeth Whitening',
    description: 'Brighten your smile by up to 8 shades with our professional whitening treatments. Safe, effective, and long-lasting.',
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="#fffbeb"/>
        <rect x="20" y="24" width="24" height="16" rx="4" fill="#f59e0b"/>
        <rect x="24" y="28" width="16" height="8" rx="2" fill="#fef3c7"/>
        <path d="M28 32 L30 34 L36 28" stroke="#fef3c7" strokeWidth="2" fill="none"/>
      </svg>
    ),
    features: ['8 shades brighter', '1-hour treatment', 'Take-home options'],
    image: 'whitening'
  },
  {
    id: 4,
    title: 'Dental Implants',
    description: 'Replace missing teeth with natural-looking implants. Restore function and confidence with our permanent solutions.',
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="#f5f3ff"/>
        <rect x="28" y="20" width="8" height="24" rx="2" fill="#7c3aed"/>
        <rect x="26" y="44" width="12" height="12" rx="2" fill="#6d28d9"/>
        <circle cx="32" cy="24" r="3" fill="#a78bfa"/>
      </svg>
    ),
    features: ['Lifetime solution', 'Natural appearance', 'Full functionality'],
    image: 'implants'
  },
  {
    id: 5,
    title: 'Orthodontics',
    description: 'Straighten teeth at any age with traditional braces or clear aligners. Customized treatment plans for perfect results.',
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="#fdf2f8"/>
        <path d="M20 28 Q32 24 44 28" stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M20 36 Q32 40 44 36" stroke="#ec4899" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <circle cx="24" cy="27" r="3" fill="#f472b6"/>
        <circle cx="40" cy="27" r="3" fill="#f472b6"/>
        <circle cx="24" cy="37" r="3" fill="#f472b6"/>
        <circle cx="40" cy="37" r="3" fill="#f472b6"/>
      </svg>
    ),
    features: ['Metal & ceramic braces', 'Clear aligners', 'All ages welcome'],
    image: 'orthodontics'
  },
  {
    id: 6,
    title: 'Preventive Care',
    description: 'Maintain optimal oral health with regular cleanings, exams, and preventive treatments. Prevention is the best medicine.',
    icon: (
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle cx="32" cy="32" r="28" fill="#ecfeff"/>
        <path d="M32 16 L36 24 L44 24 L38 30 L40 38 L32 34 L24 38 L26 30 L20 24 L28 24 Z" fill="#06b6d4"/>
        <circle cx="32" cy="32" r="8" fill="#22d3ee" opacity="0.3"/>
      </svg>
    ),
    features: ['Regular cleanings', 'Digital X-rays', 'Oral cancer screening'],
    image: 'preventive'
  },
]

export default function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <div className="section-title">
          <span>Our Services</span>
          <h2>Comprehensive Dental Care</h2>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <article key={service.id} className="service-card">
              <div className="service-image">
                <div className="image-placeholder">
                  {service.id === 1 && (
                    <div className="procedure-visual filling">
                      <div className="tooth-outline">
                        <svg viewBox="0 0 100 100">
                          <path d="M50 10 C30 10 20 25 20 45 C20 70 30 90 50 90 C70 90 80 70 80 45 C80 25 70 10 50 10 Z" fill="none" stroke="#3b82f6" strokeWidth="2"/>
                          <circle cx="50" cy="45" r="15" fill="#3b82f6" opacity="0.2"/>
                          <circle cx="50" cy="45" r="8" fill="#3b82f6"/>
                        </svg>
                      </div>
                      <span className="procedure-label">Filling Procedure</span>
                    </div>
                  )}
                  {service.id === 2 && (
                    <div className="procedure-visual root-canal">
                      <svg viewBox="0 0 100 100">
                        <path d="M50 10 C35 10 28 22 28 40 L28 75 C28 85 35 92 50 92 C65 92 72 85 72 75 L72 40 C72 22 65 10 50 10 Z" fill="none" stroke="#14b8a6" strokeWidth="2"/>
                        <ellipse cx="50" cy="40" rx="8" ry="12" fill="#14b8a6" opacity="0.3"/>
                        <ellipse cx="50" cy="60" rx="8" ry="12" fill="#14b8a6" opacity="0.3"/>
                        <ellipse cx="50" cy="80" rx="6" ry="8" fill="#14b8a6"/>
                      </svg>
                      <span className="procedure-label">Root Canal Therapy</span>
                    </div>
                  )}
                  {service.id === 3 && (
                    <div className="procedure-visual whitening">
                      <div className="sparkle-container">
                        <svg viewBox="0 0 100 100">
                          <rect x="25" y="35" width="50" height="30" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2"/>
                          <path d="M35 45 L38 48 L45 42" stroke="#f59e0b" strokeWidth="2" fill="none"/>
                          <circle cx="70" cy="30" r="4" fill="#f59e0b"/>
                          <circle cx="20" cy="60" r="3" fill="#f59e0b"/>
                          <circle cx="80" cy="55" r="5" fill="#f59e0b"/>
                        </svg>
                      </div>
                      <span className="procedure-label">Professional Whitening</span>
                    </div>
                  )}
                  {service.id === 4 && (
                    <div className="procedure-visual implant">
                      <svg viewBox="0 0 100 100">
                        <rect x="42" y="20" width="16" height="40" rx="4" fill="#7c3aed" opacity="0.8"/>
                        <rect x="40" y="60" width="20" height="20" rx="4" fill="#6d28d9"/>
                        <circle cx="50" cy="30" r="5" fill="#a78bfa"/>
                        <line x1="45" y1="25" x2="55" y2="25" stroke="#a78bfa" strokeWidth="2"/>
                        <line x1="45" y1="35" x2="55" y2="35" stroke="#a78bfa" strokeWidth="2"/>
                      </svg>
                      <span className="procedure-label">Dental Implant</span>
                    </div>
                  )}
                  {service.id === 5 && (
                    <div className="procedure-visual orthodontics">
                      <svg viewBox="0 0 100 100">
                        <path d="M25 40 Q50 30 75 40" stroke="#ec4899" strokeWidth="3" fill="none"/>
                        <path d="M25 60 Q50 70 75 60" stroke="#ec4899" strokeWidth="3" fill="none"/>
                        <circle cx="30" cy="40" r="5" fill="#f472b6"/>
                        <circle cx="70" cy="40" r="5" fill="#f472b6"/>
                        <circle cx="30" cy="60" r="5" fill="#f472b6"/>
                        <circle cx="70" cy="60" r="5" fill="#f472b6"/>
                      </svg>
                      <span className="procedure-label">Braces Treatment</span>
                    </div>
                  )}
                  {service.id === 6 && (
                    <div className="procedure-visual preventive">
                      <svg viewBox="0 0 100 100">
                        <path d="M50 20 L55 35 L70 35 L60 45 L65 60 L50 50 L35 60 L40 45 L30 35 L45 35 Z" fill="#06b6d4" opacity="0.6"/>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 4"/>
                        <path d="M50 35 L50 65 M35 50 L65 50" stroke="#06b6d4" strokeWidth="2"/>
                      </svg>
                      <span className="procedure-label">Preventive Checkup</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M20 6L9 17L4 12"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
