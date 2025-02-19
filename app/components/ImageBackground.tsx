import React from 'react';
import { Sun, Moon, Droplet } from 'lucide-react';

const ImageBackground = ({ backgroundImage, style, children }) => {
  const { opacity = 1, darkness = 0, brightness = 100 } = style;
  
  // Create overlay styles for darkness and brightness
  const getFilterStyle = () => {
    const filters = [];
    
    // Convert darkness to a dark overlay
    if (darkness > 0) {
      filters.push(`brightness(${100 - darkness}%)`);
    }
    
    // Apply brightness adjustment
    if (brightness !== 100) {
      filters.push(`brightness(${brightness}%)`);
    }
    
    return filters.join(' ');
  };

  return (
    <div className="w-full h-full relative">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: opacity,
          filter: getFilterStyle()
        }}
      />
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const ImageAdjustments = ({ design, setDesign }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Droplet className="w-4 h-4" />
          Image Opacity
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={(design.opacity ?? 1) * 100}
          onChange={e => setDesign(prev => ({ 
            ...prev, 
            opacity: Number(e.target.value) / 100 
          }))}
          className="w-full"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Moon className="w-4 h-4" />
          Image Darkness
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={design.darkness ?? 0}
          onChange={e => setDesign(prev => ({ 
            ...prev, 
            darkness: Number(e.target.value) 
          }))}
          className="w-full"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Sun className="w-4 h-4" />
          Image Brightness
        </label>
        <input
          type="range"
          min="0"
          max="200"
          value={design.brightness ?? 100}
          onChange={e => setDesign(prev => ({ 
            ...prev, 
            brightness: Number(e.target.value) 
          }))}
          className="w-full"
        />
      </div>
    </div>
  );
};

export { ImageBackground, ImageAdjustments };