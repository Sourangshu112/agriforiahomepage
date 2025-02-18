import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, Truck, Package, User } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { cn } from '../lib/utils';

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="bg-[#2C8C1F] text-white text-center py-2 text-sm">
          10-minute delivery to your doorstep!
        </div>
        
        {/* Main header */}
        <div className="py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-[#2C8C1F]">AGROFORIA</h1>
          
          {/* Location selector */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-[#2C8C1F]">
            <MapPin className="w-5 h-5" />
            <span className="hidden sm:inline">Select Location</span>
          </button>
          
          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              placeholder="Search for groceries..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#2C8C1F] focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          
          {/* Delivery mode toggle */}
          <div className="hidden sm:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setDeliveryMode('delivery')}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-md transition-colors",
                deliveryMode === 'delivery' ? "bg-white shadow-sm" : "hover:bg-white/50"
              )}
            >
              <Truck className="w-4 h-4" />
              <span>Delivery</span>
            </button>
            <button
              onClick={() => setDeliveryMode('pickup')}
              className={cn(
                "flex items-center gap-1 px-3 py-1 rounded-md transition-colors",
                deliveryMode === 'pickup' ? "bg-white shadow-sm" : "hover:bg-white/50"
              )}
            >
              <Package className="w-4 h-4" />
              <span>Pickup</span>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Profile */}
            <div className="relative">
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User className="w-6 h-6 text-gray-700 hover:text-[#2C8C1F]" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700">
                    Sign In
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700">
                    Create Account
                  </button>
                </div>
              )}
            </div>

            {/* Cart */}
            <button className="relative p-2" onClick={onCartClick}>
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-[#2C8C1F]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2C8C1F] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}