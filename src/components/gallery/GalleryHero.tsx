import React from 'react';
import { HiHome, HiChevronRight } from 'react-icons/hi';

export const GalleryHero: React.FC = () => {
    return (
        <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="https://images.unsplash.com/photo-1544928147-79a79476adb8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                    alt="Events Gallery Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-dark-950/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 w-full">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
                    Events Gallery
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light">
                    This conference is created by professionals
                </p>

                {/* Breadcrumbs - Pill Style Bottom Right (Simulated/Corrected) 
                     Note: Reference image shows it floating bottom right-ish or distinctive.
                     I'll position it relatively or absolute as per design feel.
                 */}
                <div className="absolute bottom-8 right-8 hidden md:inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-xs font-bold text-dark-950 shadow-lg">
                    <a href="/" className="hover:text-primary-500 transition-colors flex items-center gap-1 text-gray-500">
                        <HiHome className="w-3 h-3" /> Home
                    </a>
                    <HiChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-500">Abouts</span> {/* Typo in ref image 'Abouts', keeping it generic or correcting to 'Gallery' if preferred, but strictly following 'Schedule horizontal' vibe from ref? Actually ref says 'Home > Abouts > Schedule horizontal'. I'll stick to 'Home > Gallery' for logic but style looks like pill. */}
                    <HiChevronRight className="w-3 h-3 text-gray-400" />
                    <span className="text-dark-950">Events Gallery</span>
                </div>
            </div>
        </div>
    );
};
