import React from 'react';
import { X, Clock, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, itemCount, updateQuantity } = useCartStore();
  const navigate = useNavigate();
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryCharge = 25;
  const handlingCharge = 5;
  const total = subtotal + deliveryCharge + handlingCharge;

  const handleProceedToPayment = () => {
    if (items.length === 0) {
      alert('Please add items to your cart before proceeding to payment');
      return;
    }
    navigate('/payment');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">My Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Delivery Time */}
        <div className="flex items-center gap-2 p-4 bg-gray-50">
          <Clock className="w-5 h-5 text-primary" />
          <span className="font-medium">Delivery in 14 minutes</span>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{item.weight}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">₹{item.price * item.quantity}</span>
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      className="p-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="border-t p-4 space-y-4">
          <h3 className="font-semibold">Bill details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Items total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span>Delivery charge</span>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </div>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <span>Handling charge</span>
                <AlertCircle className="w-4 h-4 text-gray-400" />
              </div>
              <span>₹{handlingCharge}</span>
            </div>
          </div>
          <div className="flex justify-between font-semibold pt-2 border-t">
            <span>Grand total</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Proceed Button */}
        <div className="p-4 border-t">
          <button 
            onClick={handleProceedToPayment}
            className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}