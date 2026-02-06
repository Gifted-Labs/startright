import React from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';

export const AboutNewsletterSection: React.FC = () => {
    return (
        <section className="bg-dark-950 text-white overflow-hidden relative">
            {/* Topographic Pattern Overlay (Simulated with gradients for now, or use a background image) */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                <div className="py-24 relative z-10">
                    <span className="text-primary-500 font-bold text-sm uppercase tracking-wider mb-2 block animate-pulse">Stay Connected</span>
                    <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                        Never Miss a <br /> Speaker Announcement
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg">
                        Be the first to know about new speakers, schedule updates, and exclusive opportunities. Join our community and stay ahead.
                    </p>

                    <div className="flex gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-white/10 border border-white/20 text-white px-6 py-4 rounded-full w-full max-w-xs focus:outline-none focus:border-primary-500 transition-colors"
                        />
                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2">
                            Subscribe <HiOutlineArrowRight />
                        </button>
                    </div>
                </div>

                <div className="h-full relative hidden lg:block">
                    {/* Using an image that cuts off or bleeds to the edge */}
                    <img
                        src="/images/about-newsletter.jpg"
                        alt="Discussion"
                        className="absolute bottom-0 right-0 w-full h-[110%] object-cover object-left-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/20 to-transparent" />
                </div>
            </div>
        </section>
    );
};
