import React, { useState, useEffect, useRef } from 'react';
import './home.css'
import Testimonials from '../components/Testimonial';

function Home() {
  return (
    <main >
      <div className='home-container'>

        <div className='home-content'>
          <section className='hero-section'>
            <h1>Welcome to Mali's Touch</h1>
            <p>Your one-stop shop for beauty products and makeup services.</p>
            <p>Discover premium beauty products and professional makeup services tailored just for you. From luxurious skincare to stunning makeup looks, we bring out your natural beauty.</p>
            <button className='cta-button'>Explore Our Services</button>
          </section>
          <section className='slideshow-section'>
            <InfiniteSlideshow />
          </section>
        </div>
      </div>

      <section>
        <Testimonials />
      </section>
    </main>
  )
}

export default Home


function InfiniteSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sliderRef = useRef(null);

  const images = [
    "Images/Astro-bg.png",
    "Images/Astro-bg.png",
    "Images/Astro-bg.png",
    "Images/Astro-bg.png",
    "Images/Astro-bg.png"
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      if (sliderRef.current) {
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isInView, images.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slideshow-wrapper" ref={sliderRef}>
      <div
        className="slides-container"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img, index) => (
          <div key={index} className="slide">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="slide-image"
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
          />
        ))}
      </div>

      <div className="status-indicator">
        {isInView ? '▶' : '⏸'}
      </div>
    </div>
  );
}


