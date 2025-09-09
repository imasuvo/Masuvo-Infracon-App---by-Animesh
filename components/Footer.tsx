import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { COMPANY_INFO, SOCIAL_LINKS } from '../constants';

const SocialIcon: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-golden-yellow transition-colors duration-300">
        {children}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-100 dark:bg-zinc-900 border-t border-gray-200 dark:border-golden-yellow/20">
            <div className="max-w-lg mx-auto py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                {/* Main content grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="space-y-4 text-center lg:text-left lg:col-span-1">
                         <ReactRouterDOM.Link to="/" className="inline-flex items-center justify-center lg:justify-start gap-3 group">
                            <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/Masuvo-Infracon-Logo-Rounded.png" alt="Logo" className="h-12 w-12 rounded-full" />
                            <div>
                                <span className="font-bold text-zinc-900 dark:text-white text-lg">Masuvo Infracon</span>
                                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">{COMPANY_INFO.tagline}</p>
                            </div>
                        </ReactRouterDOM.Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{COMPANY_INFO.address}</p>
                    </div>

                    {/* Links grid */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:col-span-3">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Navigation</h3>
                            <ul className="mt-4 space-y-2">
                                <li><ReactRouterDOM.Link to="/properties" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Properties</ReactRouterDOM.Link></li>
                                <li><ReactRouterDOM.Link to="/floor-plans" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Floor Plans</ReactRouterDOM.Link></li>
                                <li><ReactRouterDOM.Link to="/services" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Services</ReactRouterDOM.Link></li>
                            </ul>
                        </div>
                         <div>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Company</h3>
                            <ul className="mt-4 space-y-2">
                                <li><ReactRouterDOM.Link to="/about" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">About</ReactRouterDOM.Link></li>
                                <li><ReactRouterDOM.Link to="/contact" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Contact</ReactRouterDOM.Link></li>
                                <li><ReactRouterDOM.Link to="/faq" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">FAQ</ReactRouterDOM.Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider uppercase">Tools</h3>
                            <ul className="mt-4 space-y-2">
                                 <li><ReactRouterDOM.Link to="/budget-estimator" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Budget Estimator</ReactRouterDOM.Link></li>
                                <li><ReactRouterDOM.Link to="/schedule-visit" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Schedule Visit</ReactRouterDOM.Link></li>
                                <li><ReactRouterDOM.Link to="/portal/login" className="text-base text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-golden-yellow">Client Portal</ReactRouterDOM.Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom section with social links and copyright */}
                <div className="mt-8 border-t border-gray-200 dark:border-zinc-800 pt-8 flex flex-col-reverse items-center gap-4 sm:flex-row sm:justify-between">
                     <p className="text-sm text-gray-500 dark:text-gray-500 text-center sm:text-left">&copy; {new Date().getFullYear()} Masuvo Infracon. All Rights Reserved.</p>
                     <div className="flex space-x-6">
                        <SocialIcon href={SOCIAL_LINKS.facebook}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9.19795 21.5H13.198V13.4901H16.1618L16.6711 9.49012H13.198V7.54012C13.198 6.94512 13.6521 6.54012 14.248 6.54012H16.5V2.5H13.198C11.0765 2.5 9.19795 4.50012 9.19795 7.54012V9.49012H7.19795V13.4901H9.19795V21.5Z"/></svg></SocialIcon>
                        <SocialIcon href={SOCIAL_LINKS.instagram}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg></SocialIcon>
                        <SocialIcon href={SOCIAL_LINKS.x}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></SocialIcon>
                        <SocialIcon href={SOCIAL_LINKS.linkedin}><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></SocialIcon>
                     </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;