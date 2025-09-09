import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XMarkIcon, HomeIcon, BuildingOffice2Icon, ClipboardDocumentListIcon, BanknotesIcon, UserCircleIcon, HeartIcon, QuestionMarkCircleIcon, EnvelopeIcon, BuildingLibraryIcon } from '@heroicons/react/24/solid';
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants';
import { useFavorites } from '../contexts/FavoritesContext';

interface SidebarProps {
  onClose: () => void;
}

const navItems = [
    { path: '/', name: 'Home', icon: HomeIcon },
    { path: '/properties', name: 'Properties', icon: BuildingOffice2Icon },
    { path: '/floor-plans', name: 'Floor Plans', icon: ClipboardDocumentListIcon },
    { path: '/budget-estimator', name: 'Budget Estimator', icon: BanknotesIcon },
    { path: '/saved', name: 'Saved Properties', icon: HeartIcon },
    { path: '/portal/login', name: 'Client Portal', icon: UserCircleIcon },
];

const secondaryNavItems = [
    { path: '/about', name: 'About Us', icon: BuildingLibraryIcon },
    { path: '/contact', name: 'Contact', icon: EnvelopeIcon },
    { path: '/faq', name: 'FAQ', icon: QuestionMarkCircleIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
    const { favorites } = useFavorites();

    const NavItem: React.FC<{ path: string, name: string, icon: React.ElementType }> = ({ path, name, icon: Icon }) => (
        <NavLink
            to={path}
            onClick={onClose}
            className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-lg transition-colors text-lg ${isActive ? 'bg-orange-500 text-white dark:bg-golden-yellow dark:text-charcoal font-semibold' : 'hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
        >
            <Icon className="h-6 w-6" />
            <span>{name}</span>
            {name === 'Saved Properties' && favorites.length > 0 && (
                <span className="ml-auto bg-coral-red text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{favorites.length}</span>
            )}
        </NavLink>
    );

    return (
        <>
            {/* Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/60 z-[90]"
                onClick={onClose}
            />
            
            {/* Sidebar */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-charcoal text-zinc-900 dark:text-white shadow-2xl z-[100] flex flex-col"
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-zinc-700">
                    <h2 className="font-bold text-xl">Menu</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </header>
                
                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {navItems.map(item => <NavItem key={item.path} {...item} />)}
                    <div className="pt-4 mt-4 border-t border-gray-200 dark:border-zinc-700 space-y-2">
                        {secondaryNavItems.map(item => <NavItem key={item.path} {...item} />)}
                    </div>
                </nav>
                
                <footer className="p-4 border-t border-gray-200 dark:border-zinc-700">
                     <div className="flex justify-center space-x-4 mb-4">
                        <a href={SOCIAL_LINKS.facebook} className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-golden-yellow"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9.19795 21.5H13.198V13.4901H16.1618L16.6711 9.49012H13.198V7.54012C13.198 6.94512 13.6521 6.54012 14.248 6.54012H16.5V2.5H13.198C11.0765 2.5 9.19795 4.50012 9.19795 7.54012V9.49012H7.19795V13.4901H9.19795V21.5Z"/></svg></a>
                        <a href={SOCIAL_LINKS.instagram} className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-golden-yellow"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg></a>
                        <a href={SOCIAL_LINKS.x} className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-golden-yellow"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                     </div>
                    <p className="text-xs text-center text-gray-500">&copy; {new Date().getFullYear()} {COMPANY_INFO.name}</p>
                </footer>
            </motion.div>
        </>
    );
};

export default Sidebar;