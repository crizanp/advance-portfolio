import React from 'react';
import { Sun, Moon, Droplet } from 'lucide-react';

interface Style {
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  opacity?: number;
  darkness?: number;
  brightness?: number;
  filter?: string;
}

interface BackgroundPresetsProps {
  onSelectPreset: (style: Style) => void;
  currentStyle?: Style;
  onStyleChange?: (style: Style) => void;
}

const BackgroundPresets: React.FC<BackgroundPresetsProps> = ({ onSelectPreset, currentStyle = {}, onStyleChange }) => {
  const presets = [
    {
      id: 'dark-1',
      name: 'Dark Gradient',
      style: {
        background: 'linear-gradient(to right, #000000, #434343)',
        opacity: 0.8
      }
    },
    {
      id: 'dark-2',
      name: 'Dark Pattern',
      style: {
        backgroundColor: '#1a1a1a',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657 8.787 5.07 13.857 0H11.03zm32.284 0L49.8 6.485 48.384 7.9l-7.9-7.9h2.83zM16.686 0L10.2 6.485 11.616 7.9l7.9-7.9h-2.83zM22.344 0L13.858 8.485 15.272 9.9l7.9-7.9h-.828zm5.656 0L19.515 8.485 20.93 9.9l8.485-8.485h-1.414zM3.515 0L0 3.515 1.414 4.93 4.93 1.414 3.515 0zM56.485 0L60 3.515 58.586 4.93 55.07 1.414 56.485 0zM4.929 0L0 4.929 1.414 6.343 6.343 1.414 4.93 0zM55.07 0L60 4.929l-1.414 1.414L53.657 1.414 55.07 0zM6.343 0L0 6.343l1.414 1.414L7.757 1.414 6.343 0zm47.314 0L60 6.343 58.586 7.757 52.243 1.414 53.657 0zM7.757 0L0 7.757l1.414 1.414L9.172 1.414 7.757 0zm44.486 0L60 7.757 58.586 9.172 50.828 1.414 52.243 0zM9.172 0L0 9.172l1.414 1.414L10.586 1.414 9.172 0zm41.656 0L60 9.172l-1.414 1.414L49.414 1.414 50.828 0zM10.586 0L0 10.586l1.414 1.414L12 1.414 10.586 0zm38.828 0L60 10.586l-1.414 1.414L48 1.414 49.414 0zM12 0L0 12l1.414 1.414L13.414 1.414 12 0zm36 0L60 12l-1.414 1.414L46.586 1.414 48 0z' fill='%23404040' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        opacity: 0.9
      }
    },
    {
      id: 'bright-1',
      name: 'Bright Gradient',
      style: {
        background: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        opacity: 0.9
      }
    },
    {
      id: 'bright-2',
      name: 'Bright Pattern',
      style: {
        backgroundColor: '#ffffff',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f3f3' fill-opacity='0.4'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.85
      }
    }
  ];

  const categories = [
    { id: 'dark', name: 'Dark', presets: presets.filter(p => p.id.startsWith('dark')) },
    { id: 'bright', name: 'Bright', presets: presets.filter(p => p.id.startsWith('bright')) }
  ];

  const applyImageAdjustments = (baseStyle: Style, adjustments: Style = {}) => {
    const opacity = adjustments.opacity ?? baseStyle.opacity ?? 1;
    const darkness = adjustments.darkness ?? 0;
    const brightness = adjustments.brightness ?? 100;
    
    let style = { ...baseStyle };
    
    // Apply opacity to background only
    style.opacity = opacity;
    
    // Combine brightness and darkness into filters
    const filters = [];
    if (brightness !== 100) filters.push(`brightness(${brightness}%)`);
    if (darkness > 0) filters.push(`brightness(${100 - darkness}%)`);
    
    if (filters.length > 0) {
      style.filter = filters.join(' ');
    }
    
    return style;
  };
  
  const PreviewWithAdjustments: React.FC<{ preset: { style: Style }, adjustments: Style }> = 
    ({ preset, adjustments }) => {
    const adjustedStyle = applyImageAdjustments(preset.style, adjustments);
    return (
      <div className="w-full h-12 rounded-md mb-2 relative">
        <div className="absolute inset-0" style={adjustedStyle} />
        <div className="relative z-10 p-1 text-xs text-white font-medium">
          Sample Text
        </div>
      </div>
    );
  };
  const [selectedPreset, setSelectedPreset] = React.useState<typeof presets[0] | null>(null);

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.id} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">{category.name}</h3>
          <div className="grid grid-cols-2 gap-2">
            {category.presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset);
                  onSelectPreset(applyImageAdjustments(preset.style, currentStyle));
                }}
                className="p-2 border rounded-lg hover:bg-gray-50 text-sm"
              >
                <PreviewWithAdjustments preset={preset} adjustments={currentStyle} />
                <span className="block text-center">{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}

      {selectedPreset && onStyleChange && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Droplet className="w-4 h-4" />
              Transparency
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={(currentStyle.opacity ?? 1) * 100}
              onChange={e => {
                const newOpacity = Number(e.target.value) / 100;
                onStyleChange({ ...currentStyle, opacity: newOpacity });
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Moon className="w-4 h-4" />
              Darkness
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={currentStyle.darkness ?? 0}
              onChange={e => {
                onStyleChange({ ...currentStyle, darkness: Number(e.target.value) });
              }}
              className="w-full"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Sun className="w-4 h-4" />
              Brightness
            </label>
            <input
              type="range"
              min="0"
              max="200"
              value={currentStyle.brightness ?? 100}
              onChange={e => {
                onStyleChange({ ...currentStyle, brightness: Number(e.target.value) });
              }}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BackgroundPresets;