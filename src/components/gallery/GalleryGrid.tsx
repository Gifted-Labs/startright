import React from 'react';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface GalleryGridProps {
    items: string[];
    loading?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((src, idx) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    key={src + idx}
                    className="relative group aspect-[4/5] rounded-3xl overflow-hidden shadow-lg bg-gray-100"
                >
                    <img
                        src={`${src}?auto=format&fit=crop&w=600&q=80`}
                        alt={`Gallery moment ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-dark-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <HiOutlineArrowsExpand className="w-6 h-6" />
                        </div>
                        <span className="mt-4 text-white font-bold tracking-wider text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            View Image
                        </span>
                    </div>

                    {/* Subtle Gradient Bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </motion.div>
            ))}
        </div>
    );
};
