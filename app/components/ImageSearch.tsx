import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, X } from 'lucide-react';

// Define the props interface
interface ImageSearchProps {
  onSelectImage: (imageUrl: string) => void;
}

// Define the image item interface
interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
  };
}

// Image categories
const CATEGORIES = [
  { name: 'Nature', query: 'nature' },
  { name: 'Abstract', query: 'abstract' },
  { name: 'Gradient', query: 'gradient' },
  { name: 'Minimal', query: 'minimal' },
  { name: 'Dark', query: 'dark background' },
  { name: 'Light', query: 'light background' },
  { name: 'Texture', query: 'texture' },
  { name: 'Pattern', query: 'pattern' },
];

const ImageSearch: React.FC<ImageSearchProps> = ({ onSelectImage }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Note: This is a mock function. In a real app, you would use your actual API key
  const searchImages = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using the Unsplash API (you'd need to replace this with your actual API endpoint)
      // In a real implementation, use environment variables for the API key
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(searchQuery)}&per_page=20`,
        {
          headers: {
            Authorization: 'Client-ID YOUR_UNSPLASH_API_KEY', // Replace with your actual API key
          },
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data = await response.json();
      setImages(data.results);
    } catch (err) {
      setError('Failed to load images. Please try again later.');
      console.error('Error fetching images:', err);
      
      // For demo purposes, load placeholder images
      setImages(generatePlaceholderImages(searchQuery));
    } finally {
      setIsLoading(false);
    }
  };
  
  // Generate placeholder images for demo purposes
  const generatePlaceholderImages = (searchQuery: string): UnsplashImage[] => {
    return Array(12).fill(0).map((_, index) => ({
      id: `placeholder-${index}`,
      urls: {
        regular: `/api/placeholder/800/600?text=${encodeURIComponent(searchQuery)}`,
        small: `/api/placeholder/400/300?text=${encodeURIComponent(searchQuery)}`,
        thumb: `/api/placeholder/200/150?text=${encodeURIComponent(searchQuery)}`
      },
      alt_description: `Placeholder image for ${searchQuery}`,
      user: {
        name: 'Placeholder'
      }
    }));
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchImages(query);
    }
  };
  
  const handleCategoryClick = (categoryQuery: string) => {
    setQuery(categoryQuery);
    searchImages(categoryQuery);
  };
  
  // Initial load with a default category
  useEffect(() => {
    searchImages('abstract');
  }, []);
  
  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
          className="w-full p-2 pr-10 border rounded-lg"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.name}
            onClick={() => handleCategoryClick(category.query)}
            className={`px-3 py-1 text-sm rounded-full ${
              query === category.query 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
          {images.map((image) => (
            <button
              key={image.id}
              onClick={() => onSelectImage(image.urls.regular)}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={image.urls.thumb}
                alt={image.alt_description || 'Image'}
                className="w-full h-24 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSearch;