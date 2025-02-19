import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';
import {
  X, Image, Type, Layout,
  Palette, Download,
  RefreshCcw, Bold,
  Italic, Underline, AlignLeft,
  AlignCenter, AlignRight, Minus,
  Plus, RotateCcw, Maximize2,
  Upload,
  Search,
  Settings,
  Sun,
  Moon,
  Droplet
} from 'lucide-react';
import ImageSearch from './ImageSearch';
import BackgroundPresets from './BackgroundPresets';
// Define the allowed text align values to fix TypeScript error
type TextAlignType = 'left' | 'center' | 'right' | 'justify';
const ImageAdjustments = ({ design, setDesign }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <Droplet className="w-4 h-4" />
          Opacity
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={design.opacity * 100}
          onChange={e => setDesign(prev => ({ ...prev, opacity: Number(e.target.value) / 100 }))}
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
          value={design.darkness || 0}
          onChange={e => setDesign(prev => ({ ...prev, darkness: Number(e.target.value) }))}
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
          value={design.brightness || 100}
          onChange={e => setDesign(prev => ({ ...prev, brightness: Number(e.target.value) }))}
          className="w-full"
        />
      </div>
    </div>
  );
};
const GRADIENTS = [
  { name: 'Classic', value: 'none' },
  { name: 'Sunset', value: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' },
  { name: 'Ocean', value: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { name: 'Forest', value: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)' },
  { name: 'Royal', value: 'linear-gradient(135deg, #3b41c5 0%, #a981bb 100%)' },
  { name: 'Night', value: 'linear-gradient(135deg, #000428 0%, #004e92 100%)' },
  { name: 'Autumn', value: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }
];

const LAYOUTS = [
  { name: 'Centered', align: 'center', justify: 'center' },
  { name: 'Top', align: 'center', justify: 'start' },
  { name: 'Bottom', align: 'center', justify: 'end' },
  { name: 'Left', align: 'start', justify: 'center' },
  { name: 'Right', align: 'end', justify: 'center' },
];

const FONTS = [
  { name: 'Classic', value: 'Georgia, serif' },
  { name: 'Modern', value: 'Arial, sans-serif' },
  { name: 'Elegant', value: 'Palatino, serif' },
  { name: 'Clean', value: 'Helvetica, sans-serif' },
  { name: 'Playful', value: 'Comic Sans MS, cursive' },
  { name: 'Monospace', value: 'Courier New, monospace' },
  { name: 'Impact', value: 'Impact, sans-serif' }
];

// Define props interface
interface QuoteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  quote?: string;
  author?: string;
}

export default function QuoteCardModal({ isOpen, onClose, quote: initialQuote = '', author: initialAuthor = '' }: QuoteCardModalProps) {
  // Initialize state with the passed props
  const [quote, setQuote] = useState(initialQuote);
  const [author, setAuthor] = useState(initialAuthor);
  const [imageUploadMethod, setImageUploadMethod] = useState<'upload' | 'search'>('upload');

  // Reset quote and author when they change from props
  useEffect(() => {
    if (isOpen) {
      setQuote(initialQuote);
      setAuthor(initialAuthor);
    }
  }, [initialQuote, initialAuthor, isOpen]);

  const [design, setDesign] = useState({
    gradient: GRADIENTS[0].value,
    layout: LAYOUTS[0],
    font: FONTS[0].value,
    fontSize: 14,
    padding: 40,
    bgColor: '#ffffff',
    textColor: '#000000',
    showQuotationMarks: true,
    borderRadius: 8,
    shadow: true,
    opacity: 0.9,
    textAlign: 'center' as TextAlignType, // Fixed TypeScript error by explicitly typing
    letterSpacing: 0,
    lineHeight: 1.4,
    bold: false,
    italic: false,
    underline: false,
    rotation: 0,
  brightness: 120, // 20% brighter
  darkness: 20, // 20% darker

  });

  const [activeTab, setActiveTab] = useState('style');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);

  // Update the refs when quote or author changes
  useEffect(() => {
    if (quoteRef.current) {
      quoteRef.current.innerText = quote;
    }
    if (authorRef.current) {
      authorRef.current.innerText = `— ${author}`;
    }
  }, [quote, author]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setBgImage(imageUrl);

    // Switch to the image tab to make sure opacity controls are visible
    setActiveTab('image');
  };

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        const dataUrl = await toPng(cardRef.current, { quality: 1.0 });
        saveAs(dataUrl, `quote-card-${Date.now()}.png`);
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  const handleReset = () => {
    setQuote(initialQuote);
    setAuthor(initialAuthor);
    setDesign({
      gradient: GRADIENTS[0].value,
      layout: LAYOUTS[0],
      font: FONTS[0].value,
      fontSize: 24,
      padding: 40,
      bgColor: '#ffffff',
      textColor: '#000000',
      showQuotationMarks: true,
      borderRadius: 8,
      shadow: true,
      opacity: 0.9,
      textAlign: 'center' as TextAlignType,
      letterSpacing: 0,
      lineHeight: 1.4,
      bold: false,
      italic: false,
      underline: false,
      rotation: 0,
  brightness: 120, // 20% brighter
  darkness: 20, // 20% darker
    });
    setBgImage(null);
  };

  if (!isOpen) return null;

  const modalClass = isFullscreen
    ? "fixed inset-0 z-[800] bg-black"
    : "fixed inset-0 z-[800] bg-black bg-opacity-75 flex items-center justify-center p-4";

  return (
    <div className={modalClass}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className={`bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col ${isFullscreen ? 'w-full h-full' : 'w-full max-w-5xl h-[90vh]'
          }`}
      >
        {/* Header remains the same */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Create Quote Card</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <Maximize2 className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Main content area with improved mobile responsiveness */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Preview Panel with improved mobile scaling */}
          <div className="flex-1 bg-gray-100 p-2 sm:p-4 md:p-6 flex items-center justify-center overflow-auto min-h-[50vh] md:min-h-0">
  <motion.div
    ref={cardRef}
    className="w-full max-w-lg aspect-video rounded-lg overflow-hidden"
    style={{
      boxShadow: design.shadow ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none',
      borderRadius: `${design.borderRadius}px`,
      transform: `rotate(${design.rotation}deg)`,
      minHeight: '200px', // Ensure minimum height on mobile
    }}
  >
    {/* Background Layer */}
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: design.bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : design.gradient,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: design.opacity, // Apply transparency to the background
        filter: `
          brightness(${design.brightness || 100}%)
          contrast(${100 - (design.darkness || 0)}%)
        `, // Apply brightness and darkness
      }}
    />

    {/* Content Layer */}
    <div
      className="w-full h-full relative flex"
      style={{
        padding: `${Math.max(20, design.padding)}px`, // Ensure minimum padding
        alignItems: design.layout.align,
        justifyContent: design.layout.justify,
      }}
    >
      <div
        className="relative max-w-full w-full"
        style={{ opacity: 1 }} // Ensure text is always fully opaque
      >
        {design.showQuotationMarks && (
          <span className="absolute -left-4 -top-4 text-4xl sm:text-6xl opacity-20">❝</span>
        )}
        <div
          style={{
            textAlign: design.textAlign,
            maxWidth: '100%', // Ensure text doesn't overflow
          }}
        >
          {/* Quote Text */}
          <div
            ref={quoteRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => setQuote(e.currentTarget.innerText)}
            className="mb-4 outline-none break-words w-full min-h-[2em]"
            style={{
              color: design.textColor,
              fontFamily: design.font,
              fontSize: `${Math.max(16, design.fontSize)}px`, // Ensure minimum font size
              lineHeight: design.lineHeight,
              letterSpacing: `${design.letterSpacing}px`,
              fontWeight: design.bold ? 'bold' : 'normal',
              fontStyle: design.italic ? 'italic' : 'normal',
              textDecoration: design.underline ? 'underline' : 'none',
              wordWrap: 'break-word', // Ensure text wraps properly
              overflowWrap: 'break-word',
            }}
          >
            {quote}
          </div>

          {/* Author Text */}
          <div
            ref={authorRef}
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => {
              const authorText = e.currentTarget.innerText;
              if (authorText.startsWith('—')) {
                setAuthor(authorText.substring(1).trim());
              } else {
                setAuthor(authorText);
              }
            }}
            className="text-base sm:text-lg outline-none break-words w-full min-h-[1.5em]"
            style={{
              color: design.textColor,
              fontFamily: design.font,
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            — {author}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</div>


          {/* Controls Panel */}
          <div className="w-full md:w-80 bg-white border-t md:border-t-0 md:border-l overflow-y-auto">
            <div className="p-4">
              <div className="flex gap-2 mb-6">
                {[
                  { id: 'style', icon: Palette, label: 'Style' },
                  { id: 'layout', icon: Layout, label: 'Layout' },
                  { id: 'text', icon: Type, label: 'Text' },
                  { id: 'image', icon: Image, label: 'Image' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-1
                      ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="text-xs">{tab.label}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {activeTab === 'style' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={design.bgColor}
                        onChange={e => setDesign(prev => ({ ...prev, bgColor: e.target.value }))}
                        className="w-full h-10 rounded cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gradient Style
                      </label>
                      <select
                        value={design.gradient}
                        onChange={e => setDesign(prev => ({ ...prev, gradient: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        {GRADIENTS.map(gradient => (
                          <option key={gradient.name} value={gradient.value}>
                            {gradient.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Border Radius
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="32"
                        value={design.borderRadius}
                        onChange={e => setDesign(prev => ({ ...prev, borderRadius: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rotation
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, rotation: prev.rotation - 1 }))}
                          className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          value={design.rotation}
                          onChange={e => setDesign(prev => ({ ...prev, rotation: Number(e.target.value) }))}
                          className="flex-1"
                        />
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, rotation: prev.rotation + 1 }))}
                          className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <RotateCcw className="w-4 h-4 transform scale-x-[-1]" />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'layout' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Layout Position
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {LAYOUTS.map(layout => (
                          <button
                            key={layout.name}
                            onClick={() => setDesign(prev => ({ ...prev, layout }))}
                            className={`p-2 border rounded-lg text-sm
                              ${design.layout.name === layout.name ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                          >
                            {layout.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Alignment
                      </label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, textAlign: 'left' as TextAlignType }))}
                          className={`flex-1 p-2 border rounded-lg ${design.textAlign === 'left' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                        >
                          <AlignLeft className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, textAlign: 'center' as TextAlignType }))}
                          className={`flex-1 p-2 border rounded-lg ${design.textAlign === 'center' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                        >
                          <AlignCenter className="w-4 h-4 mx-auto" />
                        </button>
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, textAlign: 'right' as TextAlignType }))}
                          className={`flex-1 p-2 border rounded-lg ${design.textAlign === 'right' ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                        >
                          <AlignRight className="w-4 h-4 mx-auto" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Padding
                      </label>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        value={design.padding}
                        onChange={e => setDesign(prev => ({ ...prev, padding: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="shadow"
                        checked={design.shadow}
                        onChange={e => setDesign(prev => ({ ...prev, shadow: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="shadow" className="text-sm font-medium text-gray-700">
                        Enable Shadow
                      </label>
                    </div>
                  </>
                )}

                {activeTab === 'text' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Style
                      </label>
                      <select
                        value={design.font}
                        onChange={e => setDesign(prev => ({ ...prev, font: e.target.value }))}
                        className="w-full p-2 border rounded-lg"
                      >
                        {FONTS.map(font => (
                          <option key={font.name} value={font.value}>
                            {font.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Font Size
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, fontSize: Math.max(16, prev.fontSize - 1) }))}
                          className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="range"
                          min="16"
                          max="48"
                          value={design.fontSize}
                          onChange={e => setDesign(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                          className="flex-1"
                        />
                        <button
                          onClick={() => setDesign(prev => ({ ...prev, fontSize: Math.min(48, prev.fontSize + 1) }))}
                          className="p-2 border rounded-lg hover:bg-gray-50"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Text Color
                      </label>
                      <input
                        type="color"
                        value={design.textColor}
                        onChange={e => setDesign(prev => ({ ...prev, textColor: e.target.value }))}
                        className="w-full h-10 rounded cursor-pointer"
                      />
                    </div>
                    <div className="flex gap-2 mb-4">
                      <button
                        onClick={() => setDesign(prev => ({ ...prev, bold: !prev.bold }))}
                        className={`flex-1 p-2 border rounded-lg ${design.bold ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                      >
                        <Bold className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => setDesign(prev => ({ ...prev, italic: !prev.italic }))}
                        className={`flex-1 p-2 border rounded-lg ${design.italic ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                      >
                        <Italic className="w-4 h-4 mx-auto" />
                      </button>
                      <button
                        onClick={() => setDesign(prev => ({ ...prev, underline: !prev.underline }))}
                        className={`flex-1 p-2 border rounded-lg ${design.underline ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                      >
                        <Underline className="w-4 h-4 mx-auto" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Line Height
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="2"
                        step="0.1"
                        value={design.lineHeight}
                        onChange={e => setDesign(prev => ({ ...prev, lineHeight: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Letter Spacing
                      </label>
                      <input
                        type="range"
                        min="-2"
                        max="10"
                        value={design.letterSpacing}
                        onChange={e => setDesign(prev => ({ ...prev, letterSpacing: Number(e.target.value) }))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="quotationMarks"
                        checked={design.showQuotationMarks}
                        onChange={e => setDesign(prev => ({ ...prev, showQuotationMarks: e.target.checked }))}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="quotationMarks" className="text-sm font-medium text-gray-700">
                        Show Quotation Marks
                      </label>
                    </div>
                  </>
                )}

                {activeTab === 'image' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Presets
                      </label>
                      <BackgroundPresets
                        onSelectPreset={(style) => {
                          setDesign(prev => ({
                            ...prev,
                            gradient: style.background || 'none',
                            opacity: style.opacity || 1,
                            bgColor: style.backgroundColor || prev.bgColor
                          }));
                          if (style.backgroundImage) {
                            setBgImage(style.backgroundImage);
                          } else {
                            setBgImage(null);
                          }
                        }} currentStyle={undefined} onStyleChange={undefined} />
                    </div>
                    <div className="flex gap-2 mb-4 border-b pb-4">
                      <button
                        onClick={() => setImageUploadMethod('upload')}
                        className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-1
          ${imageUploadMethod === 'upload' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <Settings className="w-5 h-5" />
                        <span className="text-xs">Setting</span>
                      </button>
                      <button
                        onClick={() => setImageUploadMethod('search')}
                        className={`flex-1 p-2 rounded-lg flex flex-col items-center gap-1
          ${imageUploadMethod === 'search' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                      >
                        <Search className="w-5 h-5" />
                        <span className="text-xs">Search</span>
                      </button>
                    </div>

                    {imageUploadMethod === 'upload' ? (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Upload Background Image
                          </label>
                          <input
                            type="file"
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="w-full p-2 mb-4"
                          />
                        </div>

                        {/* Add ImageAdjustments component */}
                        <div className="mt-4">
                          <ImageAdjustments
                            design={design}
                            setDesign={setDesign}
                          />
                        </div>

                        <div className="mt-4 mb-4">
                          <button
                            onClick={() => setBgImage(null)}
                            className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded-md hover:bg-red-200 hover:text-red-700"
                          >
                            Remove Image
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Search for Background Image
                          </label>
                          <ImageSearch onSelectImage={handleImageSelect} />
                        </div>

                        {/* Add ImageAdjustments for search method too */}
                        {bgImage && (
                          <div className="mt-4">
                            <ImageAdjustments
                              design={design}
                              setDesign={setDesign}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="border-t p-4 bg-gray-50 mt-auto">
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Reset
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}