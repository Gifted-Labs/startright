import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import clsx from 'clsx';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'Speakers', path: '/speakers' },
        { name: 'Contact us', path: '/get-involved' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <div className="fixed top-0 w-full z-50 flex flex-col items-center pointer-events-none transition-all duration-700 ease-out">
            {/* Wrapper to allow pointer events on the header itself */}
            <div className="w-full pointer-events-auto bg-transparent relative flex justify-center">

                {/* Navbar Container with Dynamic Transition */}
                <div className={clsx(
                    "relative transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] overflow-hidden",
                    scrolled
                        ? "bg-white text-dark-900 shadow-xl w-[90%] max-w-4xl rounded-2xl mt-4"
                        : "bg-transparent text-white w-full"
                )}>

                    {/* Top Bar (Collapses on Scroll) */}
                    <div className={clsx(
                        "bg-dark-950 text-white flex justify-between items-center text-[10px] md:text-xs font-medium tracking-wide transition-all duration-700 ease-out origin-top",
                        scrolled ? "h-0 py-0 opacity-0 overflow-hidden" : "py-2 px-6 md:px-10 opacity-100"
                    )}>
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2">
                                <span className="bg-primary-500 rounded-full p-1 inline-flex items-center justify-center">
                                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                </span>
                                Phone: + 124 569 89 09
                            </span>
                            <span className="hidden md:flex items-center gap-2">
                                <span className="bg-primary-500 rounded-full p-1 inline-flex items-center justify-center">
                                    <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </span>
                                Mail: support@email.com
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {['facebook', 'vimeo', 'twitter'].map((social) => (
                                <a key={social} href="#" className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary-500 transition-colors">
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Main Navbar */}
                    <div className={clsx(
                        "flex justify-between items-center relative transition-all duration-500",
                        scrolled ? "py-2 px-6 bg-white" : "px-6 md:px-10 py-4 bg-transparent"
                    )}>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <img
                                src="/images/startright_logo.png"
                                alt="Start Right"
                                className={clsx("w-auto object-contain transition-all duration-300", scrolled ? "h-8" : "h-10 brightness-0 invert")}
                            />
                        </Link>

                        {/* Navigation Links */}
                        <div className="hidden lg:flex items-center gap-1">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={clsx(
                                        "text-sm font-bold capitalize transition-all px-4 py-2 rounded-full flex items-center gap-1",
                                        isActive(link.path)
                                            ? (scrolled ? "bg-dark-900 text-white" : "bg-white text-dark-900")
                                            : (scrolled ? "text-dark-600 hover:bg-gray-100" : "text-white/90 hover:bg-white/10")
                                    )}
                                >
                                    {link.name}
                                    {['Home', 'About', 'Schedule', 'Speakers'].includes(link.name) && (
                                        <svg className={clsx("w-3 h-3", scrolled ? "opacity-50" : "opacity-70")} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            <button className={clsx(
                                "hidden md:flex w-10 h-10 rounded-full items-center justify-center transition-colors",
                                scrolled ? "bg-gray-100 text-dark-900 hover:bg-gray-200" : "bg-white/10 text-white hover:bg-white/20"
                            )}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            </button>
                            <Link
                                to="/events"
                                className={clsx(
                                    "rounded-full font-bold transition-all",
                                    scrolled
                                        ? "bg-primary-500 hover:bg-primary-600 text-white px-5 py-2 text-xs shadow-lg shadow-primary-500/30"
                                        : "bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 text-sm shadow-lg shadow-primary-500/30"
                                )}
                            >
                                Book Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Footer = () => (
    <footer className="bg-secondary-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div>
                    <h3 className="text-xl font-bold mb-4">MerbsConnect</h3>
                    <p className="text-secondary-50/70 leading-relaxed text-sm">
                        Connecting people through premier events. Join us to experience the future of community engagement.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-secondary-50">Quick Links</h4>
                    <ul className="space-y-2 text-sm text-secondary-50/70">
                        <li><Link to="/events" className="hover:text-white transition-colors">Upcoming Events</Link></li>
                        <li><Link to="/events/past" className="hover:text-white transition-colors">Past Events</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4 text-secondary-50">Contact</h4>
                    <p className="text-sm text-secondary-50/70">support@merbsconnect.com</p>
                </div>
            </div>
            <div className="border-t border-secondary-50/10 mt-12 pt-8 text-center text-sm text-secondary-50/50">
                © {new Date().getFullYear()} MerbsConnect. All rights reserved.
            </div>
        </div>
    </footer>
);

export const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-white bg-dark-950">
            <Navigation />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
