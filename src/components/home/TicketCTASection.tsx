import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';

export const TicketCTASection: React.FC = () => {
    return (
        <section className="relative py-28 bg-dark-950 overflow-hidden">
            {/* Background Image / Overlay */}
            <div className="absolute inset-0 opacity-40">
                <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Background"
                    className="w-full h-full object-cover grayscale mix-blend-multiply"
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                        ARE YOU READY FOR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">
                            NEXT SEASON?
                        </span>
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
                        {/* Price Card */}
                        <div className="bg-white text-dark-950 p-8 rounded-2xl w-full max-w-sm shadow-2xl transform md:-rotate-3 hover:rotate-0 transition-transform duration-300">
                            <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Regular Pass</span>
                            <div className="text-5xl font-black my-4 text-primary-600">GHS 50<span className="text-lg text-gray-400 font-normal">.00</span></div>
                            <ul className="text-left space-y-3 mb-8 text-gray-600 text-sm">
                                <li className="flex items-center gap-2">✓ Full Conference Access</li>
                                <li className="flex items-center gap-2">✓ Conference Materials</li>
                                <li className="flex items-center gap-2">✓ Networking Session</li>
                                <li className="flex items-center gap-2">✓ Item 13 (Lunch)</li>
                            </ul>
                            <button className="w-full py-4 bg-dark-950 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
                                Purchase Now
                            </button>
                        </div>

                        {/* Action Text */}
                        <div className="text-left md:max-w-xs">
                            <p className="text-gray-300 text-lg mb-6">
                                Don't miss out on this life-changing opportunity. Seats are filling up fast!
                            </p>
                            <a href="/register" className="inline-flex items-center gap-2 text-primary-500 font-bold text-xl hover:text-white transition-colors">
                                Book Your Ticket <HiArrowRight />
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
