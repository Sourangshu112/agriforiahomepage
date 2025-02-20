import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResult } from '../store/search';

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: () => void;
}

export function SearchResults({ results, onSelect }: SearchResultsProps) {
  const navigate = useNavigate();

  if (results.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg py-4 px-2">
        <p className="text-gray-500 text-center">No results found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {results.map((result) => (
        <button
          key={result.id}
          onClick={() => {
            navigate(`/product/${result.id}`);
            onSelect();
          }}
          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors"
        >
          <img
            src={result.image}
            alt={result.name}
            className="w-12 h-12 object-cover rounded-md"
          />
          <div className="flex-1 text-left">
            <h3 className="font-medium text-gray-800">{result.name}</h3>
            <p className="text-sm text-gray-500">{result.category}</p>
          </div>
          <span className="font-semibold text-gray-900">₹{result.price}</span>
        </button>
      ))}
    </div>
  );
}