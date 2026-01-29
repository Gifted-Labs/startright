import React from 'react';
import { motion } from 'framer-motion';

const images = [
    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1525130413817-d45c1ca32729?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    "https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
];

export const GalleryStrip: React.FC = () => {
    return (
        <section className="py-20 bg-dark-900 overflow-hidden">
            <div className="text-center mb-10">
                <span className="text-primary-500 font-semibold tracking-widest uppercase">Our Gallery</span>
                <h2 className="text-3xl text-white font-bold mt-2">Captured Moments</h2>
            </div>

            {/* Scrolling Strip */}
            <div className="flex gap-4 min-w-full overflow-hidden relative">
                <motion.div
                    className="flex gap-4 min-w-full"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...images, ...images, ...images].map((src, index) => (
                        <div key={index} className="flex-shrink-0 w-72 h-48 md:w-96 md:h-64 rounded-xl overflow-hidden relative group">
                            <img
                                src={src}
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 transition-colors"></div>
                        </div>
                    ))}
                </motion.div>

                <motion.div
                    className="flex gap-4 min-w-full absolute left-full top-0"
                    animate={{ x: ["0%", "-100%"] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    {[...images, ...images, ...images].map((src, index) => (
                        <div key={`dup-${index}`} className="flex-shrink-0 w-72 h-48 md:w-96 md:h-64 rounded-xl overflow-hidden relative group">
                            <img
                                src={src}
                                alt={`Gallery ${index}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/20 transition-colors"></div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
