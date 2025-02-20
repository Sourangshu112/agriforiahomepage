import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductDetail } from '../components/ProductDetail';
import { featuredProducts } from './HomePage';
import { categoryProducts } from './CategoryPage';

export function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  
  // Combine all products for searching
  const allProducts = [
    ...featuredProducts,
    ...Object.values(categoryProducts).flat()
  ];
  
  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ProductDetail {...product} />
    </div>
  );
}