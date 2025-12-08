import React, { useState, useEffect, useRef } from 'react';
import './home.css'
import About from './About';
import Testimonials from '../components/Testimonial';
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const { hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <main>
      <div className='home-container'>
        <div className='home-content'>
          <section className='hero-section'>
            <h1>Welcome to <i>Mali's Touch</i></h1>
            <p>Your one-stop shop for beauty products and makeup services.</p>
            <p>Discover premium beauty products and professional makeup services tailored just for you. From luxurious skincare to stunning makeup looks, we bring out your natural beauty.</p>
            <button className='cta-button' onClick={() => navigate('/services')}>
              Explore Our Services
            </button>
          </section>
          <section className='slideshow-section'>
            <InfiniteSlideshow />
          </section>
        </div>
      </div>
      <section id='About-section'>
        <About />
      </section>
      <section>
        <Testimonials />
      </section>
    </main>
  );
}

export default Home;

function InfiniteSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const images = [
    "/Images/client/Client1.jpg", // Added leading slash for production
    "/Images/client/Client2.jpg",
    "/Images/client/Client3.jpg",
    "/Images/client/Client4.jpg",
    "/Images/client/Client5.jpg"
  ];

  // Intersection Observer for play/pause when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const currentSlider = sliderRef.current;
    if (currentSlider) {
      observer.observe(currentSlider);
    }

    return () => {
      if (currentSlider) {
        observer.unobserve(currentSlider);
      }
    };
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    if (!isInView) {
      // Clear interval when not in view
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Start auto-slide when in view
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        // Reset transition flag after animation completes
        setTimeout(() => setIsTransitioning(false), 700);
      }
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isInView, images.length, isTransitioning]);

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    // Reset transition flag
    setTimeout(() => setIsTransitioning(false), 700);
    
    // Restart auto-slide interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isInView) {
      intervalRef.current = setInterval(() => {
        if (!isTransitioning) {
          setIsTransitioning(true);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setTimeout(() => setIsTransitioning(false), 700);
        }
      }, 3000);
    }
  };

  return (
    <div className="slideshow-wrapper" ref={sliderRef}>
      <div
        className="slides-container"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          transition: 'transform 0.7s cubic-bezier(0.45, 0, 0.55, 1)'
        }}
      >
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="slide-image"
              loading={index === 0 ? "eager" : "lazy"}
              onError={(e) => {
                console.error(`Failed to load image: ${img}`);
                e.target.src = '/Images/placeholder.jpg'; // Fallback image
              }}
            />
          </div>
        ))}
      </div>

      <div className="dots-container">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
            disabled={isTransitioning}
          />
        ))}
      </div>

      <div className="status-indicator">
        {isInView ? '▶' : '⏸'}
      </div>
    </div>
  );
}