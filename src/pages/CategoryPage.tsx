import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { categories, featuredProducts, pharmacyProducts, petProducts } from './HomePage';

const categoryProducts = {
  'fruits-vegetables': [
    {
      id: "fv1",
      name: "Fresh Apples",
      price: 120,
      weight: "1kg",
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=500&auto=format",
      category: "fruits-vegetables"
    },
    {
      id: "fv2",
      name: "Organic Carrots",
      price: 45,
      weight: "500g",
      image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format",
      category: "fruits-vegetables"
    },
    {
      id: "fv3",
      name: "Fresh Tomatoes",
      price: 35,
      weight: "500g",
      image: "https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=500&auto=format",
      category: "fruits-vegetables"
    },
    {
      id: "fv4",
      name: "Green Spinach",
      price: 30,
      weight: "250g",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format",
      category: "fruits-vegetables"
    }
  ],
  'dairy-bread-eggs': [
    {
      id: "db1",
      name: "Greek Yogurt",
      price: 85,
      weight: "400g",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&auto=format",
      category: "dairy-bread-eggs"
    },
    {
      id: "db2",
      name: "Cheese Slices",
      price: 120,
      weight: "200g",
      image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format",
      category: "dairy-bread-eggs"
    },
    {
      id: "db3",
      name: "Butter",
      price: 95,
      weight: "500g",
      image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=500&auto=format",
      category: "dairy-bread-eggs"
    },
    {
      id: "db4",
      name: "Brown Bread",
      price: 45,
      weight: "400g",
      image: "https://images.unsplash.com/photo-1598373182133-52452b9a1624?w=500&auto=format",
      category: "dairy-bread-eggs"
    }
  ],
  'pharmacy': pharmacyProducts,
  'pet-care': petProducts
};

export function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = categories.find(c => c.id === categoryId);
  const products = categoryId ? categoryProducts[categoryId as keyof typeof categoryProducts] : [];

  if (!category) {
    return <div>Category not found</div>;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{category.title}</h1>
        <p className="text-gray-600">Quality products delivered to your doorstep</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </main>
  );
}

export { categoryProducts }