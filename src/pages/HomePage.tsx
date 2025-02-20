import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FeaturedBanner } from '../components/FeaturedBanner';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { Star } from 'lucide-react';

export const categories = [
  {
    id: "fruits-vegetables",
    title: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format"
  },
  {
    id: "dairy-bread-eggs",
    title: "Dairy, Bread & Eggs",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format"
  },
  {
    id: "pharmacy",
    title: "Pharmacy",
    image: "https://images.unsplash.com/photo-1631549916768-4119b4123a21?w=500&auto=format"
  },
  {
    id: "pet-care",
    title: "Pet Care",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=500&auto=format"
  }
];

export const pharmacyProducts = [
  {
    id: "med1",
    name: "Tylenol Extra Strength",
    price: 299,
    weight: "100 tablets",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format",
    description: "Fast pain relief for headaches and fever",
    category: "pharmacy"
  },
  {
    id: "med2",
    name: "First Aid Kit",
    price: 599,
    weight: "Complete Set",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=500&auto=format",
    description: "Essential first aid supplies for emergencies",
    category: "pharmacy"
  },
  {
    id: "med3",
    name: "Multivitamin Complex",
    price: 449,
    weight: "60 capsules",
    image: "https://images.unsplash.com/photo-1626765674872-6716cc0e0abb?w=500&auto=format",
    description: "Daily essential vitamins and minerals",
    category: "pharmacy"
  },
  {
    id: "med4",
    name: "Hand Sanitizer",
    price: 149,
    weight: "500ml",
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=500&auto=format",
    description: "99.9% germ protection",
    category: "pharmacy"
  }
];

export const petProducts = [
  {
    id: "pet1",
    name: "Premium Dog Food",
    price: 899,
    weight: "3kg",
    image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=500&auto=format",
    description: "Complete nutrition for adult dogs",
    rating: 4.8,
    category: "pet-care"
  },
  {
    id: "pet2",
    name: "Cat Grooming Kit",
    price: 599,
    weight: "Set of 5",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format",
    description: "Essential grooming tools for cats",
    rating: 4.5,
    category: "pet-care"
  },
  {
    id: "pet3",
    name: "Pet Dental Care",
    price: 299,
    weight: "100g",
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format",
    description: "Dental hygiene for pets",
    rating: 4.6,
    category: "pet-care"
  },
  {
    id: "pet4",
    name: "Interactive Pet Toy",
    price: 399,
    weight: "1 piece",
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format",
    description: "Engaging toy for mental stimulation",
    rating: 4.7,
    category: "pet-care"
  }
];

export const featuredProducts = [
  {
    id: "1",
    name: "Organic Bananas",
    price: 40,
    weight: "500g",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format",
    category: "fruits-vegetables"
  },
  {
    id: "2",
    name: "Fresh Milk",
    price: 65,
    weight: "1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format",
    category: "dairy-bread-eggs"
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    price: 35,
    weight: "400g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format",
    category: "dairy-bread-eggs"
  },
  {
    id: "4",
    name: "Farm Fresh Eggs",
    price: 75,
    weight: "12 pcs",
    image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500&auto=format",
    category: "dairy-bread-eggs"
  }
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <FeaturedBanner
        title="Fresh Vegetables & Fruits"
        subtitle="Get fresh produce delivered in 10 minutes"
        image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format"
        onClick={() => navigate('/category/fruits-vegetables')}
      />

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Shop by Category</h2>
          <button 
            onClick={() => navigate('/categories')}
            className="text-primary font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              title={category.title}
              image={category.image}
              onClick={() => navigate(`/category/${category.id}`)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Featured Products</h2>
          <button 
            onClick={() => navigate('/products')}
            className="text-primary font-medium hover:underline"
          >
            See All
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pharmacy Section */}
        <section>
          <div className="mb-6">
            <FeaturedBanner
              title="Pharmacy at your doorstep!"
              subtitle="Medicines & wellness products delivered in minutes"
              image="https://images.unsplash.com/photo-1631549916768-4119b4123a21?w=800&auto=format"
              onClick={() => navigate('/category/pharmacy')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {pharmacyProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">₹{product.price}</span>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="px-4 py-1 text-sm font-medium text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pet Care Section */}
        <section>
          <div className="mb-6">
            <FeaturedBanner
              title="Pet Care"
              subtitle="Food, treats & supplies for your furry friends"
              image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format"
              onClick={() => navigate('/category/pet-care')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {petProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="font-medium text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.description}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{product.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">₹{product.price}</span>
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="px-4 py-1 text-sm font-medium text-primary border-2 border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}