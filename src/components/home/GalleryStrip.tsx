import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const images = [
    {
        src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Conference Hall",
        className: "md:col-span-2 md:row-span-2" // Large Featured
    },
    {
        src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Networking Session",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        src: "https://images.unsplash.com/photo-1525130413817-d45c1ca32729?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Workshop",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        src: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Presentation",
        className: "md:col-span-1 md:row-span-2" // Tall
    },
    {
        src: "https://images.unsplash.com/photo-1540575861501-7ad0582371f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Audience",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        alt: "Event Lighting",
        className: "md:col-span-2 md:row-span-1" // Wide
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
        }
    }
};

export const GalleryStrip: React.FC = () => {
    return (
        <section className="py-24 bg-white relative">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-30" />

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
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 mt-4 max-w-2xl mx-auto font-medium"
                    >
                        Explore the highlights and unforgettable experiences from our past conferences.
                    </motion.p>
                </div>

                {/* Industry Standard Bento Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 lg:gap-6 h-auto md:h-[800px]"
                >
                    {images.map((img, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className={`group relative rounded-[2rem] overflow-hidden bg-gray-100 shadow-xl ${img.className}`}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                    className="text-white font-black text-lg md:text-xl tracking-tight uppercase"
                                >
                                    {img.alt}
                                </motion.p>
                                <div className="w-12 h-1 bg-primary-600 mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* View Full Gallery CTA */}
                <div className="mt-20 text-center">
                    <Link
                        to="/gallery"
                        className="group inline-flex items-center gap-3 px-12 py-5 bg-dark-950 text-white font-black text-xl rounded-full shadow-2xl hover:bg-primary-600 transition-all transform hover:-translate-y-1 active:scale-95"
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
