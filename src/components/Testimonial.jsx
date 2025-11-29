import React, { useState, useEffect } from 'react';
import './Testimonial.css';

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Chioma Adeleke',
      role: 'Bride',
      image: 'Images/client-1.jpg',
      rating: 5,
      text: 'Mali\'s Touch made my wedding day absolutely perfect! The bridal makeup was flawless and lasted all day. I felt like a queen and received so many compliments. Highly recommend!',
      service: 'Bridal Makeup'
    },
    {
      id: 2,
      name: 'Funke Adebayo',
      role: 'Corporate Executive',
      image: 'Images/client-2.jpg',
      rating: 5,
      text: 'I always get my makeup done here before important meetings and events. The team is professional, punctual, and knows exactly what look works for me. Best beauty service in Lagos!',
      service: 'Event Makeup'
    },
    {
      id: 3,
      name: 'Amaka Okonkwo',
      role: 'Fashion Influencer',
      image: 'Images/client-3.jpg',
      rating: 5,
      text: 'As someone who works in fashion, I\'m very particular about makeup. Mali\'s Touch never disappoints. Their attention to detail and use of quality products is outstanding!',
      service: 'Photoshoot Makeup'
    },
    {
      id: 4,
      name: 'Blessing Michael',
      role: 'Student',
      image: 'Images/client-4.jpg',
      rating: 5,
      text: 'The makeup masterclass was worth every penny! I learned so much about techniques and product selection. The instructors were patient and answered all my questions.',
      service: 'Makeup Training'
    },
    {
      id: 5,
      name: 'Zainab Ibrahim',
      role: 'Entrepreneur',
      image: 'Images/client-5.jpg',
      rating: 5,
      text: 'Their skincare consultation changed my life! Finally found products that work for my skin type. My complexion has improved dramatically. Thank you Mali\'s Touch!',
      service: 'Skincare Consultation'
    },
    {
      id: 6,
      name: 'Tope Adeyemi',
      role: 'Model',
      image: 'Images/client-6.jpg',
      rating: 5,
      text: 'I\'ve tried many beauty services in Lagos, but Mali\'s Touch is simply the best. Professional, creative, and always delivers exceptional results. My go-to beauty spot!',
      service: 'Full Glam Makeup'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

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

      <div className="testimonials-slider">
        <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous testimonial">
          ‹
        </button>

        <div className="testimonials-wrapper">
          <div 
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="quote-icon">"</div>
                <div className="testimonial-content">
                  <div className="stars-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                  <div className="client-info">
                    <div className="client-image">
                      <img src={testimonial.image} alt={testimonial.name} />
                    </div>
                    <div className="client-details">
                      <h3 className="client-name">{testimonial.name}</h3>
                      <p className="client-role">{testimonial.role}</p>
                      <span className="service-badge">{testimonial.service}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next testimonial">
          ›
        </button>
      </div>

      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
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
      </div>
    </div>
  );
}

export default Testimonials;