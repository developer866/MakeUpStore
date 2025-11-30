import React, { useState } from 'react';
import './services.css';
import { useNavigate } from 'react-router-dom';
import {services,categories } from '../data/Service.js';


function Services() {
  // const categories = service_categories;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');



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
        <button className="primary-cta-btn" onClick={() => navigate('/booking')}>Schedule Appointment</button>
      </div>
    </div>
  );
}

export default Services;