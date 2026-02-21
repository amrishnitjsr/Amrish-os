import { useState } from 'react'

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/amrishnitjsr', icon: '🐙' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/amrishyadav', icon: '💼' },
  { name: 'Email', url: 'mailto:amrishy2003@gmail.com', icon: '📧' },
  { name: 'Phone', url: 'tel:+919118841006', icon: '📞' },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="contact-content">
      <div className="terminal-header">
        <span className="prompt">C:\Users\Amrish&gt;</span>
        <span className="command">contact --init</span>
      </div>

      <div className="contact-grid">
        <div className="contact-form-section">
          <h3 className="section-title">📤 SEND MESSAGE</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">
                <span className="prompt">&gt;</span> NAME:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">
                <span className="prompt">&gt;</span> EMAIL:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">
                <span className="prompt">&gt;</span> MESSAGE:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message..."
                rows={4}
                required
              />
            </div>
            <button type="submit" className="submit-btn">
              [SEND MESSAGE]
            </button>
          </form>
          {submitted && (
            <div className="success-message">
              <span className="success">[OK]</span> Message sent successfully!
            </div>
          )}
        </div>

        <div className="social-section">
          <h3 className="section-title">🔗 CONNECT</h3>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <span className="social-icon">{link.icon}</span>
                <span className="social-name">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="contact-info">
            <h3 className="section-title">📍 INFO</h3>
            <p><span className="prompt">LOCATION:</span> Jaunpur, Uttar Pradesh</p>
            <p><span className="prompt">COLLEGE:</span> NIT Jamshedpur (CSE)</p>
            <p><span className="prompt">STATUS:</span> <span className="success">Open to opportunities</span></p>
            <p><span className="prompt">RESPONSE:</span> Within 24 hours</p>
          </div>
        </div>
      </div>

      <div className="terminal-output">
        <p><span className="prompt">TIP:</span> Feel free to reach out for collaborations!</p>
      </div>
    </div>
  )
}

export default Contact
