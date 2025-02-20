import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from './HomePage';

export function AllCategoriesPage() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">All Categories</h1>
        <p className="text-gray-600">Browse all available categories</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => navigate(`/category/${category.id}`)}
            className="group cursor-pointer"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white font-medium text-lg">{category.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}