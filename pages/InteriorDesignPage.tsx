import React, { useState } from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { INTERIOR_DESIGN_GALLERY } from '../constants';
import { InteriorCategory } from '../types';

const InteriorDesignPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<InteriorCategory>(InteriorCategory.LivingRoom);

    const categories = Object.values(InteriorCategory);

    return (
        <div className="p-4 min-h-screen">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-golden-yellow">Trayaksh Interior</h2>
                <p className="text-gray-300">Crafting spaces that reflect your style.</p>
            </div>

            <div className="mb-6">
                <div className="flex justify-center flex-wrap gap-2">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 text-sm rounded-full transition-colors duration-300 ${activeCategory === category ? 'bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-semibold' : 'bg-zinc-700 text-gray-300'}`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
                {INTERIOR_DESIGN_GALLERY[activeCategory].map((image, index) => (
                     <div key={index} className="rounded-lg overflow-hidden">
                        <img src={image} alt={`${activeCategory} design ${index + 1}`} className="w-full h-40 object-cover hover:scale-110 transition-transform duration-300" />
                    </div>
                ))}
            </div>

             <div className="mt-10 text-center">
                 {/* FIX: Using Link from the namespace import. */}
                 <ReactRouterDOM.Link to="/schedule-visit" className="inline-block bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
                    Book Interior Consultation
                </ReactRouterDOM.Link>
            </div>
        </div>
    );
};

export default InteriorDesignPage;