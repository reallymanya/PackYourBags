import React, { useState, useEffect } from "react";
import "./payment-modal.css"; // We'll create this css file
import { Button } from "reactstrap";

const PaymentModal = ({ totalAmount, onClose, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const handleChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      // Call parent success handler after a brief success message
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
        <div className="modal-header">
          <h3 className="text-xl font-bold">Secure Payment</h3>
          <button onClick={onClose} className="close-btn text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            &times;
          </button>
        </div>

        {success ? (
          <div className="success-view flex flex-col items-center justify-center p-8">
            <div className="check-icon mb-4">
              <i className="ri-checkbox-circle-fill text-green-500 text-5xl"></i>
            </div>
            <h4 className="text-xl font-semibold mb-2">Payment Successful!</h4>
            <p className="text-gray-600 dark:text-gray-400">Processing your booking...</p>
          </div>
        ) : (
          <form onSubmit={handlePayment} className="payment-form p-4">
            <div className="amount-display mb-6 p-4 bg-blue-50 dark:bg-gray-700 rounded-lg flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ₹{totalAmount}
              </span>
            </div>

            <div className="form-group mb-4">
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                name="number"
                placeholder="0000 0000 0000 0000"
                maxLength="19"
                required
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                onChange={handleChange}
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  maxLength="3"
                  required
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group mb-6">
              <label className="block text-sm font-medium mb-1">Card Holder Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name on Card"
                required
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                onChange={handleChange}
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  Processing...
                </>
              ) : (
                `Pay ₹${totalAmount}`
              )}
            </Button>
            
            <div className="mt-4 flex justify-center gap-4 text-2xl text-gray-400">
               <i className="ri-visa-line"></i>
               <i className="ri-mastercard-line"></i>
               <i className="ri-paypal-line"></i>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
