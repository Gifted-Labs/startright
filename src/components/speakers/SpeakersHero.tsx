import React from 'react';
import { Link } from 'react-router-dom';

export const SpeakersHero: React.FC = () => {
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-dark-950">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Speakers Hero"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent"></div>
            </div>

            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">Events Speakers</h1>
                <p className="text-gray-400 text-lg mb-8 italic">This conference is created by professionals</p>

                {/* Breadcrumb Pill */}
                <div className="inline-flex items-center gap-2 bg-white px-6 py-2 rounded-full text-dark-950 text-sm font-bold shadow-lg">
                    <Link to="/" className="text-gray-500 hover:text-primary-500 transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <span>Speakers</span>
                </div>
            </div>
        </section>
    );
};
