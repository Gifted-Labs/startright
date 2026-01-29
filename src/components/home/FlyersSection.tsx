import React from 'react';
import { motion } from 'framer-motion';

const flyers = [
    { src: "/images/flyer_1.jpg", alt: "Start Right Conference Flyer 1" },
    { src: "/images/flyer_2.jpg", alt: "Start Right Conference Flyer 2" },
    { src: "/images/flyer_3.jpg", alt: "Start Right Conference Flyer 3" },
];

export const FlyersSection: React.FC = () => {
    return (
        <section className="py-20 bg-dark-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-500 font-semibold tracking-widest uppercase"
                    >
                        Event Details
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl text-white font-bold mt-2"
                    >
                        Official Flyers
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {flyers.map((flyer, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-primary-500/20 transition-all duration-300"
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={flyer.src}
                                    alt={flyer.alt}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <span className="text-white font-medium px-4 py-2 bg-primary-500/80 backdrop-blur-sm rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    View Full Size
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
