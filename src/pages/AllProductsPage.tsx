import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { featuredProducts, pharmacyProducts, petProducts } from './HomePage';
import { categoryProducts } from './CategoryPage';

export function AllProductsPage() {
  const navigate = useNavigate();

  // Combine all products
  const allProducts = [
    ...featuredProducts,
    ...Object.values(categoryProducts).flat(),
    ...pharmacyProducts,
    ...petProducts
  ];

  // Remove duplicates based on product ID
  const uniqueProducts = Array.from(
    new Map(allProducts.map(product => [product.id, product])).values()
  );

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">All Products</h1>
        <p className="text-gray-600">Browse our complete collection</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uniqueProducts.map((product) => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </main>
  );
}