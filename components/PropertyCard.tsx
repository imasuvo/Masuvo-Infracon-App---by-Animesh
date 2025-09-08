import React from 'react';
// FIX: Replaced namespace import of 'react-router-dom' with a named import for Link to resolve export errors.
import { Link } from 'react-router-dom';
import type { Property } from '../types';
import { MapPinIcon, BuildingOfficeIcon, ArrowsPointingOutIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
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
    
    return (
        // FIX: Using Link from the named import.
        <Link to={`/properties/${property.id}`} className="block bg-zinc-800 rounded-xl overflow-hidden shadow-lg hover:shadow-golden-yellow/20 transition-shadow duration-300">
            <div className="relative">
                <img src={property.images[0]} alt={property.title} className="w-full h-48 object-cover" />
                <button 
                    onClick={handleFavoriteClick}
                    className="absolute top-3 right-3 bg-charcoal/60 p-2 rounded-full text-white hover:text-coral-red transition-colors duration-200 z-10"
                    aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isSaved ? <HeartIconSolid className="h-6 w-6 text-coral-red" /> : <HeartIconOutline className="h-6 w-6" />}
                </button>
                <div className="absolute top-2 left-2 bg-charcoal/70 text-white text-sm font-bold py-1 px-3 rounded-full">
                    {property.price}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-white">{property.title}</h3>
                <p className="text-sm text-gray-400 mb-2 flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-1.5 text-golden-yellow flex-shrink-0"/>
                    <span>{property.subLocation}</span>
                </p>
                <div className="mt-3 space-y-2 text-sm text-gray-300 border-t border-zinc-700 pt-3">
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
        </Link>
    );
};

export default PropertyCard;