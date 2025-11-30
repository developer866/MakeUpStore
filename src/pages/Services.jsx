import React, { useState } from 'react';
import './services.css';
import { useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services = [
    {
      id: 1,
      category: 'makeup',
      title: 'Bridal Makeup',
      description: 'Complete bridal makeup package including trial session, airbrush makeup, and touch-up kit.',
      price: '₦50,000',
      duration: '3-4 hours',
      image: 'Images/service-1.jpg'
    },
    {
      id: 2,
      category: 'makeup',
      title: 'Special Event Makeup',
      description: 'Perfect makeup for parties, photoshoots, and special occasions.',
      price: '₦15,000',
      duration: '1-2 hours',
      image: 'Images/service-2.jpg'
    },
    {
      id: 3,
      category: 'makeup',
      title: 'Natural/Soft Glam',
      description: 'Subtle and elegant makeup for everyday beauty and professional settings.',
      price: '₦10,000',
      duration: '1 hour',
      image: 'Images/service-3.jpg'
    },
    {
      id: 4,
      category: 'skincare',
      title: 'Facial Treatment',
      description: 'Deep cleansing facial with extraction, massage, and moisturizing mask.',
      price: '₦12,000',
      duration: '1 hour',
      image: 'Images/service-4.jpg'
    },
    {
      id: 5,
      category: 'skincare',
      title: 'Skin Consultation',
      description: 'Professional skin analysis and personalized skincare routine recommendation.',
      price: '₦5,000',
      duration: '30 minutes',
      image: 'Images/service-5.jpg'
    },
    {
      id: 6,
      category: 'hair',
      title: 'Hair Styling',
      description: 'Professional hair styling for events including braids, weaves, and updos.',
      price: '₦8,000',
      duration: '2-3 hours',
      image: 'Images/service-6.jpg'
    },
    {
      id: 7,
      category: 'nails',
      title: 'Manicure & Pedicure',
      description: 'Complete nail care including filing, shaping, polish, and hand massage.',
      price: '₦6,000',
      duration: '1 hour',
      image: 'Images/service-7.jpg'
    },
    {
      id: 8,
      category: 'training',
      title: 'Makeup Masterclass',
      description: 'Learn professional makeup techniques from our expert makeup artists.',
      price: '₦30,000',
      duration: '4 hours',
      image: 'Images/service-8.jpg'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'hair', name: 'Hair' },
    { id: 'nails', name: 'Nails' },
    { id: 'training', name: 'Training' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Discover our range of professional beauty services tailored to enhance your natural beauty</p>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-image">
              <img src={service.image} alt={service.title} />
              <div className="service-overlay" onClick={() => navigate('/booking')}>
                <button className="book-btn" >Book Now</button>
              </div>
            </div>
            <div className="service-content">
              <span className="service-category">{service.category}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-details">
                <div className="service-info">
                  <span className="info-label">Duration:</span>
                  <span className="info-value">{service.duration}</span>
                </div>
                <div className="service-price">{service.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to Transform Your Look?</h2>
        <p>Book your appointment today and experience the Mali's Touch difference</p>
        <button className="primary-cta-btn">Schedule Appointment</button>
      </div>
    </div>
  );
}

export default Services;