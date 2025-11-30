import React, { useState } from 'react';
import './Product.css';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);

  const products = [
    {
      id: 1,
      name: 'Luxury Foundation Set',
      category: 'makeup',
      price: '₦15,000',
      originalPrice: '₦18,000',
      image: 'Images/product-1.jpg',
      rating: 5,
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 2,
      name: 'Professional Makeup Brush Set',
      category: 'tools',
      price: '₦12,000',
      originalPrice: null,
      image: 'Images/product-2.jpg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 3,
      name: 'Hydrating Face Serum',
      category: 'skincare',
      price: '₦8,500',
      originalPrice: '₦10,000',
      image: 'Images/product-3.jpg',
      rating: 5,
      inStock: true,
      badge: 'Sale'
    },
    {
      id: 4,
      name: 'Matte Lipstick Collection',
      category: 'makeup',
      price: '₦6,000',
      originalPrice: null,
      image: 'Images/product-4.jpg',
      rating: 4,
      inStock: true,
      badge: 'New'
    },
    {
      id: 5,
      name: 'Vitamin C Face Cream',
      category: 'skincare',
      price: '₦9,500',
      originalPrice: null,
      image: 'Images/product-5.jpg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 6,
      name: 'Eye Shadow Palette',
      category: 'makeup',
      price: '₦11,000',
      originalPrice: '₦13,500',
      image: 'Images/product-6.jpg',
      rating: 5,
      inStock: true,
      badge: 'Sale'
    },
    {
      id: 7,
      name: 'Hair Growth Oil',
      category: 'haircare',
      price: '₦7,000',
      originalPrice: null,
      image: 'Images/product-7.jpg',
      rating: 5,
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 8,
      name: 'Nail Polish Set (12 Colors)',
      category: 'nails',
      price: '₦10,000',
      originalPrice: null,
      image: 'Images/product-8.jpg',
      rating: 4,
      inStock: true,
      badge: null
    },
    {
      id: 9,
      name: 'Cleansing Face Wash',
      category: 'skincare',
      price: '₦5,500',
      originalPrice: null,
      image: 'Images/product-9.jpg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 10,
      name: 'Contouring Kit Pro',
      category: 'makeup',
      price: '₦14,000',
      originalPrice: '₦16,000',
      image: 'Images/product-10.jpg',
      rating: 5,
      inStock: false,
      badge: 'Out of Stock'
    },
    {
      id: 11,
      name: 'Beauty Blender Set',
      category: 'tools',
      price: '₦4,500',
      originalPrice: null,
      image: 'Images/product-11.jpg',
      rating: 5,
      inStock: true,
      badge: null
    },
    {
      id: 12,
      name: 'Hair Treatment Mask',
      category: 'haircare',
      price: '₦8,000',
      originalPrice: null,
      image: 'Images/product-12.jpg',
      rating: 4,
      inStock: true,
      badge: 'New'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'makeup', name: 'Makeup', icon: '💄' },
    { id: 'skincare', name: 'Skincare', icon: '🌸' },
    { id: 'haircare', name: 'Hair Care', icon: '💇' },
    { id: 'nails', name: 'Nails', icon: '💅' },
    { id: 'tools', name: 'Tools', icon: '🖌️' }
  ];

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

  const addToCart = (productName) => {
    setCartCount(cartCount + 1);
    alert(`${productName} added to cart!`);
  };

  return (
    <div className="products-container">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Premium beauty products carefully selected for you</p>
        {/* <div className="cart-icon">
          🛒 <span className="cart-count">{cartCount}</span>
        </div> */}
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
                <span className="current-price">{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">{product.originalPrice}</span>
                )}
              </div>

              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product.name)}
                disabled={!product.inStock}
              >
                {product.inStock ? '🛒 Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        ))}
      </div>

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