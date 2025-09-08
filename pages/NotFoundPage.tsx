import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const NotFoundPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 min-h-screen flex flex-col items-center justify-center text-center"
        >
            <ExclamationTriangleIcon className="h-24 w-24 text-golden-yellow/50 mb-6" />
            <h2 className="text-4xl font-bold mb-2 text-golden-yellow">404 - Not Found</h2>
            <p className="text-gray-300 mb-8 max-w-md">
                Sorry, the page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <ReactRouterDOM.Link
                to="/"
                className="inline-block bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
            >
                Go to Homepage
            </ReactRouterDOM.Link>
        </motion.div>
    );
};

export default NotFoundPage;