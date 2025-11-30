import React, { useState } from 'react';
import './about.css';
import {useNavigate} from 'react-router-dom';

function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const accordionData = [
    {
      id: 1,
      title: 'Our Story & Mission',
      icon: '✨',
      content: `Mali's Touch was founded with a passion for enhancing natural beauty and empowering individuals through exceptional beauty services. What started as a small makeup studio has grown into a full-service beauty destination trusted by hundreds of clients across Lagos. Our mission is to enhance natural beauty, boost confidence, and provide exceptional beauty experiences. We value professionalism, creativity, integrity, and client satisfaction. Every service we provide is delivered with attention to detail, care, and a genuine desire to make you look and feel amazing.`
    },
    {
      id: 2,
      title: 'Our Services',
      icon: '💄',
      content: `We offer a comprehensive range of beauty services including Professional Makeup (bridal, events, photoshoots), Skincare Treatments (facials, consultations, skincare routines), Hair Styling (braids, weaves, updos), Nail Care (manicure & pedicure), and Makeup Training Masterclasses. Our expert team uses only premium products and advanced techniques to deliver stunning results for every occasion. Whether you need a complete bridal transformation or everyday beauty maintenance, we've got you covered.`
    },
    {
      id: 3,
      title: 'Why Choose Mali\'s Touch',
      icon: '⭐',
      content: `We stand out through our commitment to excellence and use of premium beauty products. Our team consists of experienced and certified beauty professionals who provide personalized consultations for every client. We maintain a hygienic and comfortable environment with flexible scheduling including weekends and evenings. Our competitive pricing never compromises quality. With over 500 happy clients, a 5.0 average rating, and 98% client satisfaction rate, your confidence and satisfaction are our top priorities.`
    }
  ];

  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Mali's Touch</h1>
        <p>Discover who we are and what makes us your premier beauty destination</p>
      </div>

      <div className="about-content">
        <div className="intro-section">
          <div className="intro-text">
            <h2>Excellence in Beauty Services</h2>
            <p>
              At Mali's Touch, we combine expertise, passion, and premium products to deliver
              exceptional beauty services. Our team of certified professionals is dedicated to
              helping you look and feel your absolute best for any occasion.
            </p>
          </div>
          <div className="intro-image">
            <img src="Images/about-hero.jpg" alt="Mali's Touch Beauty Studio" />
          </div>
        </div>

        <div className="accordion-section">
          <h2 className="accordion-title">Learn More About Us</h2>
          <div className="accordion-container">
            {accordionData.map((item, index) => (
              <div
                key={item.id}
                className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
              >
                <button
                  className="accordion-header"
                  onClick={() => toggleAccordion(index)}
                >
                  <span className="accordion-icon">{item.icon}</span>
                  <span className="accordion-title-text">{item.title}</span>
                  <span className="accordion-arrow">
                    {activeIndex === index ? '−' : '+'}
                  </span>
                </button>
                <div className="accordion-content">
                  <div className="accordion-content-inner">
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Experience the Mali's Touch Difference?</h2>
          <p>Book your appointment today and let us bring out your natural beauty</p>
          <div className="cta-buttons">
            <button className="primary-btn" onClick={() => navigate('/booking')}>Book Appointment</button>
            <button className="secondary-btn" onClick={() => navigate('/Contact')}>Contact Us</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;