import React, { useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../contexts/ThemeContext';
import Sidebar from './Sidebar';
import { AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <header className="bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg dark:shadow-golden-yellow/10">
                <div className="max-w-lg mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                        <ReactRouterDOM.Link to="/" className="flex items-center gap-3 group">
                            <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/Masuvo-Infracon-Logo-Rounded.png" alt="Masuvo Infracon Pvt. Ltd. Logo" className="h-12 w-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div>
                                <span className="font-bold text-zinc-900 dark:text-white text-lg tracking-wide group-hover:text-orange-600 dark:group-hover:text-golden-yellow transition-colors">Masuvo Infracon</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 group-hover:text-orange-600 dark:group-hover:text-golden-yellow transition-colors">Made by Animesh</p>
                            </div>
                        </ReactRouterDOM.Link>

                        <div className="flex items-center gap-2">
                             <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                            </button>
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow transition-colors"
                                aria-label="Open navigation menu"
                            >
                                <Bars3Icon className="h-7 w-7" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <AnimatePresence>
                {isSidebarOpen && <Sidebar onClose={() => setIsSidebarOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

export default Header;