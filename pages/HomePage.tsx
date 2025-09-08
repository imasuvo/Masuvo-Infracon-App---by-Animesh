import React, { useState, useEffect } from 'react';
// FIX: Replaced namespace import of 'react-router-dom' with a named import for Link to resolve export errors.
import { Link } from 'react-router-dom';
import { PROPERTIES, CONSTRUCTION_SERVICES, TESTIMONIALS, COMPANY_INFO } from '../constants';
import PropertyCard from '../components/PropertyCard';

const HeroSlider: React.FC = () => {
    const images = [
        '/assets/hero/hero1.jpg',
        '/assets/hero/hero2.jpg',
        '/assets/hero/hero3.jpg',
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

// FIX: Using Link from the named import.
const CTAButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <Link to={to} className="flex-1 text-center bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-semibold py-3 px-4 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
        {children}
    </Link>
);

const TestimonialCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timeoutRef = React.useRef<number | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
                ),
            7000 // Change slide every 7 seconds
        );

        return () => {
            resetTimeout();
        };
    }, [currentIndex]);

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };
    
    const handleInteractionStart = () => {
        resetTimeout();
    };

    const handleInteractionEnd = () => {
         timeoutRef.current = window.setTimeout(
            () =>
                setCurrentIndex((prevIndex) =>
                    prevIndex === TESTIMONIALS.length - 1 ? 0 : prevIndex + 1
                ),
            7000
        );
    };

    return (
        <div 
            className="relative"
            onMouseEnter={handleInteractionStart}
            onMouseLeave={handleInteractionEnd}
            onTouchStart={handleInteractionStart}
            onTouchEnd={handleInteractionEnd}
        >
            <div className="overflow-hidden rounded-xl bg-zinc-800 p-6 relative h-[280px] sm:h-[260px] flex flex-col justify-between">
                {/* Decorative Quote Icon */}
                <span className="absolute top-4 left-4 text-7xl font-serif text-golden-yellow/20 opacity-50 select-none" aria-hidden="true">“</span>
                
                <div className="relative flex-grow overflow-hidden">
                    <div
                        className="absolute inset-0"
                    >
                        {TESTIMONIALS.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                aria-hidden={index !== currentIndex}
                            >
                                <p className="text-gray-300 italic text-md sm:text-lg leading-relaxed pt-8">
                                    {testimonial.quote}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative mt-4">
                    <div className="relative h-14">
                        {TESTIMONIALS.map((testimonial, index) => (
                           <div 
                                key={index} 
                                className={`absolute inset-0 flex items-center gap-4 transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}
                                aria-hidden={index !== currentIndex}
                            >
                                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border-2 border-golden-yellow" />
                                <div>
                                    <p className="font-bold text-golden-yellow">{testimonial.author}</p>
                                    <p className="text-xs text-gray-400">{testimonial.project}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>

            <div className="flex justify-center mt-4 space-x-2">
                {TESTIMONIALS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-golden-yellow w-6' : 'bg-zinc-600 hover:bg-zinc-500 w-2.5'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    ></button>
                ))}
            </div>
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
                {/* FIX: Using Link from the named import. */}
                <Link to="/properties" className="block text-center mt-6 text-golden-yellow hover:underline">View All Properties</Link>
            </section>

            <section className="px-4">
                 <h3 className="text-2xl font-bold mb-4 text-golden-yellow">Our Services</h3>
                 <div className="grid grid-cols-2 gap-4">
                     {/* FIX: Using Link from the named import. */}
                     <Link to="/construction" className="block p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300">
                        <h4 className="font-semibold text-lg">Construction</h4>
                        <p className="text-sm text-gray-400">Quality you can trust.</p>
                     </Link>
                     {/* FIX: Using Link from the named import. */}
                     <Link to="/interiors" className="block p-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 transition-colors duration-300">
                        <h4 className="font-semibold text-lg">Trayaksh Interior</h4>
                        <p className="text-sm text-gray-400">Designs that inspire.</p>
                     </Link>
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