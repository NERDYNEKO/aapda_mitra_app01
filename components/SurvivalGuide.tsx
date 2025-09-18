import React, { useState, useCallback, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { DisasterType } from '../types';
import { generateSurvivalGuide } from '../services/geminiService';
import { DownloadIcon } from './icons/DownloadIcon';

const SurvivalGuide: React.FC = () => {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>(DisasterType.Flood);
  const [guide, setGuide] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const guideContentRef = useRef<HTMLDivElement>(null);

  const fetchGuide = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setGuide('');
    try {
      const result = await generateSurvivalGuide(selectedDisaster);
      setGuide(result);
    } catch (err) {
      setError('An error occurred while fetching the guide. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedDisaster]);
  
  const handleDownloadPdf = async () => {
    if (!guideContentRef.current || !guide) return;

    setIsDownloading(true);
    setError(null);
    try {
        const canvas = await html2canvas(guideContentRef.current, { 
          scale: 2, 
          backgroundColor: '#212529' // Dark background for the PDF
        });
        const imgData = canvas.toDataURL('image/png');
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = imgWidth / imgHeight;
        const scaledImgHeight = (pdfWidth - 20) / ratio; // width with 10mm margin each side

        pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, scaledImgHeight);
        
        // Create a Blob from the PDF and trigger a direct download
        const pdfBlob = pdf.output('blob');
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Aapda-Mitra-${selectedDisaster}-Guide.pdf`;
        document.body.appendChild(link);
        link.click();
        
        // Cleanup the temporary link and URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

    } catch (err) {
        console.error("Error generating PDF: ", err);
        setError('Could not download the guide as a PDF. Please try again.');
    } finally {
        setIsDownloading(false);
    }
  };

  // FIX: Wrap all generated content in <li> tags to ensure valid HTML within the <ul>.
  const formattedGuide = guide.split('\n').map((line, index) => {
    if (line.startsWith('###') || line.startsWith('##') || line.startsWith('* **') || line.startsWith('**')) {
        return <li key={index}><h3 className="text-xl font-bold text-brand-blue mt-4 mb-2">{line.replace(/#|\*/g, '').trim()}</h3></li>;
    }
    if (line.startsWith('*')) {
        return <li key={index} className="ml-5 list-disc">{line.substring(1).trim()}</li>;
    }
    if (line.trim() === '') return null;
    return <li key={index}><p className="mb-2">{line}</p></li>;
  }).filter(Boolean);


  return (
    <div className="bg-brand-gray-800 p-6 sm:p-8 rounded-xl shadow-lg border border-brand-gray-700">
      <h2 className="text-3xl font-bold text-brand-gray-100 mb-6">Disaster Survival Guides</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={selectedDisaster}
          onChange={(e) => setSelectedDisaster(e.target.value as DisasterType)}
          className="w-full sm:w-1/2 p-3 bg-brand-gray-700 border border-brand-gray-600 text-brand-gray-100 rounded-lg focus:ring-2 focus:ring-brand-blue focus:border-brand-blue transition"
          disabled={isLoading}
        >
          {Object.values(DisasterType).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <button
          onClick={fetchGuide}
          disabled={isLoading}
          className="w-full sm:w-auto px-6 py-3 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 disabled:bg-brand-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Generating...' : 'Get Guide'}
        </button>
      </div>

       {guide && !isLoading && (
        <div className="mb-6">
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="w-full sm:w-auto px-6 py-3 bg-brand-green text-white font-semibold rounded-lg shadow-md hover:bg-green-600 disabled:bg-brand-gray-600 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <DownloadIcon />
            {isDownloading ? 'Downloading...' : 'Download as PDF'}
          </button>
        </div>
      )}

      {error && <div className="text-red-300 bg-red-900/40 p-4 rounded-lg border border-red-500">{error}</div>}

      <div className="mt-6 border-t border-brand-gray-700 pt-6">
        {isLoading && (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-brand-blue animate-bounce" style={{animationDelay: '0s'}}></div>
            <div className="w-4 h-4 rounded-full bg-brand-blue animate-bounce" style={{animationDelay: '0.2s'}}></div>
            <div className="w-4 h-4 rounded-full bg-brand-blue animate-bounce" style={{animationDelay: '0.4s'}}></div>
            <span className="ml-2 text-brand-gray-400">Generating your guide...</span>
          </div>
        )}
        {guide && (
          <div ref={guideContentRef} className="prose prose-invert max-w-none text-brand-gray-300 p-2">
             <ul>{formattedGuide}</ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurvivalGuide;