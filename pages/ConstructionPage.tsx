import React from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { CONSTRUCTION_SERVICES } from '../constants';
import type { Service } from '../types';
import ReadMore from '../components/ReadMore';
import { motion } from 'framer-motion';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
    <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl shadow-lg hover:shadow-orange-500/20 dark:hover:shadow-golden-yellow/20 transition-shadow duration-300 h-full flex flex-col">
        <service.icon className="h-10 w-10 text-orange-600 dark:text-golden-yellow mb-4" />
        <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{service.title}</h3>
        <div className="flex-grow">
          <ReadMore text={service.description} maxLength={80} />
        </div>
    </div>
);

const ConstructionPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen">
                <div className="text-center mb-8">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-2 text-orange-600 dark:text-golden-yellow">Construction Services</h2>
                    <p className="text-gray-600 dark:text-gray-300 lg:text-lg">Building your vision with strength and precision.</p>
                </div>
                
                <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6">
                    {CONSTRUCTION_SERVICES.map((service, index) => (
                        <ServiceCard key={index} service={service} />
                    ))}
                </div>

                <div className="mt-10 text-center">
                     <ReactRouterDOM.Link to="/budget-estimator" className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 dark:from-golden-yellow dark:to-golden-orange text-white dark:text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                        Get Free Estimate
                    </ReactRouterDOM.Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ConstructionPage;