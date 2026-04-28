import './Pricing.css'

const pricingPlans = [
  {
    id: 1,
    name: 'Essential Care',
    description: 'Perfect for regular checkups and basic treatments',
    monthlyPrice: 29,
    features: [
      '2 dental exams per year',
      '2 professional cleanings',
      'Digital X-rays (annual)',
      'Oral cancer screening',
      'Fluoride treatment',
      '10% off additional treatments',
    ],
    highlight: false,
  },
  {
    id: 2,
    name: 'Premium Plus',
    description: 'Comprehensive coverage for families',
    monthlyPrice: 59,
    features: [
      'Everything in Essential',
      '4 dental exams per year',
      'Emergency dental care',
      'Teeth whitening (annual)',
      '20% off cosmetic procedures',
      'Orthodontic consultation',
      'No waiting period',
    ],
    highlight: true,
  },
  {
    id: 3,
    name: 'Complete Care',
    description: 'All-inclusive premium dental health',
    monthlyPrice: 99,
    features: [
      'Everything in Premium Plus',
      'Unlimited dental visits',
      'Free fillings (up to 2/year)',
      'Free root canal (1/year)',
      '30% off implants & veneers',
      'Priority scheduling',
      '24/7 dentist hotline',
    ],
    highlight: false,
  },
]

const servicesPricing = [
  { category: 'General Dentistry', items: [
    { name: 'Comprehensive Exam', price: 85 },
    { name: 'Professional Cleaning', price: 120 },
    { name: 'Digital X-Ray (Full Mouth)', price: 150 },
    { name: 'Fluoride Treatment', price: 40 },
    { name: 'Dental Filling (Composite)', price: 180 },
  ]},
  { category: 'Advanced Procedures', items: [
    { name: 'Root Canal (Front Tooth)', price: 800 },
    { name: 'Root Canal (Molar)', price: 1200 },
    { name: 'Dental Crown (Porcelain)', price: 1100 },
    { name: 'Dental Bridge (3-unit)', price: 2400 },
    { name: 'Dental Implant (Single)', price: 3500 },
  ]},
  { category: 'Cosmetic Dentistry', items: [
    { name: 'Professional Whitening', price: 450 },
    { name: 'Take-Home Whitening Kit', price: 250 },
    { name: 'Porcelain Veneer (per tooth)', price: 1400 },
    { name: 'Dental Bonding', price: 350 },
    { name: 'Gum Contouring', price: 600 },
  ]},
  { category: 'Orthodontics', items: [
    { name: 'Orthodontic Consultation', price: 100 },
    { name: 'Traditional Braces', price: 4500 },
    { name: 'Ceramic Braces', price: 5500 },
    { name: 'Clear Aligners (Invisalign)', price: 5000 },
    { name: 'Retainer', price: 300 },
  ]},
]

export default function Pricing() {
  return (
    <section id="pricing" className="section pricing">
      <div className="container">
        <div className="section-title">
          <span>Transparent Pricing</span>
          <h2>Invest in Your Smile</h2>
        </div>

        {/* Membership Plans */}
        <div className="pricing-section">
          <h3 className="pricing-section-title">Dental Membership Plans</h3>
          <p className="pricing-section-description">
            Save on dental care with our affordable monthly plans. No insurance required.
          </p>
          <div className="pricing-grid">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`pricing-card ${plan.highlight ? 'highlighted' : ''}`}
              >
                {plan.highlight && (
                  <div className="popular-badge">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                    Most Popular
                  </div>
                )}
                <div className="pricing-header">
                  <h4>{plan.name}</h4>
                  <p>{plan.description}</p>
                </div>
                <div className="pricing-amount">
                  <span className="currency">$</span>
                  <span className="price">{plan.monthlyPrice}</span>
                  <span className="period">/month</span>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M20 6L9 17L4 12"/>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`btn ${plan.highlight ? 'btn-primary' : 'btn-secondary'}`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Price List */}
        <div className="pricing-section price-list-section">
          <h3 className="pricing-section-title">À La Carte Services</h3>
          <p className="pricing-section-description">
            Pay per visit with our transparent pricing. No hidden fees.
          </p>
          <div className="price-list-grid">
            {servicesPricing.map((category, catIndex) => (
              <div key={catIndex} className="price-list-category">
                <h4>{category.category}</h4>
                <div className="price-list-items">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="price-list-item">
                      <div className="price-item-info">
                        <span className="item-name">{item.name}</span>
                      </div>
                      <div className="price-item-dots"></div>
                      <span className="item-price">${item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insurance Info */}
        <div className="insurance-info">
          <div className="insurance-content">
            <div className="insurance-icon">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div className="insurance-text">
              <h4>We Accept Most Insurance Plans</h4>
              <p>
                BrightSmile Dental is in-network with Delta Dental, Cigna, Aetna, MetLife,
                Guardian, and UnitedHealthcare. Our team will handle all insurance paperwork
                and help you maximize your benefits.
              </p>
            </div>
            <button className="btn btn-secondary">
              Verify Insurance
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
