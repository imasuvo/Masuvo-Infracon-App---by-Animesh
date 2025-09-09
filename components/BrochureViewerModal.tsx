import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import DownloadFormModal from './DownloadFormModal';

interface BrochureViewerModalProps {
  pdfUrl: string;
  onClose: () => void;
}

const BROCHURE_DOWNLOAD_URL = "https://imagecdn.99acres.com/media1/28639/18/572798025O-1740557002439.pdf";

const BrochureViewerModal: React.FC<BrochureViewerModalProps> = ({ pdfUrl, onClose }) => {
    const [isDownloadFormOpen, setDownloadFormOpen] = useState(false);

    const handleDownloadSuccess = () => {
        // Open PDF in a new tab for the user to download
        window.open(BROCHURE_DOWNLOAD_URL, '_blank');
        setDownloadFormOpen(false); // Close form after success
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-0 sm:p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="bg-white dark:bg-charcoal w-full h-full sm:max-w-4xl sm:max-h-[90vh] sm:rounded-xl flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <header className="flex-shrink-0 flex items-center justify-between p-4 bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-golden-yellow/20">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">Company Brochure</h3>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setDownloadFormOpen(true)}
                            className="flex items-center gap-2 text-sm bg-golden-yellow text-charcoal font-semibold px-3 py-1.5 rounded-md hover:bg-golden-orange transition-colors"
                        >
                            <DocumentArrowDownIcon className="h-5 w-5" />
                            <span>Download</span>
                        </button>
                        <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-zinc-900 dark:hover:text-white">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>
                </header>
                
                {/* Iframe for PDF */}
                <div className="flex-grow bg-gray-200 dark:bg-zinc-900">
                    <iframe
                        src={pdfUrl}
                        title="Masuvo Infracon Brochure"
                        className="w-full h-full"
                        style={{ border: 0 }}
                    >
                         <p>Your browser does not support embedded PDFs. You can <a href={BROCHURE_DOWNLOAD_URL} className="text-golden-yellow hover:underline">download it here</a>.</p>
                    </iframe>
                </div>
            </motion.div>

            <AnimatePresence>
                {isDownloadFormOpen && (
                    <DownloadFormModal
                        onClose={() => setDownloadFormOpen(false)}
                        onSuccess={handleDownloadSuccess}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default BrochureViewerModal;