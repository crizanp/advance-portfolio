import React, { useState, useEffect } from 'react';
import { Search, Image as ImageIcon, X } from 'lucide-react';

// Define the props interface
interface ImageSearchProps {
  onSelectImage: (imageUrl: string) => void;
}

// Define the image item interface
interface PicsumImage {
  thumb_url: string;
  id: string;
  download_url: string;
  author: string;
  width: number;
  height: number;
}

// Image categories - we'll use these as seeds for Picsum
const CATEGORIES = [
  { name: 'Nature', query: 'nature' },
  { name: 'Abstract', query: 'abstract' },
  { name: 'Minimal', query: 'minimal' },
  { name: 'Dark', query: 'dark' },
  { name: 'Light', query: 'light' },
  { name: 'Texture', query: 'texture' },
  { name: 'Pattern', query: 'pattern' },
  { name: 'Random', query: 'random' },
];

const ImageSearch: React.FC<ImageSearchProps> = ({ onSelectImage }) => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState<PicsumImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Function to get images from Lorem Picsum
  const searchImages = async (searchQuery: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using Lorem Picsum API - no API key needed
      // We're getting a list of images and then creating appropriate URLs
      const response = await fetch('https://picsum.photos/v2/list?page=1&limit=20');
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      
      const data: PicsumImage[] = await response.json();
      
      // For more variety based on the search query, we'll use the query as a seed
      // This doesn't actually filter by content, just provides pseudo-randomization
      const seed = searchQuery.length > 0 ? 
        searchQuery.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
      
      // Add seed to each image URL
      const processedImages = data.map((img, index) => ({
        ...img,
        download_url: `https://picsum.photos/seed/${seed + index}/800/600`,
        // Create thumbnails
        thumb_url: `https://picsum.photos/seed/${seed + index}/200/150`
      }));
      
      setImages(processedImages);
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
  const generatePlaceholderImages = (searchQuery: string): any[] => {
    return Array(12).fill(0).map((_, index) => ({
      id: `placeholder-${index}`,
      download_url: `/api/placeholder/800/600?text=${encodeURIComponent(searchQuery)}`,
      thumb_url: `/api/placeholder/200/150?text=${encodeURIComponent(searchQuery)}`,
      author: 'Placeholder',
      width: 800,
      height: 600
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
              onClick={() => onSelectImage(image.download_url)}
              className="relative group overflow-hidden rounded-lg"
            >
              <img
                src={image.thumb_url || image.download_url}
                alt={`Image by ${image.author}`}
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