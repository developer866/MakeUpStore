import React, { useState } from 'react';
import './Testimonial.css';

function Testimonials() {
  const [filter, setFilter] = useState('all');

  const testimonials = [
    {
      id: 1,
      name: 'Chioma Adeleke',
      role: 'Bride',
      image: 'Images/client/Client1.jpg',
      rating: 5,
      text: 'Mali\'s Touch made my wedding day absolutely perfect! The bridal makeup was flawless and lasted all day. I felt like a queen and received so many compliments.',
      service: 'Bridal Makeup',
      category: 'makeup'
    },
    {
      id: 2,
      name: 'Funke Adebayo',
      role: 'Corporate Executive',
      image: 'Images/client/Client2.jpg',
      rating: 5,
      text: 'I always get my makeup done here before important meetings and events. The team is professional, punctual, and knows exactly what look works for me.',
      service: 'Event Makeup',
      category: 'makeup'
    },
    {
      id: 3,
      name: 'Amaka Okonkwo',
      role: 'Fashion Influencer',
      image: 'Images/client/Client4.jpg',
      rating: 5,
      text: 'As someone who works in fashion, I\'m very particular about makeup. Mali\'s Touch never disappoints. Their attention to detail and use of quality products is outstanding!',
      service: 'Photoshoot Makeup',
      category: 'makeup'
    },
    {
      id: 4,
      name: 'Blessing Michael',
      role: 'Student',
      image: 'Images/client/Client5.jpg',
      rating: 5,
      text: 'The makeup masterclass was worth every penny! I learned so much about techniques and product selection. The instructors were patient and answered all my questions.',
      service: 'Makeup Training',
      category: 'training'
    },
    {
      id: 5,
      name: 'Zainab Ibrahim',
      role: 'Entrepreneur',
      image: 'Images/client/Client6.jpg',
      rating: 5,
      text: 'Their skincare consultation changed my life! Finally found products that work for my skin type. My complexion has improved dramatically.',
      service: 'Skincare Consultation',
      category: 'skincare'
    },
    {
      id: 6,
      name: 'Tope Adeyemi',
      role: 'Model',
      image: 'Images/client/Client7.jpg',
      rating: 5,
      text: 'I\'ve tried many beauty services in Lagos, but Mali\'s Touch is simply the best. Professional, creative, and always delivers exceptional results.',
      service: 'Full Glam Makeup',
      category: 'makeup'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Reviews' },
    { id: 'makeup', name: 'Makeup' },
    { id: 'skincare', name: 'Skincare' },
    { id: 'training', name: 'Training' }
  ];

  const filteredTestimonials = filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.category === filter);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-header">
        <h1>What Our Clients Say</h1>
        <p>Real stories from real clients who experienced the Mali's Touch difference</p>
      </div>

      <div className="filter-buttons">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-btn ${filter === category.id ? 'active' : ''}`}
            onClick={() => setFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="testimonials-grid">
        {filteredTestimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="card-header">
              <div className="client-image">
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <div className="client-info">
                <h3 className="client-name">{testimonial.name}</h3>
                <p className="client-role">{testimonial.role}</p>
              </div>
            </div>

            <div className="stars-rating">
              {renderStars(testimonial.rating)}
            </div>

            <p className="testimonial-text">{testimonial.text}</p>

            <div className="card-footer">
              <span className="service-badge">{testimonial.service}</span>
              <div className="quote-mark">"</div>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonial-stats">
        <div className="stat-item">
          <h3>500+</h3>
          <p>Happy Clients</p>
        </div>
        <div className="stat-item">
          <h3>5.0</h3>
          <p>Average Rating</p>
        </div>
        <div className="stat-item">
          <h3>98%</h3>
          <p>Client Satisfaction</p>
        </div>
        <div className="stat-item">
          <h3>3+</h3>
          <p>Years Experience</p>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;