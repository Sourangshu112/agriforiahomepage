import React from 'react';
import { Clock } from 'lucide-react';
import { useCartStore } from '../store/cart';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  weight: string;
  image: string;
  deliveryTime?: string;
}

export function ProductCard({ id, name, price, weight, image, deliveryTime = "30 MINS" }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-48 object-contain mb-3"
        />
        {deliveryTime && (
          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {deliveryTime}
          </div>
        )}
      </div>
      <h3 className="font-medium text-gray-800 mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-2">{weight}</p>
      <div className="flex items-center justify-between">
        <span className="font-semibold">₹{price}</span>
        <button
          onClick={() => addItem({ id, name, price, quantity: 1, image })}
          className="px-4 py-1 text-sm font-medium text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
        >
          ADD
        </button>
      </div>
    </div>
  );
}