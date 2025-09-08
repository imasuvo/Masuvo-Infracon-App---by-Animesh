import React, { useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { PROPERTIES, COMPANY_INFO } from '../constants';
import { ArrowLeftIcon, MapPinIcon, BuildingOfficeIcon, ArrowsPointingOutIcon, GlobeAltIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/24/outline';
import { useFavorites } from '../contexts/FavoritesContext';
import ReadMore from '../components/ReadMore';
import { motion, AnimatePresence } from 'framer-motion';
import NotFoundPage from './NotFoundPage';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

const PropertyDetailPage: React.FC = () => {
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const property = PROPERTIES.find(p => p.id === id);
    const { isFavorite, toggleFavorite } = useFavorites();
    const [[page, direction], setPage] = useState([0, 0]);


    if (!property) {
        return <NotFoundPage />;
    }
    
    const imageIndex = property.images?.length > 0 ? ((page % property.images.length) + property.images.length) % property.images.length : 0;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };
    
    const handleDotClick = (i: number) => {
        if (i !== imageIndex) {
            const diff = i - imageIndex;
            setPage([page + diff, diff > 0 ? 1 : -1]);
        }
    }

    const isSaved = isFavorite(property.id);

    const handleShare = async () => {
        const shareData = {
            title: property.title,
            text: property.description,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Property link copied to clipboard!');
            } catch (err) {
                console.error('Failed to copy link:', err);
                alert('Could not copy link. Please copy it manually.');
            }
        }
    };

    const DetailItem: React.FC<{ icon: React.ElementType, label: string, value: string, className?: string }> = ({ icon: Icon, label, value, className = '' }) => (
        <div className={`flex items-start ${className}`}>
            <Icon className="h-5 w-5 mr-3 text-golden-yellow flex-shrink-0 mt-0.5" />
            <div>
                <p className="text-xs text-gray-400">{label}</p>
                <p className="font-semibold text-white">{value}</p>
            </div>
        </div>
    );


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative">
                 <img src={property.images?.[0] || 'https://picsum.photos/seed/placeholder-hero/800/600'} alt={property.title} className="w-full h-64 object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
                 <ReactRouterDOM.Link to="/properties" className="absolute top-4 left-4 bg-charcoal/70 p-2 rounded-full text-white hover:bg-charcoal z-10">
                    <ArrowLeftIcon className="h-5 w-5"/>
                 </ReactRouterDOM.Link>
                 <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                        onClick={handleShare}
                        className="bg-charcoal/70 p-2 rounded-full text-white hover:text-golden-yellow transition-colors duration-200 z-10"
                        aria-label="Share property"
                    >
                        <ShareIcon className="h-6 w-6" />
                    </button>
                    <button 
                        onClick={() => toggleFavorite(property.id)}
                        className="bg-charcoal/70 p-2 rounded-full text-white hover:text-coral-red transition-colors duration-200 z-10"
                        aria-label={isSaved ? 'Remove from favorites' : 'Add to favorites'}
                    >
                        {isSaved ? <HeartIconSolid className="h-6 w-6 text-coral-red" /> : <HeartIconOutline className="h-6 w-6" />}
                    </button>
                </div>
                 <div className="absolute bottom-0 left-0 p-4 w-full">
                     <h1 className="text-3xl font-bold text-white break-words">{property.title}</h1>
                     <p className="text-lg text-golden-yellow font-semibold">{property.price}</p>
                 </div>
            </div>
            
            <div className="p-4 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-zinc-800 p-4 rounded-xl">
                    <DetailItem icon={BuildingOfficeIcon} label="Type" value={`${property.type} ${property.style}`} />
                    <DetailItem icon={ArrowsPointingOutIcon} label="Built-up Area" value={`${property.size.toLocaleString('en-IN')} sq. ft.`} />
                    {property.landArea && (
                        <DetailItem icon={GlobeAltIcon} label="Land Area" value={property.landArea} />
                    )}
                     <DetailItem icon={MapPinIcon} label="Location" value={property.subLocation} className="col-span-2" />
                </div>


                <div>
                    <h2 className="text-xl font-semibold text-golden-yellow mb-2">Description</h2>
                    <ReadMore text={property.description} maxLength={150} />
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-golden-yellow mb-2">Photo Gallery</h2>
                    {property.images && property.images.length > 0 ? (
                        <div className="relative w-full h-64 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={page}
                                    src={property.images[imageIndex]}
                                    alt={`${property.title} view ${imageIndex + 1}`}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: 'spring', stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 },
                                    }}
                                    className="absolute w-full h-full object-cover"
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
                                />
                            </AnimatePresence>
                            
                            <button
                                onClick={() => paginate(-1)}
                                className="absolute top-1/2 left-2 -translate-y-1/2 bg-charcoal/60 p-2 rounded-full text-white hover:bg-charcoal/90 transition-colors z-10"
                                aria-label="Previous image"
                            >
                                <ChevronLeftIcon className="h-6 w-6" />
                            </button>
                            <button
                                onClick={() => paginate(1)}
                                className="absolute top-1/2 right-2 -translate-y-1/2 bg-charcoal/60 p-2 rounded-full text-white hover:bg-charcoal/90 transition-colors z-10"
                                aria-label="Next image"
                            >
                                <ChevronRightIcon className="h-6 w-6" />
                            </button>

                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                {property.images.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleDotClick(i)}
                                        className={`h-2.5 w-2.5 rounded-full transition-colors ${i === imageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'}`}
                                        aria-label={`Go to image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                         <div className="relative w-full h-64 rounded-lg overflow-hidden bg-zinc-800 flex items-center justify-center">
                             <img src='https://picsum.photos/seed/placeholder/800/600' alt="Placeholder" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div>
                    <h2 className="text-xl font-semibold text-golden-yellow mb-2">Floor Plan</h2>
                    <img src={property.floorPlan} alt="Floor Plan" className="rounded-lg w-full" />
                </div>
                
                <div>
                     <h2 className="text-xl font-semibold text-golden-yellow mb-2">Location on Map</h2>
                     <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                        <iframe 
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(`${property.subLocation}, Durgapur, West Bengal`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            width="100%" 
                            height="100%" 
                            style={{border:0}} 
                            allowFullScreen={false} 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Property Location"
                        ></iframe>
                    </div>
                </div>
                 <div className="fixed bottom-20 left-0 right-0 p-4 bg-charcoal/80 backdrop-blur-sm max-w-lg mx-auto">
                    <a href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hi, I am interested in the property: ${property.title} (ID: ${property.id})`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full block text-center bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-4 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
                    >
                        Enquire Now on WhatsApp
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default PropertyDetailPage;