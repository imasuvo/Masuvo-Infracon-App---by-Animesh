import React, { useState } from 'react';
// FIX: Using namespace import for react-router-dom to resolve module export errors.
import * as ReactRouterDOM from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/solid';
import ReadMore from '../components/ReadMore';
import { motion, AnimatePresence } from 'framer-motion';
import BrochureViewerModal from '../components/BrochureViewerModal';

const CTAButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <ReactRouterDOM.Link to={to} className="inline-block mt-4 bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
        {children}
    </ReactRouterDOM.Link>
);


const AboutPage: React.FC = () => {
    const [isBrochureModalOpen, setBrochureModalOpen] = useState(false);
    const brochurePdfUrl = "https://docs.google.com/gview?url=https://imagecdn.99acres.com/media1/28639/18/572798025O-1740557002439.pdf&embedded=true";

    const buildingFeatures = [
        "Personalized Building Solutions for Every Vision",
        "Commitment to Unmatched Quality and Expertise",
        "Sustainable Practices and Timely Execution",
        "Tailored Designs for Unique Lifestyles",
        "Premium Materials, Exceptional Durability",
        "Commitment to Deadlines Without Compromising Quality"
    ];

    const aboutText = `Masuvo Infracon Pvt Ltd is a premier construction company specializing in crafting exquisite villas and bungalows that epitomize luxury and elegance. With an unwavering commitment to quality and customer satisfaction, Masuvo Infracon offers end-to-end services that seamlessly cover every aspect of the construction journey, ensuring a stress-free and rewarding experience for its clients.

A standout strength of Masuvo Infracon is its expertise in land search and acquisition. Backed by a dedicated team of professionals, the company excels at identifying prime locations for villa and bungalow developments. By meticulously evaluating factors like accessibility, infrastructure, and environmental suitability, Masuvo Infracon ensures that each project begins with the perfect foundation for creating exceptional living spaces.`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen space-y-8">
                <div>
                    <h2 className="text-3xl font-bold mb-2 text-golden-yellow">{COMPANY_INFO.name}</h2>
                    <p className="italic text-lg text-gray-700 dark:text-gray-300">"{COMPANY_INFO.tagline}"</p>
                </div>

                <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl">
                     <h3 className="text-xl font-semibold mb-2 text-golden-yellow">About Company</h3>
                     <p className="font-semibold text-gray-800 dark:text-gray-300 mb-3">The Story Of Masuvo Infracon And The Team Behind Your Next Home.</p>
                     <div className="text-gray-600 dark:text-gray-400 text-sm">
                        <ReadMore text={aboutText} maxLength={200} />
                     </div>
                     <CTAButton to="/contact">Contact Us</CTAButton>
                </div>
                
                <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl">
                     <h3 className="text-xl font-semibold mb-2 text-golden-yellow">Building Your Dreams</h3>
                     <p className="font-semibold text-gray-800 dark:text-gray-300 mb-3">Create The Building You Want Here</p>
                     <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        At Masuvo Infracon Private Limited, we transform your architectural dreams into reality. Whether you're envisioning a modern home, a sprawling commercial complex, or a bespoke retail space, we’re here to bring your vision to life.
                     </p>
                     <ul className="space-y-2">
                        {buildingFeatures.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-800 dark:text-gray-300 text-sm">{feature}</span>
                            </li>
                        ))}
                     </ul>
                     <CTAButton to="/contact">Get a Detailed Quote</CTAButton>
                </div>

                 <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl">
                    <h3 className="text-xl font-semibold mb-4 text-golden-yellow">Company Brochure</h3>
                    <div className="bg-white/50 dark:bg-zinc-900/50 p-8 rounded-lg flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-300 dark:border-zinc-700">
                        <DocumentTextIcon className="h-16 w-16 text-golden-yellow/50 mb-4" />
                        <h4 className="text-lg font-bold text-zinc-900 dark:text-white">Explore Our Company Profile</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 mb-4">Get an in-depth look at our projects, mission, and vision.</p>
                        <button 
                            onClick={() => setBrochureModalOpen(true)}
                            className="bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
                        >
                            View Brochure
                        </button>
                    </div>
                </div>

                 <div className="bg-gray-100 dark:bg-zinc-800 p-6 rounded-xl">
                     <h3 className="text-xl font-semibold mb-2 text-golden-yellow">Founder's Message</h3>
                     <div className="flex items-start gap-4">
                        <img src="https://infraconmasuvo.com/wp-content/uploads/2025/02/1-1.png" alt={COMPANY_INFO.founder} className="w-20 h-20 rounded-full object-cover border-2 border-golden-yellow" />
                        <div>
                            <p className="text-gray-700 dark:text-gray-300 italic">"Our goal is simple: to build homes that we would be proud to live in ourselves. Quality is not an act, it is a habit."</p>
                            <p className="mt-2 font-bold text-right text-zinc-900 dark:text-white">- {COMPANY_INFO.founder}</p>
                        </div>
                     </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-2 text-golden-yellow">Our Office</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{COMPANY_INFO.address}</p>
                    <div className="rounded-lg overflow-hidden">
                       <iframe 
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4425.356347632705!2d87.35291579999999!3d23.5173338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f771003aeca403%3A0x71918b8588c5ced0!2sMasuvo%20Infracon%20Pvt.Ltd.!5e1!3m2!1sen!2sin!4v1757152512136!5m2!1sen!2sin" 
                           width="100%" 
                           height="250" 
                           style={{border:0}} 
                           allowFullScreen={true} 
                           loading="lazy" 
                           referrerPolicy="no-referrer-when-downgrade"
                           title="Office Location"
                       ></iframe>
                   </div>
                </div>
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

export default AboutPage;