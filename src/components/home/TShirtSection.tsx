import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TShirtRequestForm } from './TShirtRequestForm';

type ShirtColor = 'Black' | 'White';

export const TShirtSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<ShirtColor>('Black');

    const shirtImages = {
        Black: '/images/shirt_black_both.png',
        White: '/images/shirt_white_both.png',
    };

    return (
        <section className="relative py-24 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Visual Display (Left) - Interactive Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="relative">
                            {/* Decorative Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 via-transparent to-primary-200/30 rounded-3xl blur-3xl opacity-60" />

                            {/* Shirt Preview Container */}
                            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={selectedColor}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative aspect-[16/10] flex items-center justify-center"
                                    >
                                        <img
                                            src={shirtImages[selectedColor]}
                                            alt={`${selectedColor} Conference T-Shirt - Front & Back View`}
                                            className="w-full h-full object-contain drop-shadow-2xl"
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Color Selector */}
                                <div className="mt-8 flex flex-col items-center gap-4">
                                    <span className="text-sm font-black uppercase tracking-wider text-gray-600">
                                        Choose Your Color
                                    </span>
                                    <div className="flex gap-4">
                                        {(['Black', 'White'] as ShirtColor[]).map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`
                                                    group relative px-8 py-4 rounded-full font-black text-lg uppercase tracking-wide
                                                    transition-all duration-300 transform hover:scale-105
                                                    ${selectedColor === color
                                                        ? color === 'Black'
                                                            ? 'bg-dark-950 text-white shadow-xl shadow-dark-950/30'
                                                            : 'bg-white text-dark-950 shadow-xl border-2 border-gray-200'
                                                        : color === 'Black'
                                                            ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                                    }
                                                `}
                                            >
                                                {color}
                                                {selectedColor === color && (
                                                    <motion.div
                                                        layoutId="colorIndicator"
                                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary-600 rounded-full"
                                                        initial={false}
                                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                    />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Front & Back Label */}
                                    <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span className="font-semibold">Viewing Front & Back</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-black uppercase tracking-wider">Limited Edition</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-950 mb-6 leading-tight">
                            Get Your SRC <br />
                            <span className="text-primary-600">Conference Shirt</span>
                        </h2>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            Wear your conference pride! High-quality, comfortable shirts designed for the StartRight community. Available in classic Black and crisp White.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            {[
                                { label: "Price", value: "GHS 50.00", icon: "💰" },
                                { label: "Material", value: "Premium Cotton", icon: "✨" },
                                { label: "Colors", value: "Black & White", icon: "🎨" },
                                { label: "Sizes", value: "S - XXL", icon: "📏" },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-shadow"
                                >
                                    <span className="text-2xl mb-2 block">{item.icon}</span>
                                    <span className="text-xs uppercase font-black text-primary-600 tracking-wider block mb-1">
                                        {item.label}
                                    </span>
                                    <span className="text-lg font-bold text-dark-950">{item.value}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="group inline-flex items-center gap-3 px-10 py-6 bg-primary-600 text-white font-black text-xl rounded-full shadow-[0_10px_30px_rgba(220,38,38,0.3)] hover:bg-primary-700 hover:shadow-[0_15px_40px_rgba(220,38,38,0.4)] transition-all transform hover:-translate-y-1 active:scale-[0.98]"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Order Your Shirt Now
                            <motion.svg
                                className="w-5 h-5"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </motion.svg>
                        </button>

                        <p className="text-sm text-gray-500 mt-4 flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Secure payment • Fast delivery • 100% satisfaction guaranteed
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Enhanced Modal Form */}
            <TShirtRequestForm
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialColor={selectedColor}
            />
        </section>
    );
};
