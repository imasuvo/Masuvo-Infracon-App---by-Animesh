import React, { useState, useMemo } from 'react';
// FIX: Replaced namespace import of 'react-router-dom' with a named import for Link to resolve export errors.
import { Link } from 'react-router-dom';
import { FLOOR_PLANS, COMPANY_INFO } from '../constants';
import type { FloorPlan } from '../types';
import { ArrowLeftIcon, DocumentArrowDownIcon, CalendarDaysIcon, PencilSquareIcon } from '@heroicons/react/24/solid';
// FIX: Imported Transition type from framer-motion to resolve type error.
import { motion, AnimatePresence, Transition } from 'framer-motion';

// --- HELPER FUNCTIONS & COMPONENTS ---

const sqftToSqm = (sqft: number) => (sqft * 0.092903).toFixed(2);

const FilterButton: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
    <button 
        onClick={onClick}
        className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${active ? 'bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-semibold' : 'bg-zinc-700 text-gray-300'}`}
    >
        {children}
    </button>
);

const DetailCTAButton: React.FC<{ children: React.ReactNode; icon: React.ElementType; onClick?: () => void; to?: string; }> = ({ children, icon: Icon, onClick, to }) => {
    const content = (
        <div className="flex flex-col items-center justify-center text-center gap-1.5 p-3 bg-zinc-800 rounded-xl hover:bg-zinc-700 transition-colors">
            <Icon className="h-6 w-6 text-golden-yellow" />
            <span className="text-xs font-semibold text-white">{children}</span>
        </div>
    );

    if (to) {
        return <Link to={to}>{content}</Link>;
    }
    return <button onClick={onClick} className="w-full">{content}</button>;
};

// --- INTERFACE 2: DETAIL VIEW ---

const FloorPlanDetailView: React.FC<{ plan: FloorPlan; onBack: () => void }> = ({ plan, onBack }) => {
    return (
        <div className="min-h-screen">
            <header className="sticky top-0 z-20 bg-charcoal/80 backdrop-blur-sm p-4 flex items-center gap-4">
                <button onClick={onBack} className="text-white p-2 bg-zinc-700 rounded-full hover:bg-zinc-600">
                    <ArrowLeftIcon className="h-5 w-5" />
                </button>
                <h2 className="text-lg font-bold text-white truncate">{plan.sizeSqFt} sq.ft {plan.type} Plan</h2>
            </header>

            <div className="p-4 space-y-6">
                <div className="bg-zinc-800 p-4 rounded-xl">
                    <h3 className="text-sm text-gray-400">Price</h3>
                    <p className="text-2xl font-bold text-golden-yellow">{plan.price}</p>
                    <p className="text-xs text-gray-500 mt-1">Govt. charges applicable</p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-golden-yellow mb-3">Interactive 3D Model</h3>
                    <div className="h-96 rounded-lg overflow-hidden border-2 border-golden-yellow/20">
                        <iframe 
                            src={plan.model3dUrl}
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allow="autoplay; fullscreen; xr-spatial-tracking"
                            allowFullScreen={true} 
                            loading="lazy"
                            title={`${plan.type} 3D Floor Plan Model`}
                        ></iframe>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <DetailCTAButton icon={DocumentArrowDownIcon} onClick={() => alert('Download will start shortly!')}>Download PDF</DetailCTAButton>
                    <DetailCTAButton icon={CalendarDaysIcon} to="/schedule-visit">Book Appointment</DetailCTAButton>
                    <DetailCTAButton icon={PencilSquareIcon} to="/contact">Request Quote</DetailCTAButton>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-golden-yellow mb-2">Additional Info</h3>
                    <p className="text-gray-300 bg-zinc-800 p-4 rounded-xl">{plan.description}</p>
                </div>
            </div>

            <div className="p-4 mt-4 text-xs text-center text-gray-500 bg-zinc-900">
                <p><strong>Disclaimer:</strong> All prices are indicative starting prices. Final cost may vary as per land valuation, material quality, and demand in specific areas.</p>
            </div>
        </div>
    );
};


// --- INTERFACE 1: LIST VIEW ---

const FloorPlanListView: React.FC<{ onSelectPlan: (plan: FloorPlan) => void }> = ({ onSelectPlan }) => {
    const [activeTab, setActiveTab] = useState<'3BHK' | '4BHK' | '5BHK'>('3BHK');
    const tabs: ('3BHK' | '4BHK' | '5BHK')[] = ['3BHK', '4BHK', '5BHK'];

    const filteredPlans = useMemo(() => {
        return FLOOR_PLANS.filter(p => p.type === activeTab);
    }, [activeTab]);
    
    return (
        <div className="p-4 min-h-screen">
            <h2 className="text-3xl font-bold mb-6 text-golden-yellow">Floor Plans & Pricing</h2>
            
            <div className="mb-6 flex flex-wrap gap-2">
                {tabs.map(tab => (
                    <FilterButton key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
                        {tab}
                    </FilterButton>
                ))}
            </div>
            
            <div className="space-y-6">
                {filteredPlans.map(plan => (
                     <div key={plan.id} className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group hover:shadow-golden-yellow/20 transition-shadow duration-300">
                        <div className="md:w-1/3">
                             <img src={plan.thumbnailUrl} alt={`${plan.type} Floor Plan Thumbnail`} className="w-full h-48 md:h-full object-cover"/>
                        </div>
                        <div className="p-4 md:w-2/3 flex flex-col">
                            <div>
                                <h3 className="text-xl font-bold text-white">{plan.sizeSqFt.toLocaleString('en-IN')} sq.ft / {sqftToSqm(plan.sizeSqFt)} sq.m</h3>
                                <p className="text-sm text-gray-400">{plan.configuration} | {plan.type}</p>
                                <p className="text-2xl font-semibold text-golden-yellow mt-2">{plan.price}</p>
                            </div>
                            <div className="mt-auto pt-4 flex flex-col gap-2">
                                <button onClick={() => onSelectPlan(plan)} className="w-full text-center bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-semibold py-2.5 px-4 rounded-lg text-sm transition-transform duration-200 group-hover:scale-105">
                                    View Details
                                </button>
                                <div className="flex gap-2">
                                    <Link to="/schedule-visit" className="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
                                        Book Site Visit
                                    </Link>
                                    <a 
                                        href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi, I am interested in the ${plan.sizeSqFt} sq.ft ${plan.type} floor plan (ID: ${plan.id})`}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center bg-zinc-700 hover:bg-zinc-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-colors"
                                    >
                                        Enquire Now
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- MAIN PAGE COMPONENT ---

const FloorPlansPage: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<FloorPlan | null>(null);

    const viewVariants = {
        initial: { opacity: 0, x: '100%' },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: '-100%' },
    };

    const listVariants = {
        initial: { opacity: 0, x: '-100%' },
        in: { opacity: 1, x: 0 },
        out: { opacity: 0, x: '100%' },
    };
    
    // FIX: Added Transition type to ensure properties are correctly typed for framer-motion.
    const viewTransition: Transition = {
        type: 'tween',
        ease: 'anticipate',
        duration: 0.5,
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatePresence mode="wait">
                {selectedPlan ? (
                    <motion.div
                        key="detail"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={viewVariants}
                        transition={viewTransition}
                    >
                        <FloorPlanDetailView plan={selectedPlan} onBack={() => setSelectedPlan(null)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="list"
                        initial="initial"
                        animate="in"
                        exit="out"
                        variants={listVariants}
                        transition={viewTransition}
                    >
                        <FloorPlanListView onSelectPlan={setSelectedPlan} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FloorPlansPage;