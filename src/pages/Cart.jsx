import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart
} from '../redux/Features/cart/cartSlice';
import './cart.css';
import toast, { Toaster } from 'react-hot-toast';
function Cart() {
  const navigate = useNavigate();
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>🛒 Your cart is empty</p>
          <a href="/Products" className="continue-shopping-btn">Continue Shopping</a>
        </div>
      </div>
    );
  }
  
  const handleCheckout = () => {
    navigate('/checkout');
    console.log('Proceeding to checkout');
  };

  return (
    <div className="cart-container">
      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <p>{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">{item.priceDisplay}</p>
              </div>

              <div className="item-quantity">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="qty-btn"
                >
                  +
                </button>
              </div>

              <div className="item-total">
                <p>₦{(item.price * item.quantity).toLocaleString()}</p>
              </div>

              <button
                onClick={() => {
                  dispatch(removeFromCart(item.id));
                  toast.success(`${item.name} removed`);
                }}
                className="remove-btn"
              >
                🗑️
              </button>

            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>₦{totalPrice.toLocaleString()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>{totalPrice >= 20000 ? 'FREE' : '₦2,000'}</span>
          </div>

          <div className="summary-divider"></div>

          <div className="summary-row total">
            <span>Total</span>
            <span>₦{(totalPrice + (totalPrice >= 20000 ? 0 : 2000)).toLocaleString()}</span>
          </div>

          <button className="checkout-btn " onClick={handleCheckout}>
            Proceed to Checkout
          </button>

          <button
            onClick={() => (dispatch(clearCart()), toast.success('Cart cleared'))}
            className="clear-cart-btn"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
