import React from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { BuildingOffice2Icon, PaintBrushIcon } from '@heroicons/react/24/solid';

const ServiceLinkCard: React.FC<{ to: string, title: string, description: string, icon: React.ElementType }> = ({ to, title, description, icon: Icon }) => {
    return (
        // FIX: Using Link from the namespace import.
        <ReactRouterDOM.Link to={to} className="block bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-golden-yellow/20 hover:scale-105 transition-all duration-300 transform">
            <Icon className="h-12 w-12 text-golden-yellow mb-4" />
            <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </ReactRouterDOM.Link>
    );
};

const ServicesPage: React.FC = () => {
    return (
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
    );
};

export default ServicesPage;