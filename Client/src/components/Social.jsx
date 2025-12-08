// SocialIcons.jsx
import React from 'react';
import { FaWhatsapp, FaFacebook } from 'react-icons/fa';
import './Social.css';

export default function SocialIcons() {
  // Replace with your actual links
  const whatsappNumber = '2348123456789'; // Your WhatsApp number
  const facebookUrl = 'https://facebook.com/yourpage'; // Your Facebook page

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hello! I would like to inquire about your services.');
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const handleFacebook = () => {
    window.open(facebookUrl, '_blank');
  };

  return (
    <div className="social-icons-container">
      {/* WhatsApp Icon */}
      <button 
        className="social-icon whatsapp-icon"
        onClick={handleWhatsApp}
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp />
      </button>

      {/* Facebook Icon */}
      <button 
        className="social-icon facebook-icon"
        onClick={handleFacebook}
        aria-label="Visit our Facebook page"
      >
        <FaFacebook />
      </button>
    </div>
  );
}