import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TShirtRequestForm } from './TShirtRequestForm';

export const TShirtSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Visual Display (Left) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full max-w-xl group/shirt"
                    >
                        <div className="relative aspect-square flex items-center justify-center">
                            {/* Decorative background element */}
                            <div className="absolute inset-0 bg-primary-50 rounded-full blur-3xl opacity-30 z-0 scale-75"></div>

                            <motion.img
                                key="shirt-preview"
                                initial={{ opacity: 0, rotate: -5 }}
                                animate={{ opacity: 1, rotate: 0 }}
                                src="/images/shirt_black.jpg"
                                alt="Official SRC T-Shirt"
                                className="relative z-10 w-full h-auto drop-shadow-[0_35px_60px_rgba(0,0,0,0.3)] hover:scale-110 transition-transform duration-700"
                            />

                            {/* Secondary Shirt (Peek) */}
                            <motion.img
                                initial={{ opacity: 0, x: 20, rotate: 5 }}
                                whileInView={{ opacity: 0.4, x: 60, rotate: 10 }}
                                src="/images/shirt_white.jpg"
                                className="absolute z-0 w-2/3 h-auto grayscale-0 brightness-105 opacity-40 blur-[1px] -right-20 pointer-events-none"
                            />
                        </div>
                    </motion.div>

                    {/* Text Content (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex-1 text-left"
                    >
                        <span className="inline-block text-primary-600 font-black uppercase tracking-widest text-sm mb-4">Official Merchandise</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-950 mb-6 leading-tight">
                            Grab Your SRC <br />
                            <span className="text-primary-600">T-Shirt</span> — GHS 50
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
                            Get your exclusive conference T-shirt. Designed for comfort, style, and community — wear it proudly at the event and beyond.
                        </p>

                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {[
                                { label: "Colors", value: "Black & White" },
                                { label: "Sizes", value: "S, M, L, XL, XXL" },
                                { label: "Material", value: "Premium Cotton" },
                                { label: "Price", value: "GHS 50.00" }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col gap-1">
                                    <span className="text-xs uppercase font-black text-primary-600 tracking-wider">{item.label}</span>
                                    <span className="text-lg font-bold text-dark-950">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="inline-flex items-center justify-center px-10 py-5 bg-primary-600 text-white font-black text-lg rounded-full shadow-[0_10px_20px_rgba(255,0,0,0.2)] hover:bg-primary-700 hover:shadow-[0_15px_30px_rgba(255,0,0,0.3)] transition-all transform hover:-translate-y-1 active:scale-[0.98]"
                            >
                                Grab Your SRC T-Shirt
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Modal Form */}
            <TShirtRequestForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </section>
    );
};
