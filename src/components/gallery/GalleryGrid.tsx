import React from 'react';
import { HiOutlineArrowsExpand } from 'react-icons/hi';

interface GalleryGridProps {
    items: string[]; // URLs for now
    loading?: boolean;
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({ items }) => {
    // If backend data is empty/loading, use placeholders to match the reference design "vibe" initially
    // Reference Layout:
    // Row 1:
    //  - Col 1 (Wide): Group Toasting
    //  - Col 2 (Square/Vert): Dark Card "Brooklyn Beta..."
    //  - Col 3 (Stack): Two small images

    // We will hardcode the specific layout structure for the "Feature" section, 
    // then render the rest of the dynamic items below in a standard grid.

    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Masonry Featured Section (Hardcoded Stucture to match Reference) */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 h-auto lg:h-[600px] mb-6">

                {/* 1. Large Horizontal/Main Image (Spans 2 cols) */}
                <div className="lg:col-span-2 relative group overflow-hidden rounded-xl h-64 lg:h-full">
                    <img
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                        alt="Toasting Group"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* 2. Dark Text Card (Middle Col) */}
                <div className="bg-dark-950 rounded-xl p-8 flex flex-col justify-center items-center text-center relative group min-h-[300px] lg:h-full">
                    <span className="text-primary-500 text-xs font-bold uppercase tracking-widest mb-4">Conference, Event</span>
                    <h2 className="text-white text-3xl font-bold leading-tight mb-8">
                        Brooklyn Beta was the most important conference
                    </h2>
                    <div className="w-12 h-12 rounded-full border border-primary-500 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all cursor-pointer">
                        <HiOutlineArrowsExpand className="w-6 h-6" />
                    </div>
                </div>

                {/* 3. Right Column (Stacked Images) */}
                <div className="flex flex-col gap-4 md:gap-6 h-64 lg:h-full">
                    <div className="flex-1 relative group overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                            alt="Clapping"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                    <div className="flex-1 relative group overflow-hidden rounded-xl">
                        <img
                            src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                            alt="Smiling Group"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                    </div>
                </div>
            </div>

            {/* Remaining Grid (Standard) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {items && items.length > 0 ? (
                    items.map((item, idx) => (
                        <div key={idx} className="aspect-square relative group overflow-hidden rounded-xl">
                            <img
                                src={item}
                                alt={`Gallery ${idx}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <HiOutlineArrowsExpand className="w-8 h-8 text-white" />
                            </div>
                        </div>
                    ))
                ) : (
                    // Fallback placeholders if no props provided (for demo visual)
                    [1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-square relative group overflow-hidden rounded-xl">
                            <img
                                src={`https://source.unsplash.com/random/400x400?event,conference&sig=${i}`}
                                alt={`Placeholder ${i}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))
                )}
            </div>

        </div>
    );
};
