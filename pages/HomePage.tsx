import React, { useState, useEffect } from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { PROPERTIES, CONSTRUCTION_SERVICES, TESTIMONIALS, COMPANY_INFO } from '../constants';
import PropertyCard from '../components/PropertyCard';

const HeroSlider: React.FC = () => {
    const images = [
        'https://picsum.photos/seed/hero1/800/600',
        'https://picsum.photos/seed/hero2/800/600',
        'https://picsum.photos/seed/hero3/800/600',
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-80 overflow-hidden">
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={image} alt={`Bungalow ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
            ))}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-4xl font-bold tracking-tight">{COMPANY_INFO.tagline}</h2>
                <p className="mt-2 text-lg">Your dream home, built with precision and passion.</p>
            </div>
        </div>
    );
};

// FIX: Using Link from the namespace import.
const CTAButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <ReactRouterDOM.Link to={to} className="flex-1 text-center bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-semibold py-3 px-4 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
        {children}
    </ReactRouterDOM.Link>
);

const TestimonialCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-48 overflow-hidden rounded-xl bg-zinc-800 p-6">
            {TESTIMONIALS.map((testimonial, index) => (
                <div key={index} className={`absolute inset-0 p-6 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                    <p className="mt-4 font-bold text-right text-golden-yellow">- {testimonial.author}</p>
                    <p className="text-xs text-right text-gray-400">{testimonial.project}</p>
                </div>
            ))}
        </div>
    );
};


const HomePage: React.FC = () => {
    return (
        <div className="space-y-12 pb-12">
            <HeroSlider />

            <div className="px-4 space-y-4 -mt-10 relative z-10">
                <div className="flex gap-2">
                    <CTAButton to="/schedule-visit">Schedule Site Visit</CTAButton>
                    <CTAButton to="/budget-estimator">Estimate Budget</CTAButton>
                </div>
            </div>

            <section className="px-4">
                <h3 className="text-2xl font-bold mb-4 text-golden-yellow">Featured Properties</h3>
                <div className="space-y-6">
                    {PROPERTIES.slice(0, 2).map(prop => (
                        <PropertyCard key={prop.id} property={prop} />
                    ))}
                </div>
                {/* FIX: Using Link from the namespace import. */}
                <ReactRouterDOM.Link to="/properties" className="block text-center mt-6 text-golden-yellow hover:underline">View All Properties</ReactRouterDOM.Link>
            </section>

            <section className="px-4">
                 <h3 className="text-2xl font-bold mb-4 text-golden-yellow">Our Services</h3>
                 <div className="grid grid-cols-2 gap-4">
                     {/* FIX: Using Link from the namespace import. */}
                     <ReactRouterDOM.Link to="/construction" className="block p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300">
                        <h4 className="font-semibold text-lg">Construction</h4>
                        <p className="text-sm text-gray-400">Quality you can trust.</p>
                     </ReactRouterDOM.Link>
                     {/* FIX: Using Link from the namespace import. */}
                     <ReactRouterDOM.Link to="/interiors" className="block p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300">
                        <h4 className="font-semibold text-lg">Trayaksh Interior</h4>
                        <p className="text-sm text-gray-400">Designs that inspire.</p>
                     </ReactRouterDOM.Link>
                 </div>
            </section>
            
            <section className="px-4">
                <h3 className="text-2xl font-bold mb-4 text-golden-yellow">What Our Clients Say</h3>
                <TestimonialCarousel />
            </section>
        </div>
    );
};

export default HomePage;