import React, { useState } from 'react';
import { COMPANY_INFO } from '../constants';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import ErrorDisplay from '../components/ErrorDisplay';
import Spinner from '../components/Spinner';

const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);
        const form = event.currentTarget;
        const data = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setError('Sorry, there was an error sending your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen">
                 <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Get in Touch with Masuvo Infracon</h2>
                 <p className="text-gray-300 mb-8">We're here to help you build your dream home.</p>

                <div className="bg-zinc-800 p-6 rounded-xl mb-8">
                    {submitted ? (
                        <div className="text-center py-8">
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4 animate-pulse" />
                            <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                            <p className="text-gray-300">Thank you for reaching out. We'll get back to you shortly.</p>
                        </div>
                    ) : (
                        <form 
                            action="https://formsubmit.co/imasuvo@gmail.com" 
                            method="POST" 
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <h3 className="text-xl font-semibold text-white">Send us a message</h3>
                            
                            <input type="hidden" name="_cc" value="animeshmaji777@gmail.com" />
                            <input type="hidden" name="_captcha" value="false" />

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

                            {error && <ErrorDisplay title="Submission Failed" message={error} />}

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-golden-yellow to-golden-orange text-charcoal font-bold py-3 px-8 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner size="sm" className="mr-2 text-charcoal" />
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    <span>Submit Inquiry</span>
                                )}
                            </button>
                        </form>
                    )}
                </div>

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
        </motion.div>
    );
};

export default ContactPage;