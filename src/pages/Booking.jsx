import React, { useState } from 'react';
import './booking.css';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';

function Booking() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    services: [],
    artist: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const services = [
    { id: 'bridal-makeup', name: 'Bridal Makeup', price: '₦50,000', duration: '3-4 hours', icon: '👰' },
    { id: 'event-makeup', name: 'Special Event Makeup', price: '₦15,000', duration: '1-2 hours', icon: '💃' },
    { id: 'soft-glam', name: 'Natural/Soft Glam', price: '₦10,000', duration: '1 hour', icon: '✨' },
    { id: 'facial', name: 'Facial Treatment', price: '₦12,000', duration: '1 hour', icon: '🌸' },
    { id: 'skin-consultation', name: 'Skin Consultation', price: '₦5,000', duration: '30 mins', icon: '🔍' },
    { id: 'hair-styling', name: 'Hair Styling', price: '₦8,000', duration: '2-3 hours', icon: '💇' },
    { id: 'nails', name: 'Manicure & Pedicure', price: '₦6,000', duration: '1 hour', icon: '💅' },
    { id: 'training', name: 'Makeup Masterclass', price: '₦30,000', duration: '4 hours', icon: '🎓' }
  ];

  const artists = [
    { id: 'chioma', name: 'Chioma A.', specialty: 'Bridal & Event Makeup', image: '👩🏾' },
    { id: 'ada', name: 'Ada O.', specialty: 'Natural Glam & Skincare', image: '👩🏿' },
    { id: 'zainab', name: 'Zainab I.', specialty: 'Creative & Editorial', image: '👩🏽' },
    { id: 'blessing', name: 'Blessing M.', specialty: 'Hair & Makeup', image: '👩🏾' }
  ];

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM'
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleService = (serviceId) => {
    setFormData(prev => {
      const services = prev.services.includes(serviceId)
        ? prev.services.filter(id => id !== serviceId)
        : [...prev.services, serviceId];
      return { ...prev, services };
    });
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectedServices = services.filter(s => formData.services.includes(s.id));
  const selectedArtist = artists.find(a => a.id === formData.artist);
  
  const calculateTotal = () => {
    return selectedServices.reduce((total, service) => {
      const price = parseInt(service.price.replace(/[₦,]/g, ''));
      return total + price;
    }, 0);
  };

  const totalPrice = calculateTotal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const loadingToast = toast.loading('Sending booking confirmation...');

    try {
      // Prepare service list for email
      const servicesList = selectedServices.map((service, index) => 
        `${index + 1}. ${service.name} - ${service.price} (${service.duration})`
      ).join('\n');

      // Email template parameters for CLIENT
      const clientEmailParams = {
        to_email: formData.email,
        to_name: `${formData.firstName} ${formData.lastName}`,
        client_name: `${formData.firstName} ${formData.lastName}`,
        services: servicesList,
        artist: selectedArtist.name,
        date: formData.date,
        time: formData.time,
        total_price: `₦${totalPrice.toLocaleString()}`,
        notes: formData.notes || 'No additional notes',
      };

      // Email template parameters for BUSINESS OWNER
      const businessEmailParams = {
        to_email: 'YOUR_BUSINESS_EMAIL@gmail.com', // Replace with your email
        client_name: `${formData.firstName} ${formData.lastName}`,
        client_email: formData.email,
        client_phone: formData.phone,
        services: servicesList,
        artist: selectedArtist.name,
        date: formData.date,
        time: formData.time,
        total_price: `₦${totalPrice.toLocaleString()}`,
        notes: formData.notes || 'No additional notes',
      };

      // Send email to client
      await emailjs.send(
        'YOUR_SERVICE_ID',        // Replace with your EmailJS Service ID
        'YOUR_CLIENT_TEMPLATE_ID', // Replace with your Client Template ID
        clientEmailParams,
        'YOUR_PUBLIC_KEY'          // Replace with your EmailJS Public Key
      );

      // Send email to business owner
      await emailjs.send(
        'YOUR_SERVICE_ID',           // Replace with your EmailJS Service ID
        'YOUR_BUSINESS_TEMPLATE_ID', // Replace with your Business Template ID
        businessEmailParams,
        'YOUR_PUBLIC_KEY'             // Replace with your EmailJS Public Key
      );

      toast.dismiss(loadingToast);
      toast.success('🎉 Booking confirmed! Check your email for details.', {
        duration: 5000,
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          services: [],
          artist: '',
          date: '',
          time: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          notes: ''
        });
        setStep(1);
      }, 2000);

    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to send booking confirmation. Please try again or contact us directly.', {
        duration: 6000,
      });
      console.error('Email sending error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <Toaster 
        position="top-center"
        toastOptions={{
          success: {
            style: {
              background: '#10b981',
              color: '#fff',
            },
          },
          error: {
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
          loading: {
            style: {
              background: '#3b82f6',
              color: '#fff',
            },
          },
        }}
      />

      <div className="booking-header">
        <h1>Book Your Appointment</h1>
        <p>Transform your look with our professional beauty services</p>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <span>Select Service</span>
        </div>
        <div className={`progress-line ${step >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <span>Choose Details</span>
        </div>
        <div className={`progress-line ${step >= 3 ? 'active' : ''}`}></div>
        <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <span>Your Information</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="step-content">
            <h2>Choose Your Services</h2>
            <p className="step-subtitle">Select one or more services</p>
            {formData.services.length > 0 && (
              <div className="selected-count">
                {formData.services.length} {formData.services.length === 1 ? 'service' : 'services'} selected
              </div>
            )}
            <div className="services-grid">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`service-option ${formData.services.includes(service.id) ? 'selected' : ''}`}
                  onClick={() => toggleService(service.id)}
                >
                  {formData.services.includes(service.id) && (
                    <div className="selected-badge">✓</div>
                  )}
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.name}</h3>
                  <p className="service-price">{service.price}</p>
                  <p className="service-duration">{service.duration}</p>
                </div>
              ))}
            </div>
            <button 
              type="button" 
              className="next-btn"
              onClick={nextStep}
              disabled={formData.services.length === 0}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Choose Artist, Date & Time */}
        {step === 2 && (
          <div className="step-content">
            <h2>Select Artist, Date & Time</h2>

            {/* Artist Selection */}
            <div className="section">
              <h3>Choose Your Artist</h3>
              <div className="artists-grid">
                {artists.map(artist => (
                  <div
                    key={artist.id}
                    className={`artist-card ${formData.artist === artist.id ? 'selected' : ''}`}
                    onClick={() => handleChange('artist', artist.id)}
                  >
                    <div className="artist-image">{artist.image}</div>
                    <h4>{artist.name}</h4>
                    <p>{artist.specialty}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="section">
              <h3>Pick Date & Time</h3>
              <div className="datetime-grid">
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time</label>
                  <select
                    value={formData.time}
                    onChange={(e) => handleChange('time', e.target.value)}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="nav-buttons">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button
                type="button"
                className="next-btn"
                onClick={nextStep}
                disabled={!formData.artist || !formData.date || !formData.time}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <div className="step-content">
            <h2>Your Information</h2>

            <div className="personal-info-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    placeholder="Enter first name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    placeholder="Enter last name"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Additional Notes (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Any special requests or information we should know..."
                  rows="4"
                ></textarea>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="booking-summary">
              <h3>Booking Summary</h3>
              
              <div className="summary-section">
                <h4>Services:</h4>
                {selectedServices.map((service, index) => (
                  <div key={service.id} className="summary-item">
                    <span>{index + 1}. {service.name}</span>
                    <strong>{service.price}</strong>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-item">
                <span>Artist:</span>
                <strong>{selectedArtist?.name}</strong>
              </div>
              <div className="summary-item">
                <span>Date:</span>
                <strong>{formData.date}</strong>
              </div>
              <div className="summary-item">
                <span>Time:</span>
                <strong>{formData.time}</strong>
              </div>

              <div className="summary-divider"></div>
              
              <div className="summary-item total">
                <span>Total:</span>
                <strong>₦{totalPrice.toLocaleString()}</strong>
              </div>
            </div>

            <div className="nav-buttons">
              <button type="button" className="back-btn" onClick={prevStep}>
                Back
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Booking;