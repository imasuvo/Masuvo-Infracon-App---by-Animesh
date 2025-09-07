import React from 'react';
import { COMPANY_INFO } from '../constants';

const ContactPage: React.FC = () => {
    return (
        <div className="p-4 min-h-screen">
             <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Get in Touch with Masuvo Infracon</h2>
             <p className="text-gray-300 mb-8">We're here to help you build your dream home.</p>

            {/* FormSubmit.co Form */}
            <form 
                action="https://formsubmit.co/imasuvo@gmail.com" 
                method="POST" 
                className="space-y-4 bg-zinc-800 p-6 rounded-xl mb-8"
            >
                <h3 className="text-xl font-semibold text-white">Send us a message</h3>
                
                {/* FormSubmit Hidden Fields */}
                <input type="hidden" name="_cc" value="animeshmaji777@gmail.com" />
                <input type="hidden" name="_captcha" value="false" />

                {/* Form Fields */}
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Full Name" 
                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" 
                    required 
                />
                <input 
                    type="email" 
                    name="email"
                    placeholder="Email Address" 
                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" 
                    required 
                />
                <input 
                    type="tel" 
                    name="phone"
                    placeholder="Phone Number" 
                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" 
                    required 
                />
                <textarea 
                    name="message"
                    placeholder="Your Message" 
                    rows={4} 
                    className="w-full bg-zinc-700 border-zinc-600 text-white rounded-lg p-3" 
                    required
                ></textarea>
                <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
                >
                    Submit Inquiry
                </button>
            </form>

            {/* Quick Contact Options */}
            <div className="text-center">
                 <h3 className="text-xl font-semibold text-golden-yellow mb-4">Or Contact Us Directly</h3>
                 <div className="grid grid-cols-2 gap-2 mb-2">
                    <a href={`tel:${COMPANY_INFO.phone}`} className="bg-zinc-800 p-4 rounded-xl text-center hover:bg-zinc-700 transition-colors">
                        <p className="font-semibold text-golden-yellow">Call Now</p>
                    </a>
                     <a href={`https://wa.me/${COMPANY_INFO.whatsapp}?text=Hello Masuvo Infracon!`} target="_blank" rel="noopener noreferrer" className="bg-zinc-800 p-4 rounded-xl text-center hover:bg-zinc-700 transition-colors">
                        <p className="font-semibold text-golden-yellow">WhatsApp</p>
                    </a>
                </div>
                <a href={COMPANY_INFO.googleMapsLink} target="_blank" rel="noopener noreferrer" className="block bg-zinc-800 p-4 rounded-xl text-center hover:bg-zinc-700 transition-colors">
                    <p className="font-semibold text-golden-yellow">Get Directions</p>
                </a>
            </div>
        </div>
    );
};

export default ContactPage;
