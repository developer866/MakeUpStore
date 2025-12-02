import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import toast, { Toaster } from 'react-hot-toast';
import './Checkout.css';

function Checkout() {
  const { items, totalItems, totalPrice } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const invoiceRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [customerNote, setCustomerNote] = useState('');

  // Account Details
  const accountDetails = {
    bankName: 'GTBank',
    accountName: 'Beauty Services Ltd',
    accountNumber: '0123456789',
    alternativeBank: 'Access Bank',
    alternativeAccountNumber: '9876543210'
  };

  // Calculate delivery
  const deliveryFee = totalPrice >= 20000 ? 0 : 2000;
  const finalTotal = totalPrice + deliveryFee;

  // Generate Invoice Number
  const invoiceNumber = `INV-${Date.now().toString().slice(-8)}`;
  const currentDate = new Date().toLocaleDateString('en-GB');

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const downloadInvoice = async () => {
    setIsGenerating(true);
    toast.loading('Generating invoice...');

    try {
      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true
      });

      const link = document.createElement('a');
      link.download = `Invoice-${invoiceNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      toast.dismiss();
      toast.success('Invoice downloaded successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to generate invoice. Please try again.');
      console.error('Error generating invoice:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="checkout-container">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart before checking out</p>
          <button onClick={() => navigate('/products')} className="continue-shopping">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <Toaster position="top-center" />

      <div className="checkout-content">
        {/* Left Section - Instructions */}
        <div className="checkout-instructions">
          <h1>Complete Your Order</h1>
          
          <div className="instruction-card">
            <div className="instruction-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Download Your Invoice</h3>
                <p>Click the download button to save your invoice/receipt</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Make Payment</h3>
                <p>Transfer the total amount to any of the account details below</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Keep Your Receipt</h3>
                <p>Save the downloaded invoice as proof of payment</p>
              </div>
            </div>

            <div className="instruction-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Visit Our Store</h3>
                <p>Walk to our store with your receipt to pick up your items</p>
              </div>
            </div>
          </div>

          {/* Account Details Section */}
          <div className="account-details-section">
            <h2>💳 Payment Details</h2>
            
            <div className="account-card">
              <div className="account-header">
                <span className="bank-icon">🏦</span>
                <span className="bank-name">{accountDetails.bankName}</span>
              </div>
              <div className="account-info">
                <div className="info-row">
                  <span className="label">Account Name:</span>
                  <span className="value">{accountDetails.accountName}</span>
                </div>
                <div className="info-row">
                  <span className="label">Account Number:</span>
                  <div className="copy-field">
                    <span className="value">{accountDetails.accountNumber}</span>
                    <button 
                      onClick={() => copyToClipboard(accountDetails.accountNumber, 'Account number')}
                      className="copy-btn"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="account-card">
              <div className="account-header">
                <span className="bank-icon">🏦</span>
                <span className="bank-name">{accountDetails.alternativeBank}</span>
              </div>
              <div className="account-info">
                <div className="info-row">
                  <span className="label">Account Name:</span>
                  <span className="value">{accountDetails.accountName}</span>
                </div>
                <div className="info-row">
                  <span className="label">Account Number:</span>
                  <div className="copy-field">
                    <span className="value">{accountDetails.alternativeAccountNumber}</span>
                    <button 
                      onClick={() => copyToClipboard(accountDetails.alternativeAccountNumber, 'Account number')}
                      className="copy-btn"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="payment-note">
              <p>⚠️ <strong>Important:</strong> Please keep your invoice/receipt and bank transfer confirmation as proof of payment when picking up your items.</p>
            </div>
          </div>

          {/* Customer Note */}
          <div className="customer-note-section">
            <h3>📝 Add a Note (Optional)</h3>
            <textarea
              value={customerNote}
              onChange={(e) => setCustomerNote(e.target.value)}
              placeholder="Add any special instructions or delivery notes here..."
              className="note-textarea"
              rows="4"
            />
          </div>
        </div>

        {/* Right Section - Invoice Preview */}
        <div className="invoice-section">
          <div className="invoice-wrapper">
            {/* Invoice Preview */}
            <div ref={invoiceRef} className="invoice-preview">
              <div className="invoice-header">
                <div className="company-info">
                  <h2>MALI'S SERVICES</h2>
                  <p>Your Trusted Beauty Partner</p>
                  <p>📍 123 Beauty Street, Lagos, Nigeria</p>
                  <p>📞 +234 800 000 0000</p>
                </div>
                <div className="invoice-details">
                  <h3>INVOICE</h3>
                  <p><strong>Invoice #:</strong> {invoiceNumber}</p>
                  <p><strong>Date:</strong> {currentDate}</p>
                </div>
              </div>

              <div className="invoice-divider"></div>

              {/* Items Table */}
              <div className="invoice-items">
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₦{item.price.toLocaleString()}</td>
                        <td>₦{(item.price * item.quantity).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="invoice-summary">
                <div className="summary-row">
                  <span>Subtotal ({totalItems} items):</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Total Amount:</span>
                  <span>₦{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Customer Note on Invoice */}
              {customerNote && (
                <div className="invoice-note">
                  <p><strong>Customer Note:</strong></p>
                  <p>{customerNote}</p>
                </div>
              )}

              {/* Payment Instructions on Invoice */}
              <div className="invoice-payment-info">
                <h4>Payment Instructions:</h4>
                <div className="payment-detail">
                  <p><strong>Bank:</strong> {accountDetails.bankName}</p>
                  <p><strong>Account Name:</strong> {accountDetails.accountName}</p>
                  <p><strong>Account Number:</strong> {accountDetails.accountNumber}</p>
                </div>
                <p className="invoice-footer-note">
                  Please keep this invoice and your payment receipt. Bring both to our store to collect your items.
                </p>
              </div>

              <div className="invoice-footer">
                <p>Thank you for your business! 💕</p>
                <p className="footer-small">This is a computer-generated invoice</p>
              </div>
            </div>

            {/* Download Button */}
            <button 
              onClick={downloadInvoice}
              disabled={isGenerating}
              className="download-invoice-btn"
            >
              {isGenerating ? '⏳ Generating...' : '📥 Download Invoice'}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="checkout-actions">
        <button 
          onClick={() => navigate('/cart')} 
          className="back-to-cart-btn"
        >
          ← Back to Cart
        </button>
        <button 
          onClick={() => navigate('/products')} 
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Checkout;