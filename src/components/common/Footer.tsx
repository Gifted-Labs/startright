import React from 'react';
import { CachedImage } from './CachedImage';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaPaperPlane, FaEnvelope } from 'react-icons/fa';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-dark-950 text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
            {/* Background elements if needed (e.g. gradients) */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[120px] pointer-events-none"></div>

            {/* Main Content - Full Width Container with Left Padding only for content alignment */}
            <div className="w-full pl-6 md:pl-16 lg:pl-32 pr-0 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-0 mb-0">

                    {/* Column 1: Brand & Info (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col items-start">
                        <Link to="/" className="mb-6 block">
                            <CachedImage
                                src="/images/startright_logo.png"
                                alt="Start Right"
                                className="h-24 w-auto"
                            />
                        </Link>

                        <p className="text-gray-400 mb-6 md:mb-8 leading-relaxed pr-0 md:pr-6 text-sm md:text-base">
                            MerbscConnect is a student-first community that inspires, educates and connects. Start Right Conference brings you clarity, strategy, and the right network to grow.
                            <br />
                            Stay connected to your <span className="text-primary-500">SuccesX</span>.
                        </p>

                        <a href="mailto:merbsconnect@gmail.com" className="text-primary-500 font-semibold mb-6 md:mb-8 hover:underline text-lg transition-colors">
                            merbsconnect@gmail.com
                        </a>

                        <div className="flex gap-3">
                            {[FaFacebookF, FaTwitter, FaInstagram, FaPinterestP].map((Icon, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary-500 hover:text-white transition-all duration-300"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Links & Newsletter (4 cols) */}
                    <div className="lg:col-span-4 mb-12 lg:mb-16 pr-8">
                        <div className="grid grid-cols-2 gap-4 md:gap-8">
                            {/* Quick Links */}
                            <div>
                                <h4 className="text-lg md:text-xl font-bold mb-6">Conference</h4>
                                <ul className="space-y-3">
                                    {[
                                        { label: 'Home', path: '/' },
                                        { label: 'About Us', path: '/about' },
                                        { label: 'Speakers', path: '/speakers' },
                                        { label: 'Schedule', path: '/schedule' },
                                        { label: 'Gallery', path: '/gallery' },
                                        { label: 'Articles', path: '/articles' },
                                        { label: 'Contact', path: '/get-involved' },
                                    ].map((link) => (
                                        <li key={link.label}>
                                            <Link
                                                to={link.path}
                                                className="text-gray-400 hover:text-primary-500 transition-colors text-sm md:text-base block py-1"
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Newsletter Section - Consolidated */}
                            <div className="flex flex-col">
                                <h4 className="text-lg md:text-xl font-bold mb-6">Newsletter</h4>
                                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                    Subscribe to our newsletter & keep up with all the latest events.
                                </p>

                                {/* Address inside Newsletter column */}
                                <div className="flex items-start gap-3 mb-6 text-gray-400 text-sm">
                                    <span className="mt-1 text-primary-500"><FaPaperPlane /></span>
                                    <span>
                                        +233 543131386<br />
                                        Accra, Ghana
                                    </span>
                                </div>

                                {/* Form inside Newsletter column */}
                                <form className="relative w-full">
                                    <input
                                        type="email"
                                        placeholder="Subscribe Email"
                                        className="w-full bg-white text-dark-900 rounded-full py-3 pl-6 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-shadow"
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-1 top-1 bottom-1 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-primary-600 transition-transform hover:scale-105"
                                    >
                                        <FaEnvelope size={14} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Instagram Grid (4 cols) - Edge to Edge */}
                    <div className="md:col-span-2 lg:col-span-4 relative h-full min-h-[300px] lg:min-h-full">
                        {/* Grid - No Gap on right extreme, extends to edge */}
                        <div className="grid grid-cols-3 gap-0 h-full w-full content-start">
                            {[
                                "/images/footer-1.jpg",
                                "/images/footer-2.jpg",
                                "/images/footer-3.jpg",
                                "/images/footer-4.jpg",
                                "/images/footer-5.jpg",
                                "/images/footer-1.jpg" // Repeating the first one to fill the grid
                            ].map((src, i) => (
                                <div key={i} className="aspect-square relative overflow-hidden group">
                                    <CachedImage
                                        src={src}
                                        alt="Gallery"
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                            ))}
                        </div>

                        {/* Floating Instagram Button */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                            <a
                                href="#"
                                className="bg-primary-500 text-white font-bold py-3 px-8 rounded-full shadow-2xl pointer-events-auto hover:bg-primary-600 transition-colors inline-block"
                            >
                                @Instagram
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Adjusted for padding */}
                <div className="border-t border-white/10 py-8 mr-6 md:mr-16 lg:mr-0 flex flex-col md:flex-row justify-start lg:justify-start items-center gap-4 pr-12">
                    {/* Because the container has left padding, this bar starts aligned with content. */}
                    <p className="text-gray-500 text-sm">
                        Copyright © Start Right {new Date().getFullYear()}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
