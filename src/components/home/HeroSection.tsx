import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCalendar, HiQrcode } from 'react-icons/hi';
import { CountdownTimer } from '../common/CountdownTimer';
import { generateICSFile, generateGoogleCalendarLink, generateRegistrationQRCode } from '../../utils/calendar';
import { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import type { Event } from '../../types';

const heroImages = [
    "/images/hero-group-photo.jpg",
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
    "/images/hero/hero-4.jpg"
];

export const HeroSection: React.FC = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [calendarError, setCalendarError] = useState<string | null>(null);
    const [showQRModal, setShowQRModal] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await eventService.getUpcomingEvents(0, 1);
                if (response.content && response.content.length > 0) {
                    setEvent(response.content[0]);
                }
            } catch (error) {
                console.error("Failed to fetch upcoming event", error);
            }
        };
        fetchEvent();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    // Fallback constants
    const eventDate = event ? `${event.date}T${event.time || '09:00:00'}` : "2026-02-21T09:00:00";
    const displayDate = event ? new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "21 Feb, 2026";
    const location = event?.location || "Lake Buena Vista, Orlando";
    const eventTitle = event?.title || "Start Right Conference 2026";

    const handleAddToCalendar = () => {
        if (!event) return;

        try {
            generateICSFile(event);
            setCalendarError(null);
        } catch (error) {
            // Fallback to Google Calendar
            const googleLink = generateGoogleCalendarLink(event);
            window.open(googleLink, '_blank');
            setCalendarError("Unable to add to calendar. Opened Google Calendar instead.");
            setTimeout(() => setCalendarError(null), 5000);
        }
    };

    const qrCodeUrl = event ? generateRegistrationQRCode(event.id) : null;

    return (
        <section className="relative min-h-screen w-full flex flex-col justify-center items-center bg-dark-950 overflow-hidden isolate pt-24 md:pt-32">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-dark-950/75 z-10"></div>

                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentImageIndex}
                        src={heroImages[currentImageIndex]}
                        alt="Conference Highlights"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.7 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </AnimatePresence>
            </div>

            {/* QR Code - Top Right Corner */}
            {qrCodeUrl && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="absolute top-28 right-6 z-30 hidden md:block"
                >
                    <div className="bg-white p-3 rounded-lg shadow-xl">
                        <img src={qrCodeUrl} alt="Scan to Register" className="w-24 h-24" />
                        <p className="text-xs text-center text-gray-700 font-medium mt-2">Scan to Register</p>
                    </div>
                </motion.div>
            )}

            {/* Mobile QR Code Button */}
            {qrCodeUrl && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={() => setShowQRModal(true)}
                    className="md:hidden absolute top-28 right-6 z-30 bg-white p-3 rounded-lg shadow-xl"
                    aria-label="Show QR Code"
                >
                    <HiQrcode className="w-6 h-6 text-primary-500" />
                </motion.button>
            )}

            {/* Content Container - Narrower for compactness */}
            <div className="relative z-20 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Script Sub-headline - Smaller and less intrusive */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-script text-primary-500 text-2xl md:text-3xl mb-4"
                >
                    Upcoming Event
                </motion.p>

                {/* Main Headline - More compact size */}
                <motion.h1
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight"
                >
                    {eventTitle}
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base md:text-lg text-gray-300 mb-8 max-w-xl leading-relaxed mx-auto"
                >
                    {event?.description || "Join the world's most influential student conference. Master leadership, career growth, and global opportunities in the age of AI."}
                </motion.p>

                {/* Countdown Timer */}
                <div className="mb-8 w-full flex justify-center scale-90 md:scale-100">
                    <CountdownTimer targetDate={eventDate} />
                </div>

                {/* CTA Buttons and Date */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-6 w-full"
                >
                    {/* Buttons Row */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                        <Link
                            to={event ? `/events/${event.id}/register` : "/events/register"}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-sm font-bold text-base uppercase tracking-wider shadow-lg shadow-primary-500/20 transition-all hover:scale-105 w-full sm:w-auto text-center"
                        >
                            Register Now
                        </Link>

                        <button
                            onClick={handleAddToCalendar}
                            disabled={!event}
                            className="bg-white hover:bg-gray-100 text-dark-900 px-8 py-3.5 rounded-sm font-bold text-base uppercase tracking-wider shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto flex items-center justify-center gap-2"
                        >
                            <HiCalendar className="w-5 h-5" />
                            Add to Calendar
                        </button>
                    </div>

                    {/* Error Toast */}
                    {calendarError && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="bg-yellow-500/90 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            {calendarError}
                        </motion.div>
                    )}

                    <div className="flex flex-col items-center mt-2">
                        <span className="text-primary-500 font-bold text-base uppercase tracking-widest">{displayDate}</span>
                        <span className="text-white/70 text-xs md:text-sm flex items-center gap-2 mt-1">
                            <svg className="w-4 h-4 text-primary-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            {location}
                        </span>
                    </div>
                </motion.div>
            </div>

            {/* QR Code Modal (Mobile) */}
            {showQRModal && qrCodeUrl && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowQRModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="bg-white p-6 rounded-xl shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        <img src={qrCodeUrl} alt="Scan to Register" className="w-64 h-64 mx-auto" />
                        <p className="text-center text-gray-700 font-medium mt-4">Scan to Register</p>
                        <button
                            onClick={() => setShowQRModal(false)}
                            className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg font-medium transition-colors"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </section>
    );
};
