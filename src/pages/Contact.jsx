// Contact.jsx
import { useState } from 'react';
import "./contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    // Mali's Store WhatsApp number (replace with actual number)
    const whatsappNumber = '2348123456789'; // Replace with your real number

    // Create formatted message
    const whatsappMessage = `*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
_Sent from Mali's Store Website_`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main className="contact-container">
      <div className="contact-content">

        {/* LEFT — TEXT & FORM */}
        <section className="contact-info-section">
          <h1>Contact Us</h1>
          <p>
            Have a question, complaint, or want to make an order?  
            Our team at <strong>Mali's Store</strong> is always ready to assist you.
          </p>

          <div className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
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

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                // required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                // required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more details..."
                rows="5"
                required
              />
            </div>

            <button className="cta-button" onClick={sendWhatsApp}>
              <span>📨</span>
              Send Message via WhatsApp
            </button>

            <div className="info-note">
              <span className="info-icon">💬</span>
              <span>Your message will open in WhatsApp where you can review and send it directly to our team.</span>
            </div>
          </div>
        </section>

        {/* RIGHT — STORE INFO */}
        <section className="contact-visual-section">
          {/* Main Info Card */}
          <div className="contact-visual-box">
            <h2>Mali's Store</h2>
            
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h3>Location</h3>
                <p>Lagos, Nigeria</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">☎</div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+234 812 345 6789</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉</div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>contact@malistore.com</p>
              </div>
            </div>
          </div>

          {/* Business Hours Card */}
          <div className="business-hours-card">
            <h3>Business Hours</h3>
            <div className="hours-row">
              <span className="hours-day">Monday - Friday</span>
              <span className="hours-time">9:00 AM - 6:00 PM</span>
            </div>
            <div className="hours-row">
              <span className="hours-day">Saturday</span>
              <span className="hours-time">10:00 AM - 4:00 PM</span>
            </div>
            <div className="hours-row">
              <span className="hours-day">Sunday</span>
              <span className="hours-closed">Closed</span>
            </div>
          </div>

          {/* Why Choose Us Card */}
          <div className="why-choose-card">
            <h3>Why Choose Mali's Store?</h3>
            <ul className="why-choose-list">
              <li>
                <span className="checkmark">✓</span>
                <span>Quality products at affordable prices</span>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <span>Fast delivery across Lagos</span>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <span>Excellent customer service</span>
              </li>
              <li>
                <span className="checkmark">✓</span>
                <span>24/7 WhatsApp support</span>
              </li>
            </ul>
          </div>
        </section>

      </div>
    </main>
  );
}