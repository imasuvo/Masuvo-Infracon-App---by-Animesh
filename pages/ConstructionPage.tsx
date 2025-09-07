import React from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { CONSTRUCTION_SERVICES } from '../constants';
import type { Service } from '../types';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-golden-yellow/20 transition-shadow duration-300">
        <service.icon className="h-10 w-10 text-golden-yellow mb-4" />
        <h3 className="text-xl font-bold mb-2">{service.title}</h3>
        <p className="text-gray-400">{service.description}</p>
    </div>
);

const ConstructionPage: React.FC = () => {
    return (
        <div className="p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Construction Services</h2>
            <p className="text-gray-300 mb-8">Building your vision with strength and precision.</p>
            
            <div className="space-y-6">
                {CONSTRUCTION_SERVICES.map((service, index) => (
                    <ServiceCard key={index} service={service} />
                ))}
            </div>

            <div className="mt-10 text-center">
                 {/* FIX: Using Link from the namespace import. */}
                 <ReactRouterDOM.Link to="/budget-estimator" className="inline-block bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                    Get Free Estimate
                </ReactRouterDOM.Link>
            </div>
        </div>
    );
};

export default ConstructionPage;