"use client"

import { useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

// Set PDF.js worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = "../tools/pdf2jpg/pdf.worker.min.js";

const PDFConverter = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
        const numPages = pdf.numPages;
        const zip = new JSZip();
        const images = [];

        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 2.0 }); // Adjust scale for quality
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;

          // Convert canvas to JPG Blob
          const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/jpeg', 0.9); // 0.9 = quality
          });

          images.push(blob);
          zip.file(`page-${i}.jpg`, blob);
        }

        // Download single image or zip
        if (images.length === 1) {
          saveAs(images[0], 'converted-image.jpg');
        } else {
          const zipBlob = await zip.generateAsync({ type: 'blob' });
          saveAs(zipBlob, 'converted-images.zip');
        }

        setIsProcessing(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Conversion error:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="converter">
      <label className="file-input-label">
        {isProcessing ? 'Processing...' : 'Choose PDF File'}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          disabled={isProcessing}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default PDFConverter;