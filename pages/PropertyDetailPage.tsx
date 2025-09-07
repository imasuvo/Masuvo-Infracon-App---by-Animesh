import React from 'react';
// FIX: Changed react-router-dom import to a namespace import to resolve export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { PROPERTIES, COMPANY_INFO } from '../constants';
import { ArrowLeftIcon, MapPinIcon, BuildingOfficeIcon, ArrowsPointingOutIcon, GlobeAltIcon } from '@heroicons/react/24/solid';

const PropertyDetailPage: React.FC = () => {
    // FIX: Using useParams from the namespace import.
    const { id } = ReactRouterDOM.useParams<{ id: string }>();
    const property = PROPERTIES.find(p => p.id === id);

    if (!property) {
        return <div className="p-4 text-center">Property not found.</div>;
    }

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
        <div>
            <div className="relative">
                 <img src={property.images[0]} alt={property.title} className="w-full h-64 object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent"></div>
                 {/* FIX: Using Link from the namespace import. */}
                 <ReactRouterDOM.Link to="/properties" className="absolute top-4 left-4 bg-charcoal/70 p-2 rounded-full text-white hover:bg-charcoal">
                    <ArrowLeftIcon className="h-5 w-5"/>
                 </ReactRouterDOM.Link>
                 <div className="absolute bottom-0 left-0 p-4">
                     <h1 className="text-3xl font-bold text-white">{property.title}</h1>
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
                    <p className="text-gray-300">{property.description}</p>
                </div>
                
                <div>
                    <h2 className="text-xl font-semibold text-golden-yellow mb-2">Photo Gallery</h2>
                    <div className="grid grid-cols-2 gap-2">
                        {property.images.map((img, index) => (
                            <img key={index} src={img} alt={`${property.title} view ${index+1}`} className="rounded-lg object-cover w-full h-32"/>
                        ))}
                    </div>
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
        </div>
    );
};

export default PropertyDetailPage;