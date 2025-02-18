import React from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
  onClick?: () => void;
}

export function CategoryCard({ title, image, onClick }: CategoryCardProps) {
  return (
    <button 
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg aspect-square"
    >
      <img 
        src={image} 
        alt={title}
        className="w-full h-full object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
        <h3 className="text-white font-medium">{title}</h3>
      </div>
    </button>
  );
}