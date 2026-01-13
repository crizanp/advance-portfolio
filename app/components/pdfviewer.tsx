import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon, ZoomInIcon, ZoomOutIcon } from 'lucide-react';

// Custom PDF Viewer Component
const PDFViewer = ({ pdfUrl, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [page, setPage] = useState(1);

  // Simulate page count (in a real implementation, you'd get this from the PDF)
  const totalPages = 10;

  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.25, 0.5));
  };

  const handleNextPage = () => {
    setPage(Math.min(page + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage(Math.max(page - 1, 1));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl h-[80vh] bg-gray-900 rounded-xl overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* PDF Viewer Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <div className="flex space-x-2">
            <button 
              onClick={handleZoomOut} 
              className="bg-gray-700 hover:bg-gray-700 p-2 rounded-full"
            >
              <ZoomOutIcon className="h-5 w-5 text-white" />
            </button>
            <button 
              onClick={handleZoomIn} 
              className="bg-gray-700 hover:bg-gray-700 p-2 rounded-full"
            >
              <ZoomInIcon className="h-5 w-5 text-white" />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={handlePrevPage} 
              disabled={page === 1}
              className="bg-gray-700 hover:bg-gray-700 p-2 rounded-full disabled:opacity-50"
            >
              <ArrowLeftIcon className="h-5 w-5 text-white" />
            </button>
            <span className="text-white">Page {page} of {totalPages}</span>
            <button 
              onClick={handleNextPage} 
              disabled={page === totalPages}
              className="bg-gray-700 hover:bg-gray-700 p-2 rounded-full disabled:opacity-50"
            >
              <ArrowRightIcon className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>

        {/* PDF Iframe Placeholder */}
        <div 
          className="w-full h-full flex items-center justify-center"
          style={{ transform: `scale(${zoom})` }}
        >
          <iframe 
            src={pdfUrl} 
            width="100%" 
            height="100%" 
            title="PDF Viewer"
            className="border-none"
          />
        </div>
      </div>
    </div>
  );
};

// Modify the existing NotesDetailsModal to use PDFViewer
const NotesDetailsModal = ({ note, onClose }) => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-xl max-w-md w-full p-6 relative shadow-2xl"
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-4xl mb-4">{note.icon}</div>
          <h2 className="text-2xl font-bold text-white mb-2">{note.title}</h2>
          <p className="text-gray-300 mb-4">{note.description}</p>
          <p className="text-gray-400 mb-4 italic">Subject: {note.subject}</p>

          <div className="space-y-3">
            {note.downloadLinks.map((link, index) => (
              <button 
                key={index}
                onClick={() => setSelectedPdf(link.url)}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <span>View: {link.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <PDFViewer 
          pdfUrl={selectedPdf} 
          onClose={() => setSelectedPdf(null)} 
        />
      )}
    </>
  );
};

export default NotesDetailsModal;