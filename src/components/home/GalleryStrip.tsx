import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
    { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Conference Hall" },
    { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Networking Session" },
    { src: "https://images.unsplash.com/photo-1525130413817-d45c1ca32729?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Workshop" },
    { src: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Presentation" },
    { src: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Audience" },
    { src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", alt: "Event Lighting" },
];

export const GalleryStrip: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <span className="text-primary-600 font-black uppercase tracking-widest text-sm">Our Gallery</span>
                    <h2 className="text-4xl md:text-5xl font-black text-dark-950 mt-2">Captured Moments</h2>
                </div>

                <div className="relative group max-w-7xl mx-auto">
                    {/* Carousel Container */}
                    <div className="flex gap-6 overflow-hidden">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: `-${currentIndex * (100 / 4)}%` }} // Default 4 images on desktop
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-primary-600 hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-primary-600 hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110 z-10 opacity-0 group-hover:opacity-100"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* View Full Gallery Button */}
                <div className="mt-16 text-center">
                    <Link
                        to="/gallery"
                        className="inline-flex items-center justify-center px-10 py-5 bg-primary-600 text-white font-black text-lg rounded-full shadow-[0_10px_20px_rgba(255,0,0,0.2)] hover:bg-primary-700 hover:shadow-[0_15px_30px_rgba(255,0,0,0.3)] transition-all transform hover:-translate-y-1 active:scale-[0.98]"
                    >
                        View Full Gallery
                        <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};
