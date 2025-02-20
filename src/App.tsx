import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CategoryPage } from './pages/CategoryPage';
import { PaymentPage } from './pages/PaymentPage';
import { AllCategoriesPage } from './pages/AllCategoriesPage';
import { AllProductsPage } from './pages/AllProductsPage';
import { useCartStore } from './store/cart';

function App() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const itemCount = useCartStore((state) => state.itemCount);
  const location = useLocation();

  // Show cart when items are added
  React.useEffect(() => {
    if (itemCount > 0) {
      setIsCartOpen(true);
    }
  }, [itemCount]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onCartClick={() => setIsCartOpen(true)} 
        showBackButton={location.pathname !== '/'} 
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<AllCategoriesPage />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;