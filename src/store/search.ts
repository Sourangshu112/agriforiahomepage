import { create } from 'zustand';
import { featuredProducts } from '../pages/HomePage';
import { categoryProducts } from '../pages/CategoryPage';

export interface SearchResult {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface SearchStore {
  searchQuery: string;
  searchResults: SearchResult[];
  setSearchQuery: (query: string) => void;
}

const allProducts = [
  ...featuredProducts,
  ...Object.values(categoryProducts).flat()
];

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query: string) => {
    const normalizedQuery = query.toLowerCase();
    const results = allProducts.filter((product) => 
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery)
    );
    set({ searchQuery: query, searchResults: results });
  },
}));