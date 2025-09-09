import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import type { Property } from '../types';
import { MapPinIcon, BuildingOfficeIcon, ArrowsPointingOutIcon, GlobeAltIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { useFavorites } from '../contexts/FavoritesContext';


interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isSaved = isFavorite(property.id);

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(property.id);
    };

    const handleShareClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const propertyUrl = `${window.location.origin}${window.location.pathname}#/properties/${property.id}`;
        const shareData = {
            title: property.title,
            text: `Check out this property: ${property.title}`,
            url: propertyUrl,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback for browsers that don't support the Web Share API
            try {
                await navigator.clipboard.writeText(propertyUrl);
                alert('Property link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy link:', err);
                alert('Could not copy link. Please copy it manually.');
            }
        }
    };
    
    return (
        <ReactRouterDOM.Link to={`/properties/${property.id}`} className="group block bg-gray-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-golden-yellow/20 transition-shadow duration-300">
            <div className="relative overflow-hidden">
                <img src={property.images?.[0] || 'https://picsum.photos/seed/placeholder/800/600'} alt={property.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" />
                 <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button 
                        onClick={handleShareClick}
                        className="bg-white/60 dark:bg-charcoal/60 p-2 rounded-full text-zinc-900 dark:text-white hover:text-golden-yellow transition-colors duration-200 z-10"
                        aria-label="Share property"
                    >
                        <ShareIcon className="h-6 w-6" />
                    </button>
                    <button 
                        onClick={handleFavoriteClick}
                        className="bg-white/60 dark:bg-charcoal/60 p-2 rounded-full text-zinc-900 dark:text-white hover:text-coral-red transition-colors duration-200 z-10"
                        aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isSaved ? <HeartIconSolid className="h-6 w-6 text-coral-red" /> : <HeartIconOutline className="h-6 w-6" />}
                    </button>
                </div>
                <div className="absolute top-2 left-2 bg-charcoal/70 text-white text-sm font-bold py-1 px-3 rounded-full">
                    {property.price}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{property.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1.5 text-golden-yellow flex-shrink-0"/>
                    <span>{property.subLocation}</span>
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-700 dark:text-gray-300 border-t border-gray-200 dark:border-zinc-700 pt-3">
                     <div className="flex items-center">
                        <BuildingOfficeIcon className="h-4 w-4 mr-2 text-golden-yellow flex-shrink-0"/>
                        <span>{property.type} {property.style}</span>
                    </div>
                     <div className="flex items-center">
                        <ArrowsPointingOutIcon className="h-4 w-4 mr-2 text-golden-yellow flex-shrink-0"/>
                        <span>{property.size.toLocaleString('en-IN')} sq. ft.</span>
                    </div>
                    {property.landArea && (
                         <div className="flex items-center">
                            <GlobeAltIcon className="h-4 w-4 mr-2 text-golden-yellow flex-shrink-0"/>
                            <span>{property.landArea} Land Area</span>
                        </div>
                    )}
                </div>
            </div>
        </ReactRouterDOM.Link>
    );
};

export default PropertyCard;