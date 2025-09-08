import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { HomeIcon, BuildingOffice2Icon, ClipboardDocumentListIcon, BanknotesIcon, PhoneIcon } from '@heroicons/react/24/solid';

const navItems = [
    { path: '/', name: 'Home', icon: HomeIcon },
    { path: '/properties', name: 'Properties', icon: BuildingOffice2Icon },
    { path: '/floor-plans', name: 'Plans', icon: ClipboardDocumentListIcon },
    { path: '/budget-estimator', name: 'Budget', icon: BanknotesIcon },
    { path: '/contact', name: 'Contact', icon: PhoneIcon },
];

const BottomNav: React.FC = () => {
    const location = ReactRouterDOM.useLocation();
    const activeClass = 'text-golden-yellow';
    const inactiveClass = 'text-gray-400';

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        // If the user clicks on the link for the page they are already on,
        // prevent navigation and scroll to the top of the page instead.
        if (location.pathname === path) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-charcoal/90 backdrop-blur-sm border-t border-golden-yellow/20 max-w-lg mx-auto z-50">
            <div className="flex justify-around h-16">
                {navItems.map((item) => (
                    <ReactRouterDOM.NavLink
                        key={item.name}
                        to={item.path}
                        end={item.path === '/'}
                        onClick={(e) => handleNavClick(e, item.path)}
                        className={({ isActive }) => 
                            `flex flex-col items-center justify-center w-full text-xs transition-colors duration-300 ${isActive ? activeClass : inactiveClass} hover:text-golden-yellow`
                        }
                    >
                        <item.icon className="h-6 w-6 mb-1" />
                        <span>{item.name}</span>
                    </ReactRouterDOM.NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;