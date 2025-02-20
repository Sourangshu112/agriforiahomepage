import React, { useState } from 'react';
import { MapPin, Search, ShoppingCart, User, ChevronLeft, Truck, Store } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { SearchResults } from './SearchResults';
import { useSearchStore } from '../store/search';

interface HeaderProps {
  onCartClick?: () => void;
  showBackButton?: boolean;
}

export function Header({ onCartClick, showBackButton }: HeaderProps) {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const itemCount = useCartStore((state) => state.itemCount);
  const { searchQuery, setSearchQuery, searchResults } = useSearchStore();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(true);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Top banner */}
        <div className="bg-[#2C8C1F] text-white text-center py-2 text-sm">
          10-minute delivery to your doorstep!
        </div>
        
        {/* Main header */}
        <div className="py-4 flex items-center justify-between gap-4">
          {/* Logo with back button */}
          <div className="flex items-center gap-2">
            {showBackButton && (
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-[#2C8C1F]">AGROFORIA</h1>
          </div>

          {/* Delivery Mode Toggle */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setDeliveryMode('delivery')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                deliveryMode === 'delivery' 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-600 hover:text-primary"
              )}
            >
              <Truck className="w-5 h-5" />
              <span className="font-medium">DELIVERY</span>
            </button>
            <button
              onClick={() => setDeliveryMode('pickup')}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
                deliveryMode === 'pickup' 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-gray-600 hover:text-primary"
              )}
            >
              <Store className="w-5 h-5" />
              <span className="font-medium">PICK-UP</span>
            </button>
          </div>
          
          {/* Location selector */}
          <button className="flex items-center gap-2 text-gray-700 hover:text-[#2C8C1F]">
            <MapPin className="w-5 h-5" />
            <span className="hidden sm:inline">Select Location</span>
          </button>
          
          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setShowSearchResults(true)}
              placeholder="Search for groceries, medicines, pet supplies..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-[#2C8C1F] focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            
            {/* Search Results Dropdown */}
            {showSearchResults && searchQuery && (
              <div className="absolute w-full mt-2">
                <SearchResults 
                  results={searchResults}
                  onSelect={() => setShowSearchResults(false)}
                />
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {/* Profile */}
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-gray-700 hover:text-[#2C8C1F]" />
            </button>

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