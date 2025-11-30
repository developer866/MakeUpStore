import "./contact.css";

export default function Contact() {
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

          <form className="contact-form">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Email Address" required />
            <input type="text" placeholder="Subject" required />
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button className="cta-button">Send Message</button>
          </form>

        </section>

        {/* RIGHT — IMAGE OR INFO */}
        <section className="contact-visual-section">
          <div className="contact-visual-box">
            <h2>Mali's Store</h2>
            <p>📍 Lagos, Nigeria</p>
            <p>☎ +234 812 345 6789</p>
            <p>✉ contact@malistore.com</p>
          </div>
        </section>

      </div>
    </main>
  );
}
