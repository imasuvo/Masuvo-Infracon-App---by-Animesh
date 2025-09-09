import React, { useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useTheme } from '../contexts/ThemeContext';
import Sidebar from './Sidebar';
import { AnimatePresence } from 'framer-motion';

const DesktopNavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
    <ReactRouterDOM.NavLink
        to={to}
        className={({ isActive }) =>
            `text-sm font-semibold transition-colors duration-300 ${isActive
                ? 'text-orange-600 dark:text-golden-yellow'
                : 'text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow'
            }`
        }
    >
        {children}
    </ReactRouterDOM.NavLink>
);

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <>
            <header className="bg-white/80 dark:bg-charcoal/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg dark:shadow-golden-yellow/10">
                <div className="max-w-lg mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <ReactRouterDOM.Link to="/" className="flex items-center gap-3 group">
                            <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/Masuvo-Infracon-Logo-Rounded.png" alt="Masuvo Infracon Pvt. Ltd. Logo" className="h-12 w-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300" />
                            <div>
                                <span className="font-bold text-zinc-900 dark:text-white text-lg tracking-wide group-hover:text-orange-600 dark:group-hover:text-golden-yellow transition-colors">Masuvo Infracon</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1 group-hover:text-orange-600 dark:group-hover:text-golden-yellow transition-colors">Made by Animesh</p>
                            </div>
                        </ReactRouterDOM.Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            <DesktopNavLink to="/">Home</DesktopNavLink>
                            <DesktopNavLink to="/properties">Properties</DesktopNavLink>
                            <DesktopNavLink to="/floor-plans">Floor Plans</DesktopNavLink>
                            <DesktopNavLink to="/services">Services</DesktopNavLink>
                            <DesktopNavLink to="/about">About</DesktopNavLink>
                            <DesktopNavLink to="/contact">Contact</DesktopNavLink>
                        </nav>

                        <div className="flex items-center gap-2">
                             <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
                            </button>
                             <ReactRouterDOM.Link 
                                to="/portal/login" 
                                className="hidden lg:block p-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow transition-colors"
                                aria-label="Client Portal"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                            </ReactRouterDOM.Link>
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="p-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow transition-colors lg:hidden"
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