import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Footer } from '../common/Footer';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi';
import clsx from 'clsx';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    // Consolidated navigation links (reduced from 7 to 5)
    const links = [
        { name: 'Home', path: '/' },
        { name: 'Events', path: '/events' },
        { name: 'Schedule', path: '/schedule' },
        { name: 'About', path: '/about' },
        { name: 'Articles', path: '/articles' },
        { name: 'Contact', path: '/get-involved' },
    ];

    const isActive = (path: string) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname === path || location.pathname.startsWith(path + '/');
    };

    return (
        <>
            <header
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
                    scrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm"
                        : "bg-transparent"
                )}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <nav className={clsx(
                        "flex items-center justify-between transition-all duration-300",
                        scrolled ? "h-16" : "h-20"
                    )}>
                        {/* Logo */}
                        <Link to="/" className="flex-shrink-0">
                            <img
                                src="/images/startright_logo.png"
                                alt="Start Right"
                                className={clsx(
                                    "w-auto object-contain transition-all duration-300",
                                    scrolled ? "h-10" : "h-14"
                                )}
                            />
                        </Link>

                        {/* Desktop Navigation - Centered */}
                        <div className="hidden lg:flex items-center gap-8">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={clsx(
                                        "relative text-sm font-medium tracking-wide transition-colors duration-200 py-1",
                                        isActive(link.path)
                                            ? scrolled
                                                ? "text-primary-600"
                                                : "text-white"
                                            : scrolled
                                                ? "text-gray-600 hover:text-gray-900"
                                                : "text-white/80 hover:text-white"
                                    )}
                                >
                                    {link.name}
                                    {/* Underline indicator for active state */}
                                    {isActive(link.path) && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {/* Right: CTA + Mobile Menu Toggle */}
                        <div className="flex items-center gap-4">
                            {/* CTA Button */}
                            <Link
                                to="/events"
                                className={clsx(
                                    "hidden sm:inline-flex items-center justify-center font-semibold text-sm transition-all duration-200 rounded-sm",
                                    scrolled
                                        ? "bg-primary-500 hover:bg-primary-600 text-white px-5 py-2"
                                        : "bg-white text-dark-900 hover:bg-gray-100 px-5 py-2.5"
                                )}
                            >
                                Register
                            </Link>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={clsx(
                                    "lg:hidden w-10 h-10 flex items-center justify-center rounded-sm transition-colors",
                                    scrolled
                                        ? "text-gray-700 hover:bg-gray-100"
                                        : "text-white hover:bg-white/10"
                                )}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <HiX className="w-6 h-6" />
                                ) : (
                                    <HiOutlineMenuAlt3 className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={clsx(
                    "fixed inset-0 z-40 lg:hidden transition-all duration-300",
                    mobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />

                {/* Menu Panel */}
                <div
                    className={clsx(
                        "absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-300",
                        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    )}
                >
                    <div className="p-6 pt-20">
                        <nav className="flex flex-col gap-2">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={clsx(
                                        "py-3 px-4 rounded-sm text-base font-medium transition-colors",
                                        isActive(link.path)
                                            ? "bg-primary-50 text-primary-600 border-l-4 border-primary-500"
                                            : "text-gray-700 hover:bg-gray-50"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <Link
                                to="/events"
                                className="block w-full py-3 px-4 bg-primary-500 hover:bg-primary-600 text-white text-center font-semibold rounded-sm transition-colors"
                            >
                                Register Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

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

