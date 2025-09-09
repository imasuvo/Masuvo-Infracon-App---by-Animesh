import React, { useState, useMemo } from 'react';
import { PROPERTIES } from '../constants';
import PropertyCard from '../components/PropertyCard';
import type { Property } from '../types';
import { motion } from 'framer-motion';

type MainAreaFilter = 'All' | 'BIDHAN NAGAR AREA' | 'DURGAPUR -01 AREA';
type TypeFilter = 'All' | '3BHK' | '4BHK' | '5BHK';


const FilterButton: React.FC<{ active: boolean, onClick: () => void, children: React.ReactNode}> = ({ active, onClick, children}) => {
    return (
        <button 
            onClick={onClick}
            className={`px-3 py-1 text-sm rounded-full transition-colors duration-200 ${active ? 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-golden-yellow dark:to-golden-orange text-white dark:text-charcoal font-semibold' : 'bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-300'}`}
        >
            {children}
        </button>
    )
}

const PropertiesPage: React.FC = () => {
    const [mainAreaFilter, setMainAreaFilter] = useState<MainAreaFilter>('All');
    const [typeFilter, setTypeFilter] = useState<TypeFilter>('All');
    
    const filteredProperties = useMemo(() => {
        return PROPERTIES.filter(prop => {
            const mainAreaMatch = mainAreaFilter === 'All' || prop.mainArea === mainAreaFilter;
            const typeMatch = typeFilter === 'All' || prop.type === typeFilter;
            return mainAreaMatch && typeMatch;
        });
    }, [mainAreaFilter, typeFilter]);

    const groupedProperties = useMemo(() => {
        if (mainAreaFilter !== 'All') {
            const filtered = filteredProperties.filter(p => p.mainArea === mainAreaFilter);
            if (filtered.length > 0) {
                 return { [mainAreaFilter]: filtered };
            }
            return {};
        }
        return filteredProperties.reduce((acc, prop) => {
            const area = prop.mainArea;
            (acc[area] = acc[area] || []).push(prop);
            return acc;
        }, {} as Record<MainAreaFilter, Property[]>);
    }, [filteredProperties, mainAreaFilter]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen">
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-center lg:text-left text-orange-600 dark:text-golden-yellow">Our Properties</h2>
                
                <div className="space-y-4 mb-6 lg:flex lg:space-y-0 lg:space-x-8 lg:items-center">
                    <div>
                        <h3 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Filter by Location</h3>
                        <div className="flex flex-wrap gap-2">
                            <FilterButton active={mainAreaFilter === 'All'} onClick={() => setMainAreaFilter('All')}>All</FilterButton>
                            <FilterButton active={mainAreaFilter === 'BIDHAN NAGAR AREA'} onClick={() => setMainAreaFilter('BIDHAN NAGAR AREA')}>Bidhan Nagar Area</FilterButton>
                            <FilterButton active={mainAreaFilter === 'DURGAPUR -01 AREA'} onClick={() => setMainAreaFilter('DURGAPUR -01 AREA')}>Durgapur-01 Area</FilterButton>
                        </div>
                    </div>
                     <div>
                        <h3 className="text-sm font-semibold mb-2 text-gray-500 dark:text-gray-400">Filter by Type</h3>
                        <div className="flex flex-wrap gap-2">
                            <FilterButton active={typeFilter === 'All'} onClick={() => setTypeFilter('All')}>All</FilterButton>
                            <FilterButton active={typeFilter === '3BHK'} onClick={() => setTypeFilter('3BHK')}>3BHK</FilterButton>
                            <FilterButton active={typeFilter === '4BHK'} onClick={() => setTypeFilter('4BHK')}>4BHK</FilterButton>
                            {/* FIX: Corrected closing tag for FilterButton component. */}
                            <FilterButton active={typeFilter === '5BHK'} onClick={() => setTypeFilter('5BHK')}>5BHK</FilterButton>
                        </div>
                    </div>
                </div>

                {Object.keys(groupedProperties).length > 0 ? (
                     <div className="space-y-8">
                        {Object.entries(groupedProperties).map(([area, props]) => (
                            (props && props.length > 0) && (
                                <section key={area}>
                                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-golden-orange border-b-2 border-orange-600/20 dark:border-golden-yellow/20 pb-2">{area}</h3>
                                    <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
                                        {props.map(prop => <PropertyCard key={prop.id} property={prop} />)}
                                    </div>
                                </section>
                            )
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-gray-400">No properties match the current filters.</p>
                    </div>
                )}

                <div className="mt-8 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg text-center border border-orange-600/20 dark:border-golden-yellow/20">
                    <h4 className="font-bold text-orange-600 dark:text-golden-yellow">Terms & Conditions Apply</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">ALL ARE INITIAL STARTING PRICE. IT MAY VARY AS PER LAND VALUATION AND DEMAND IN PARTICULAR AREA.</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertiesPage;