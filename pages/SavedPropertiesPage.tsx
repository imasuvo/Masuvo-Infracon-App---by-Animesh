import React from 'react';
// FIX: Replaced namespace import of 'react-router-dom' with a named import for Link to resolve export errors.
import { Link } from 'react-router-dom';
import { useFavorites } from '../contexts/FavoritesContext';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { HeartIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const SavedPropertiesPage: React.FC = () => {
    const { favorites } = useFavorites();
    const savedProperties = PROPERTIES.filter(prop => favorites.includes(prop.id));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen">
                <h2 className="text-3xl font-bold mb-6 text-golden-yellow">Saved Properties</h2>
                
                {savedProperties.length > 0 ? (
                     <div className="space-y-6">
                        {savedProperties.map(prop => (
                            <PropertyCard key={prop.id} property={prop} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 flex flex-col items-center">
                        <HeartIcon className="h-16 w-16 text-zinc-600 mb-4" />
                        <h3 className="text-xl font-semibold text-white">No Saved Properties Yet</h3>
                        <p className="text-gray-400 mt-2">Tap the heart icon on any property to save it here.</p>
                        <Link 
                            to="/properties" 
                            className="mt-6 bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-semibold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
                        >
                            Browse Properties
                        </Link>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default SavedPropertiesPage;