import React, { useState } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { CategoryCard } from './components/CategoryCard';
import { FeaturedBanner } from './components/FeaturedBanner';
import { ProductDetail } from './components/ProductDetail';
import { CartDrawer } from './components/CartDrawer';
import { useCartStore } from './store/cart';

const categories = [
  {
    title: "Fruits & Vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&auto=format"
  },
  {
    title: "Dairy, Bread & Eggs",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format"
  },
  {
    title: "Snacks & Munchies",
    image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&auto=format"
  },
  {
    title: "Beverages",
    image: "https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=500&auto=format"
  }
];

const featuredProducts = [
  {
    id: "1",
    name: "Organic Bananas",
    price: 40,
    weight: "500g",
    image: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=500&auto=format"
  },
  {
    id: "2",
    name: "Fresh Milk",
    price: 65,
    weight: "1L",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format"
  },
  {
    id: "3",
    name: "Whole Wheat Bread",
    price: 35,
    weight: "400g",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format"
  },
  {
    id: "4",
    name: "Farm Fresh Eggs",
    price: 75,
    weight: "12 pcs",
    image: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?w=500&auto=format"
  }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount);

  // Show cart when items are added
  React.useEffect(() => {
    if (itemCount > 0) {
      setIsCartOpen(true);
    }
  }, [itemCount]);

  if (selectedProduct) {
    const product = featuredProducts.find(p => p.id === selectedProduct);
    if (product) {
      return (
        <div className="min-h-screen bg-gray-50">
          <Header onCartClick={() => setIsCartOpen(true)} />
          <ProductDetail {...product} />
          <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <FeaturedBanner
          title="Fresh Vegetables & Fruits"
          subtitle="Get fresh produce delivered in 10 minutes"
          image="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format"
        />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Shop by Category</h2>
            <button className="text-primary font-medium hover:underline">View All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                image={category.image}
              />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Featured Products</h2>
            <button className="text-primary font-medium hover:underline">See All</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <div key={product.id} onClick={() => setSelectedProduct(product.id)}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <FeaturedBanner
              title="Pharmacy at your doorstep!"
              subtitle="Medicines & wellness products delivered in minutes"
              image="https://images.unsplash.com/photo-1631549916768-4119b4123a21?w=800&auto=format"
            />
          </div>
          <div>
            <FeaturedBanner
              title="Pet Care"
              subtitle="Food, treats & supplies for your furry friends"
              image="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&auto=format"
            />
          </div>
        </div>
      </main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;