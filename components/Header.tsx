import React from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-charcoal/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-golden-yellow/10">
            <div className="max-w-lg mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-start h-16">
                    {/* FIX: Using Link from the namespace import. */}
                    <ReactRouterDOM.Link to="/" className="flex items-center gap-3 group">
                        <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/Masuvo-Infracon-Logo-Rounded.png" alt="Masuvo Infracon Pvt. Ltd. Logo" className="h-10 w-auto group-hover:scale-110 transition-transform duration-300" />
                        <div>
                            <span className="font-bold text-white text-lg tracking-wide group-hover:text-golden-yellow transition-colors">Masuvo Infracon</span>
                            <p className="text-xs text-gray-400 -mt-1 group-hover:text-golden-yellow transition-colors">Made by Animesh</p>
                        </div>
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </header>
    );
};

export default Header;