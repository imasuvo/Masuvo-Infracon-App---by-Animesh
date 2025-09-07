import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { COMPANY_INFO } from '../constants';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const CTAButton: React.FC<{ to: string, children: React.ReactNode }> = ({ to, children }) => (
    <ReactRouterDOM.Link to={to} className="inline-block mt-4 bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-2 px-6 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300">
        {children}
    </ReactRouterDOM.Link>
);


const AboutPage: React.FC = () => {
    const buildingFeatures = [
        "Personalized Building Solutions for Every Vision",
        "Commitment to Unmatched Quality and Expertise",
        "Sustainable Practices and Timely Execution",
        "Tailored Designs for Unique Lifestyles",
        "Premium Materials, Exceptional Durability",
        "Commitment to Deadlines Without Compromising Quality"
    ];

    return (
        <div className="p-4 min-h-screen space-y-8">
            <div>
                <h2 className="text-3xl font-bold mb-2 text-golden-yellow">{COMPANY_INFO.name}</h2>
                <p className="italic text-lg text-gray-300">"{COMPANY_INFO.tagline}"</p>
            </div>

            <div className="bg-zinc-800 p-6 rounded-xl">
                 <h3 className="text-xl font-semibold mb-2 text-golden-yellow">About Company</h3>
                 <p className="font-semibold text-gray-300 mb-3">The Story Of Masuvo Infracon And The Team Behind Your Next Home.</p>
                 <p className="text-gray-400 text-sm space-y-3">
                    <span>
                        Masuvo Infracon Pvt Ltd is a premier construction company specializing in crafting exquisite villas and bungalows that epitomize luxury and elegance. With an unwavering commitment to quality and customer satisfaction, Masuvo Infracon offers end-to-end services that seamlessly cover every aspect of the construction journey, ensuring a stress-free and rewarding experience for its clients.
                    </span>
                    <span>
                         A standout strength of Masuvo Infracon is its expertise in land search and acquisition. Backed by a dedicated team of professionals, the company excels at identifying prime locations for villa and bungalow developments. By meticulously evaluating factors like accessibility, infrastructure, and environmental suitability, Masuvo Infracon ensures that each project begins with the perfect foundation for creating exceptional living spaces.
                    </span>
                 </p>
                 <CTAButton to="/contact">Contact Us</CTAButton>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-xl">
                 <h3 className="text-xl font-semibold mb-2 text-golden-yellow">Building Your Dreams</h3>
                 <p className="font-semibold text-gray-300 mb-3">Create The Building You Want Here</p>
                 <p className="text-gray-400 text-sm mb-4">
                    At Masuvo Infracon Private Limited, we transform your architectural dreams into reality. Whether you're envisioning a modern home, a sprawling commercial complex, or a bespoke retail space, we’re here to bring your vision to life.
                 </p>
                 <ul className="space-y-2">
                    {buildingFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                    ))}
                 </ul>
                 <CTAButton to="/contact">Get a Detailed Quote</CTAButton>
            </div>

             <div className="bg-zinc-800 p-6 rounded-xl">
                 <h3 className="text-xl font-semibold mb-2 text-golden-yellow">Founder's Message</h3>
                 <div className="flex items-start gap-4">
                    <img src="https://picsum.photos/seed/founder/100/100" alt={COMPANY_INFO.founder} className="w-20 h-20 rounded-full object-cover border-2 border-golden-yellow" />
                    <div>
                        <p className="text-gray-300 italic">"Our goal is simple: to build homes that we would be proud to live in ourselves. Quality is not an act, it is a habit."</p>
                        <p className="mt-2 font-bold text-right text-white">- {COMPANY_INFO.founder}</p>
                    </div>
                 </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold mb-2 text-golden-yellow">Our Office</h3>
                <p className="text-gray-300 mb-4">{COMPANY_INFO.address}</p>
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
    );
};

export default AboutPage;