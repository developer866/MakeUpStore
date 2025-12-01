import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/Features/cart/cartSlice';
import './Product.css';
import Modal from '../components/Modal.jsx';
import { products, categories } from '../data/products.js';
import toast, { Toaster } from 'react-hot-toast';

function Products() {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const dispatch = useDispatch();
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      priceDisplay: product.priceDisplay,
      image: product.image
    }));
    toast.success(`${product.name} added to cart!`);
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="products-container">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Premium beauty products carefully selected for you</p>

      </div>

      <div className="category-filters">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>

      <div className="products-count">
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
      </div>

      <div className="products-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className={`product-card ${!product.inStock ? 'out-of-stock' : ''}`}>
            {product.badge && (
              <span className={`product-badge ${product.badge.toLowerCase().replace(' ', '-')}`}>
                {product.badge}
              </span>
            )}

            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay">
                <button
                  className="quick-view-btn"
                  onClick={() => setOpenModal(true)}
                  disabled={!product.inStock}
                >
                  Quick View
                </button>
              </div>

            </div>
            <div className="product-info">
              <div className="product-rating">
                {renderStars(product.rating)}
              </div>

              <h3 className="product-name">{product.name}</h3>

              <div className="product-pricing">
                <span className="current-price">{product.priceDisplay}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
              </div>

              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
                disabled={!product.inStock}
              >
                {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}

      </div>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        Product Details Coming Soon!
      </Modal>

      <div className="store-features">
        <div className="feature-item">
          <div className="feature-icon">🚚</div>
          <h3>Free Delivery</h3>
          <p>On orders above ₦20,000</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">✅</div>
          <h3>Authentic Products</h3>
          <p>100% genuine products</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">🔄</div>
          <h3>Easy Returns</h3>
          <p>7-day return policy</p>
        </div>
        <div className="feature-item">
          <div className="feature-icon">💳</div>
          <h3>Secure Payment</h3>
          <p>Safe & secure checkout</p>
        </div>
      </div>
    </div>
  );
}

export default Products;