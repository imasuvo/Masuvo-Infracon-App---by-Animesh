import React, { useState } from 'react';
import { FAQS } from '../constants';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem: React.FC<{
    faq: { question: string; answer: string };
    isOpen: boolean;
    onClick: () => void;
}> = ({ faq, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 dark:border-golden-yellow/20 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4"
                aria-expanded={isOpen}
            >
                <h3 className="text-md font-semibold text-zinc-900 dark:text-white pr-4">{faq.question}</h3>
                {isOpen ? (
                    <MinusIcon className="h-5 w-5 text-golden-yellow flex-shrink-0" />
                ) : (
                    <PlusIcon className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                )}
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: 'auto' },
                            collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 pr-6 text-gray-600 dark:text-gray-300">
                            <p>{faq.answer}</p>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>
        </div>
    );
};


const FAQPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 min-h-screen">
                <h2 className="text-3xl font-bold mb-2 text-golden-yellow">Frequently Asked Questions</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">Find answers to common questions about our services.</p>

                <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-xl">
                    {FAQS.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onClick={() => handleToggle(index)}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default FAQPage;