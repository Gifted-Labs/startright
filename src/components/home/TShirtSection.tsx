import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TShirtRequestForm } from './TShirtRequestForm';
import { eventService } from '../../services/eventService';

type ShirtColor = 'Black' | 'White';

export const TShirtSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<ShirtColor>('Black');

    // Session Gating
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [loadingSession, setLoadingSession] = useState(true);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const status = await eventService.getSessionStatus();
                setIsSessionActive(status.active);
            } catch (error) {
                console.error('Failed to check session status:', error);
                setIsSessionActive(true);
            } finally {
                setLoadingSession(false);
            }
        };
        checkSession();
    }, []);

    const shirtImages = {
        Black: '/images/shirt_black_both.png',
        White: '/images/shirt_white_both.png',
    };

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            {/* Subtle Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-transparent to-transparent opacity-60" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Shirt Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 shadow-sm">
                            {/* Preview Area */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedColor}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative aspect-[16/10] flex items-center justify-center"
                                >
                                    <img
                                        src={shirtImages[selectedColor]}
                                        alt={`${selectedColor} Conference T-Shirt - Front and Back View`}
                                        className="w-full h-full object-contain"
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Color Selector */}
                            <div className="mt-8 flex flex-col items-center gap-4">
                                <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                                    Select Color
                                </span>
                                <div className="flex gap-3">
                                    {(['Black', 'White'] as ShirtColor[]).map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`
                                                px-8 py-3 rounded-lg font-semibold text-base uppercase tracking-wide
                                                border-2 transition-all duration-200
                                                ${selectedColor === color
                                                    ? color === 'Black'
                                                        ? 'bg-gray-900 text-white border-gray-900'
                                                        : 'bg-white text-gray-900 border-gray-900'
                                                    : 'bg-gray-100 text-gray-500 border-gray-200 hover:border-gray-400'
                                                }
                                            `}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wider mb-6">
                            Limited Edition
                        </span>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            Get Your Conference <br />
                            <span className="text-primary-600">T-Shirt</span>
                        </h2>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Wear your conference pride with our premium quality shirts. Available in classic Black and crisp White, designed for comfort and style.
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                { label: "Price", value: "GHS 50.00" },
                                { label: "Material", value: "Premium Cotton" },
                                { label: "Colors", value: "Black, White" },
                                { label: "Sizes", value: "S - XXL" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 rounded-lg p-5"
                                >
                                    <span className="text-xs uppercase font-semibold text-primary-600 tracking-wider block mb-1">
                                        {item.label}
                                    </span>
                                    <span className="text-base font-bold text-gray-900">{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            disabled={!isSessionActive || loadingSession}
                            className={`inline-flex items-center gap-3 px-8 py-4 font-semibold text-lg rounded-lg shadow-md transition-all duration-200 ${!isSessionActive || loadingSession
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-primary-600 text-white hover:bg-primary-700'
                                }`}
                        >
                            {!isSessionActive ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                    </svg>
                                    Requests Closed
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Request Shirt
                                </>
                            )}
                        </button>

                        <p className="text-sm text-gray-500 mt-4">
                            Secure request. Payment details will be sent after confirmation.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Request Form Modal */}
            <TShirtRequestForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialColor={selectedColor}
            />
        </section>
    );
};
