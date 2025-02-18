import React, { useState } from 'react';
import { Heart, Star, Share2, Minus, Plus, Info, Clock, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cart';
import { cn } from '../lib/utils';

interface ProductDetailProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  weight: string;
  image: string;
  description?: string;
  rating?: number;
  deliveryTime?: string;
}

export function ProductDetail({
  id,
  name,
  price,
  originalPrice,
  weight,
  image,
  description,
  rating = 4.5,
  deliveryTime = "14 minutes"
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const addItem = useCartStore((state) => state.addItem);
  
  // Mock data for demo
  const images = [image, image, image, image];
  const specifications = [
    { label: "Weight", value: weight },
    { label: "Shelf Life", value: "2-3 days" },
    { label: "Storage", value: "Refrigerated" }
  ];

  const handleAddToCart = () => {
    addItem({ id, name, price, quantity, image });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-white">
            <img
              src={images[selectedImage]}
              alt={name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={cn(
                  "w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2",
                  selectedImage === index ? "border-primary" : "border-transparent"
                )}
              >
                <img src={img} alt={`${name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">{name}</h1>
              <p className="text-sm text-gray-500 mb-4">{weight}</p>
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <button className="text-gray-500 hover:text-gray-700">543 Reviews</button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Heart className="w-6 h-6 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Share2 className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">₹{price}</span>
            {originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                <span className="text-sm text-green-600 font-medium">
                  {Math.round(((originalPrice - price) / originalPrice) * 100)}% Off
                </span>
              </>
            )}
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span>Delivery in {deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Info className="w-4 h-4 text-primary" />
              <span>Free delivery on orders above ₹1499</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-gray-100"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-gray-100"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          {/* Coupons */}
          <div className="space-y-3">
            <h3 className="font-medium">Available Offers</h3>
            <div className="space-y-2">
              {[
                "Get flat 12% discount with Select Kotak Bank Credit Card",
                "Get flat 10% discount with SBI Bank debit cards",
                "Get flat 10% discount with RBL Bank Credit cards"
              ].map((offer, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-xs">%</span>
                  </div>
                  <span>{offer}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 ml-auto flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-12 space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Product Details</h2>
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium mb-4">Specifications</h3>
                <dl className="space-y-3">
                  {specifications.map(({ label, value }) => (
                    <div key={label} className="grid grid-cols-2 gap-4">
                      <dt className="text-gray-500">{label}</dt>
                      <dd className="font-medium">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="font-medium mb-4">Description</h3>
                <p className="text-gray-600">
                  {description || "Fresh and juicy produce sourced directly from local farmers. Carefully selected and quality checked to ensure the best taste and nutritional value."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Similar Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-4">
                <img
                  src={image}
                  alt="Similar product"
                  className="w-full aspect-square object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-sm mb-1 truncate">Similar {name}</h3>
                <p className="text-sm text-gray-500 mb-2">{weight}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">₹{price}</span>
                  <button className="text-primary text-sm font-medium">Add</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}