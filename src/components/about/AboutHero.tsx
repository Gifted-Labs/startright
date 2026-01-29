import React from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';

export const AboutHero: React.FC = () => {
    return (
        <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    alt="About Us Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark-950/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
                    About Us
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light">
                    Get to know the team behind Start Right.
                </p>

                {/* Breadcrumbs */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-medium text-white border border-white/20">
                    <a href="/" className="hover:text-primary-500 transition-colors flex items-center gap-1">
                        <HiHome className="w-4 h-4" /> Home
                    </a>
                    <HiChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-primary-500">About Us</span>
                </div>
            </div>
        </div>
    );
};
