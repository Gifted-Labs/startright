import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

export const ContactCTA: React.FC = () => {
    return (
        <section className="relative py-24 bg-gradient-to-r from-primary-600 to-primary-500 overflow-hidden">
            {/* Background Image / Texture */}
            <div className="absolute inset-0 mix-blend-multiply opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    className="w-full h-full object-cover grayscale"
                    alt="Office"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <div>
                        <span className="text-white/80 font-bold uppercase tracking-wider text-sm mb-2 block">
                            Join the Movement
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            Ready to Start Right? <br />
                            Get Involved Today.
                        </h2>
                    </div>

                    <div className="flex gap-4">
                        <Link to="/get-involved" className="bg-white text-dark-950 px-8 py-4 rounded-full font-bold shadow-2xl hover:bg-gray-100 transition-transform hover:scale-105 flex items-center gap-2">
                            Get Involved
                            <HiOutlineArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
