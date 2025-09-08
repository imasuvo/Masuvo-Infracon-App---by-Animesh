import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { BuildingOffice2Icon, PaintBrushIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const ServiceLinkCard: React.FC<{ to: string, title: string, description: string, icon: React.ElementType }> = ({ to, title, description, icon: Icon }) => {
    return (
        <ReactRouterDOM.Link to={to} className="group block bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-golden-yellow/20 hover:scale-105 transition-all duration-300 transform">
            <Icon className="h-12 w-12 text-golden-yellow mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:-rotate-12" />
            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </ReactRouterDOM.Link>
    );
};

const ServicesPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen">
                <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Our Services</h2>
                <p className="text-gray-300 mb-8">Comprehensive solutions for your dream home.</p>
                
                <div className="space-y-6">
                    <ServiceLinkCard 
                        to="/construction"
                        title="Construction Services"
                        description="Building your vision with strength, precision, and unparalleled quality."
                        icon={BuildingOffice2Icon}
                    />
                    <ServiceLinkCard 
                        to="/interiors"
                        title="Trayaksh Interior"
                        description="Crafting bespoke interiors that reflect your unique style and personality."
                        icon={PaintBrushIcon}
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default ServicesPage;