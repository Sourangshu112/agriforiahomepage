import React from 'react';

interface FeaturedBannerProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText?: string;
  onClick?: () => void;
}

export function FeaturedBanner({ title, subtitle, image, buttonText = "Shop Now", onClick }: FeaturedBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-primary/80">
      <div className="relative z-10 p-6 md:p-8 flex flex-col items-start max-w-[60%]">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white/90 mb-4">{subtitle}</p>
        <button
          onClick={onClick}
          className="px-6 py-2 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
        >
          {buttonText}
        </button>
      </div>
      <img 
        src={image} 
        alt={title}
        className="absolute right-0 top-0 h-full w-[50%] object-cover object-left"
      />
    </div>
  );
}