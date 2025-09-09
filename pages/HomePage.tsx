import React, { useState, useEffect } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { PROPERTIES, CONSTRUCTION_SERVICES, TESTIMONIALS, COMPANY_INFO } from '../constants';
import PropertyCard from '../components/PropertyCard';
import { motion, AnimatePresence } from 'framer-motion';
import BrochureViewerModal from '../components/BrochureViewerModal';
import { DocumentTextIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';


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

const CTAButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <ReactRouterDOM.Link to={to} className="flex-1 text-center bg-gradient-to-r from-orange-500 to-orange-600 dark:from-golden-yellow dark:to-golden-orange text-white dark:text-charcoal font-semibold py-3 px-4 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
        {children}
    </ReactRouterDOM.Link>
);

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    };
  }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const TestimonialCarousel: React.FC = () => {
    const [[page, direction], setPage] = useState([0, 0]);
    const timeoutRef = React.useRef<number | null>(null);

    const imageIndex = ((page % TESTIMONIALS.length) + TESTIMONIALS.length) % TESTIMONIALS.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = window.setTimeout(() => paginate(1), 7000);

        return () => {
            resetTimeout();
        };
    }, [page]);
    
    const goToSlide = (slideIndex: number) => {
        const diff = slideIndex - imageIndex;
        if (diff !== 0) {
           setPage([page + diff, diff > 0 ? 1 : -1]);
        }
    };

    return (
        <div 
            className="relative"
            onMouseEnter={resetTimeout}
            onMouseLeave={() => {
                 timeoutRef.current = window.setTimeout(() => paginate(1), 7000);
            }}
        >
            <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-zinc-800 p-6 relative h-[300px] sm:h-[280px] flex flex-col justify-center">
                {/* Decorative Quote Icon */}
                <span className="absolute top-4 left-4 text-7xl font-serif text-orange-600/20 dark:text-golden-yellow/20 opacity-50 select-none z-0" aria-hidden="true">“</span>
                
                <AnimatePresence initial={false} custom={direction}>
                     <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                paginate(1);
                            } else if (swipe > swipeConfidenceThreshold) {
                                paginate(-1);
                            }
                        }}
                        className="absolute inset-0 p-6 flex flex-col justify-center"
                    >
                         <p className="text-gray-600 dark:text-gray-300 italic text-md sm:text-lg leading-relaxed pt-2 relative z-10">
                            {TESTIMONIALS[imageIndex].quote}
                        </p>
                        <div className="relative mt-auto flex items-center gap-4 z-10 pt-4">
                            <img src={TESTIMONIALS[imageIndex].avatar} alt={TESTIMONIALS[imageIndex].author} className="w-12 h-12 rounded-full object-cover border-2 border-orange-600 dark:border-golden-yellow" />
                            <div>
                                <p className="font-bold text-orange-600 dark:text-golden-yellow">{TESTIMONIALS[imageIndex].author}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{TESTIMONIALS[imageIndex].project}</p>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
            
            <button
                onClick={() => paginate(-1)}
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-3 bg-white/60 dark:bg-charcoal/60 p-2 rounded-full text-zinc-900 dark:text-white hover:bg-orange-500 dark:hover:bg-golden-yellow hover:text-white dark:hover:text-charcoal transition-colors z-20"
                aria-label="Previous testimonial"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-3 bg-white/60 dark:bg-charcoal/60 p-2 rounded-full text-zinc-900 dark:text-white hover:bg-orange-500 dark:hover:bg-golden-yellow hover:text-white dark:hover:text-charcoal transition-colors z-20"
                aria-label="Next testimonial"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>

            <div className="flex justify-center mt-4 space-x-2">
                {TESTIMONIALS.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${imageIndex === index ? 'bg-orange-500 dark:bg-golden-yellow w-6' : 'bg-gray-300 dark:bg-zinc-600 hover:bg-gray-400 dark:hover:bg-zinc-500 w-2.5'}`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    ></button>
                ))}
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
    const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);
    const brochurePdfUrl = "https://docs.google.com/gview?url=https://imagecdn.99acres.com/media1/28639/18/572798025O-1740557002439.pdf&embedded=true";

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="space-y-12 pb-12">
                <HeroSlider />

                <div className="px-4 space-y-4 -mt-10 relative z-10">
                    <div className="flex gap-2">
                        <CTAButton to="/schedule-visit">Schedule Site Visit</CTAButton>
                        <CTAButton to="/budget-estimator">Estimate Budget</CTAButton>
                    </div>
                </div>

                <section className="px-4">
                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-golden-yellow">Featured Properties</h3>
                    <div className="space-y-6">
                        {PROPERTIES.slice(0, 2).map(prop => (
                            <PropertyCard key={prop.id} property={prop} />
                        ))}
                    </div>
                    <ReactRouterDOM.Link to="/properties" className="block text-center mt-6 text-orange-600 dark:text-golden-yellow hover:underline">View All Properties</ReactRouterDOM.Link>
                </section>

                <section className="px-4">
                     <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-golden-yellow">Our Services</h3>
                     <div className="grid grid-cols-2 gap-4">
                         <ReactRouterDOM.Link to="/construction" className="block p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-300">
                            <h4 className="font-semibold text-lg">Construction</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Quality you can trust.</p>
                         </ReactRouterDOM.Link>
                         <ReactRouterDOM.Link to="/interiors" className="block p-4 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-300">
                            <h4 className="font-semibold text-lg">Trayaksh Interior</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Designs that inspire.</p>
                         </ReactRouterDOM.Link>
                     </div>
                </section>

                <section className="px-4">
                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-golden-yellow">Company Brochure</h3>
                    <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl">
                        <div className="bg-white/50 dark:bg-zinc-900/50 p-8 rounded-lg flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-zinc-700">
                            <DocumentTextIcon className="h-16 w-16 text-orange-600/50 dark:text-golden-yellow/50 mb-4" />
                            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Explore Our Company Profile</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">Get an in-depth look at our projects, mission, and vision.</p>
                            <button 
                                onClick={() => setBrochureModalOpen(true)}
                                className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-golden-yellow dark:to-golden-orange text-white dark:text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
                            >
                                View Brochure
                            </button>
                        </div>
                    </div>
                </section>
                
                <section className="px-4">
                    <h3 className="text-2xl font-bold mb-4 text-orange-600 dark:text-golden-yellow">What Our Clients Say</h3>
                    <TestimonialCarousel />
                </section>
            </div>
             <AnimatePresence>
                {isBrochureModalOpen && (
                    <BrochureViewerModal 
                        pdfUrl={brochurePdfUrl}
                        onClose={() => setBrochureModalOpen(false)}
                    />
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default HomePage;