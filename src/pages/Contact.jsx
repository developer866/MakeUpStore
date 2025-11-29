import React from "react";
import './contact.css';

function Contact() {
  const contactInfo = [
    {
      title: "Chat to us",
      subtitle: "Our beauty team is here to help.",
      email: "info@malistouch.com",
      icon: "💬"
    },
    {
      title: "Visit Our Studio",
      subtitle: "Come say hello at our beauty studio.",
      address: "123 Beauty Lane, Lekki Phase 1, Lagos, Nigeria",
      icon: "💄"
    },
    {
      title: "Call Us",
      subtitle: "Mon-Fri: 9am-7pm | Sat-Sun: 10am-6pm",
      phone: "+234 802 345 6789",
      icon: "📞"
    }
  ];

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h1>Book Your Appointment</h1>
        <p>We'd love to help you look and feel amazing. Our beauty experts are ready to transform your look.</p>

        {contactInfo.map((item, index) => (
          <div key={index} className="contact-card">
            <div className="icon">{item.icon}</div>
            <div className="contact-details">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              {item.email && <p className="highlight">{item.email}</p>}
              {item.address && <p className="highlight">{item.address}</p>}
              {item.phone && <p className="highlight">{item.phone}</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="contact-form">
        <form>
          <div className="name-row">
            <input type="text" placeholder="First name" required />
            <input type="text" placeholder="Last name" required />
          </div>
          <input type="email" placeholder="Email address" required />
          <input type="tel" placeholder="Phone number" required />
          <select required>
            <option value="">Select a service</option>
            <option value="bridal-makeup">Bridal Makeup</option>
            <option value="event-makeup">Event Makeup</option>
            <option value="skincare">Skincare Treatment</option>
            <option value="hair-styling">Hair Styling</option>
            <option value="nail-care">Nail Care</option>
            <option value="training">Makeup Training</option>
            <option value="other">Other</option>
          </select>
          <textarea placeholder="Tell us about your beauty needs..." required></textarea>

          <button type="submit">Book Appointment</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;