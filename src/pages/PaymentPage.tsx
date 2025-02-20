import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cart';
import { CreditCard, CheckCircle } from 'lucide-react';

interface PaymentFormData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const initialFormData: PaymentFormData = {
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

export function PaymentPage() {
  const [formData, setFormData] = useState<PaymentFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { items, itemCount } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 25;
  const handlingCharge = 5;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + deliveryCharge + handlingCharge + tax;

  const validateForm = () => {
    const newErrors: Partial<PaymentFormData> = {};
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Invalid card number';
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/)) {
        newErrors.expiryDate = 'Invalid expiry date (MM/YY)';
      }
      if (!formData.cvv.match(/^\d{3}$/)) {
        newErrors.cvv = 'Invalid CVV';
      }
    }

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Invalid phone number';
    }
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pincode.match(/^\d{6}$/)) {
      newErrors.pincode = 'Invalid pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof PaymentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    setIsProcessing(true);
    setShowConfirmation(false);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsSuccess(true);
    
    // Redirect to success page after 2 seconds
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-600">Thank you for your order.</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Processing payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`flex-1 p-4 border rounded-lg ${
                        paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                    >
                      <CreditCard className="w-6 h-6 mb-2" />
                      <span className="block font-medium">Card</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('upi')}
                      className={`flex-1 p-4 border rounded-lg ${
                        paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                    >
                      <span className="block text-xl mb-2">UPI</span>
                      <span className="block font-medium">UPI Payment</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('cod')}
                      className={`flex-1 p-4 border rounded-lg ${
                        paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                    >
                      <span className="block text-xl mb-2">₹</span>
                      <span className="block font-medium">Cash on Delivery</span>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 mb-6">
                      <h3 className="font-semibold">Card Details</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        {errors.cardNumber && (
                          <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                          {errors.expiryDate && (
                            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                          />
                          {errors.cvv && (
                            <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Billing Address</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-primary focus:border-primary"
                      />
                      {errors.pincode && (
                        <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Place Order
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery Charge</span>
                      <span>₹{deliveryCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Handling Charge</span>
                      <span>₹{handlingCharge}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax (18% GST)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirm Payment</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to proceed with the payment of ₹{total.toFixed(2)}?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPayment}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}