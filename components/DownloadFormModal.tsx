import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface DownloadFormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const DownloadFormModal: React.FC<DownloadFormModalProps> = ({ onClose, onSuccess }) => {
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // This is a static implementation. In a real app, you would send
        // form data to a backend or email service here.
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        console.log("Form submitted with data:", data);
        
        setSubmitted(true);

        setTimeout(() => {
            onSuccess(); // Trigger download after a short delay
        }, 1500); // Wait 1.5s to show the success message
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="bg-zinc-800 w-full max-w-md rounded-xl shadow-2xl relative border border-golden-yellow/20"
                onClick={e => e.stopPropagation()}
            >
                 <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white z-10" aria-label="Close form">
                    <XMarkIcon className="h-6 w-6" />
                </button>

                {submitted ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center h-64">
                        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                        <p className="text-gray-300">Your download will begin shortly.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-golden-yellow">Enter your details to download</h3>
                            <p className="text-sm text-gray-400 mt-1">We'll keep you updated on our latest projects.</p>
                        </div>
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input id="name" type="text" name="name" placeholder="Full Name" className="w-full bg-zinc-700 text-white rounded-lg p-3 border border-transparent focus:border-golden-yellow focus:ring-0 transition" required />
                        </div>
                         <div>
                             <label htmlFor="email" className="sr-only">Email Address</label>
                            <input id="email" type="email" name="email" placeholder="Email Address" className="w-full bg-zinc-700 text-white rounded-lg p-3 border border-transparent focus:border-golden-yellow focus:ring-0 transition" required />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Phone Number</label>
                            <input id="phone" type="tel" name="phone" placeholder="Phone Number" className="w-full bg-zinc-700 text-white rounded-lg p-3 border border-transparent focus:border-golden-yellow focus:ring-0 transition" required />
                        </div>
                         <button type="submit" className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                            Submit & Download
                        </button>
                    </form>
                )}
            </motion.div>
        </motion.div>
    );
};

export default DownloadFormModal;
