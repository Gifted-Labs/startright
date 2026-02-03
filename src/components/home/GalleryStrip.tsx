import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Conference Hall" },
    { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Networking Session" },
    { src: "https://images.unsplash.com/photo-1525130413817-d45c1ca32729?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Workshop" },
    { src: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Presentation" },
    { src: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Audience" },
    { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Event Lighting" },
];

const SPRING_OPTIONS = {
    type: "spring",
    stiffness: 80, // Slower spring for 1.5s feel
    damping: 20,
};

export const GalleryStrip: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragX = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-play logic with speed refinement
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging) {
                nextSlide();
            }
        }, 3000); // 3 seconds interval
        return () => clearInterval(interval);
    }, [isDragging]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = () => {
        setIsDragging(false);
        const x = dragX.get();
        if (x <= -50) {
            nextSlide();
        } else if (x >= 50) {
            prevSlide();
        }
    };

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-primary-600 font-black uppercase tracking-widest text-sm"
                    >
                        Our Gallery
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-dark-950 mt-2 tracking-tight uppercase"
                    >
                        Captured Moments
                    </motion.h2>
                </div>

                <div className="relative group mx-auto">
                    {/* Main Gallery Area with Center Focus */}
                    <div className="relative overflow-visible cursor-grab active:cursor-grabbing">
                        <motion.div
                            ref={containerRef}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            style={{ x: dragX }}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            animate={{
                                x: `calc(50% - ${(currentIndex * 80) + 40}%)` // Centering logic for 80% width items
                            }}
                            transition={{
                                type: "spring",
                                duration: 1.5,
                                bounce: 0.1
                            }}
                            className="flex items-center"
                        >
                            {images.map((img, index) => {
                                const isActive = index === currentIndex;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={false}
                                        animate={{
                                            scale: isActive ? 1 : 0.65, // Pronounced reduction
                                            opacity: isActive ? 1 : 0.3,
                                            zIndex: isActive ? 10 : 1,
                                        }}
                                        transition={{ duration: 1.5, ease: [0.32, 0.23, 0.4, 0.9] }}
                                        className="flex-shrink-0 w-[80%] aspect-video rounded-[3rem] overflow-hidden shadow-2xl relative bg-gray-100"
                                    >
                                        <img
                                            src={img.src}
                                            alt={img.alt}
                                            className="w-full h-full object-cover select-none pointer-events-none"
                                        />
                                        <AnimatePresence mode="wait">
                                            {isActive && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12 pb-10"
                                                >
                                                    <p className="text-white text-xl md:text-2xl font-black tracking-tight uppercase">{img.alt}</p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Aesthetic Navigation Arrows */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none items-center px-4 md:px-12 z-20">
                        <button
                            onClick={prevSlide}
                            className="pointer-events-auto p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl text-dark-950 hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110 md:-translate-x-12 opacity-0 group-hover:opacity-100 hidden md:flex"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={nextSlide}
                            className="pointer-events-auto p-5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl text-dark-950 hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110 md:translate-x-12 opacity-0 group-hover:opacity-100 hidden md:flex"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Fancy Pagination Dots */}
                    <div className="flex justify-center gap-3 mt-12">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 transition-all duration-500 rounded-full ${currentIndex === index
                                    ? "bg-primary-600 w-12"
                                    : "bg-gray-200 w-2 hover:bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* View Full Gallery CTA */}
                <div className="mt-20 text-center">
                    <Link
                        to="/gallery"
                        className="group inline-flex items-center gap-2 px-12 py-5 bg-dark-950 text-white font-black text-xl rounded-full shadow-2xl hover:bg-primary-600 transition-all transform hover:-translate-y-1 active:scale-95"
                    >
                        Explore Full Gallery
                        <motion.span
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.span>
                    </Link>
                </div>
            </div>
        </section>
    );
};
