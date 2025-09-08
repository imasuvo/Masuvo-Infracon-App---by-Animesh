import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '../contexts/FavoritesContext';

const Header: React.FC = () => {
    const { favorites } = useFavorites();
    return (
        <header className="bg-charcoal/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-golden-yellow/10">
            <div className="max-w-lg mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <ReactRouterDOM.Link to="/" className="flex items-center gap-3 group">
                        <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/Masuvo-Infracon-Logo-Rounded.png" alt="Masuvo Infracon Pvt. Ltd. Logo" className="h-12 w-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        <div>
                            <span className="font-bold text-white text-lg tracking-wide group-hover:text-golden-yellow transition-colors">Masuvo Infracon</span>
                            <p className="text-xs text-gray-400 -mt-1 group-hover:text-golden-yellow transition-colors">Made by Animesh</p>
                        </div>
                    </ReactRouterDOM.Link>

                    <ReactRouterDOM.Link to="/saved" className="relative p-2 text-gray-300 hover:text-white transition-colors">
                        <HeartIcon className="h-7 w-7" />
                        {favorites.length > 0 && (
                             <span className="absolute top-1 right-1 flex items-center justify-center h-4 w-4 rounded-full bg-coral-red text-white text-xs font-bold">
                                {favorites.length}
                            </span>
                        )}
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </header>
    );
};

export default Header;