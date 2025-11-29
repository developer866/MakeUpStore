import React, { useState } from 'react';
import './contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p>We'd love to hear from you. Send us a message and we'll respond as soon as possible</p>
      </div>

      <div className="contact-content">
        <div className="contact-info-section">
          <h2>Contact Information</h2>
          <p className="info-subtitle">Reach out to us through any of these channels</p>

          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Visit Us</h3>
              <p>123 Beauty Lane, Lekki Phase 1</p>
              <p>Lagos, Nigeria</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Call Us</h3>
              <p>+234 802 345 6789</p>
              <p>+234 901 234 5678</p>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email Us</h3>
              <p>info@malistouch.com</p>
              <p>bookings@malistouch.com</p>
            </div>

            <div className="info-card">
              <div className="info-icon">🕐</div>
              <h3>Working Hours</h3>
              <p>Mon - Fri: 9:00 AM - 7:00 PM</p>
              <p>Sat - Sun: 10:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="social-media">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon instagram">
                <span>📷</span>
                <span>Instagram</span>
              </a>
              <a href="#" className="social-icon facebook">
                <span>👥</span>
                <span>Facebook</span>
              </a>
              <a href="#" className="social-icon whatsapp">
                <span>💬</span>
                <span>WhatsApp</span>
              </a>
              <a href="#" className="social-icon twitter">
                <span>🐦</span>
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-form-section">
          <h2>Send Us A Message</h2>
          <p className="form-subtitle">Fill out the form below and we'll get back to you shortly</p>

          {isSubmitted && (
            <div className="success-message">
              ✓ Message sent successfully! We'll get back to you soon.
            </div>
          )}

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">Service Interested In</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="">Select a service</option>
                <option value="bridal-makeup">Bridal Makeup</option>
                <option value="event-makeup">Event Makeup</option>
                <option value="skincare">Skincare Treatment</option>
                <option value="hair-styling">Hair Styling</option>
                <option value="nail-care">Nail Care</option>
                <option value="training">Makeup Training</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your needs..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="map-section">
        <h2>Find Us On The Map</h2>
        <div className="map-placeholder">
          <div className="map-content">
            <span className="map-icon">🗺️</span>
            <p>123 Beauty Lane, Lekki Phase 1, Lagos</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="map-link">
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;