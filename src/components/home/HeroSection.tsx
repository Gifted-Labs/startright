import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

import { CountdownTimer } from '../common/CountdownTimer';

import { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import type { Event } from '../../types';

const heroImages = [
    "/images/hero/hero-1.jpg",
    "/images/hero/hero-2.jpg",
    "/images/hero/hero-3.jpg",
    "/images/hero/hero-4.jpg"
];

export const HeroSection: React.FC = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    return (
        <section className="relative h-screen w-full flex flex-col justify-center items-center bg-dark-950 overflow-hidden isolate">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-dark-950/70 z-10"></div>

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

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Script Sub-headline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-script text-primary-500 text-3xl md:text-5xl mb-4 rotate-[-5deg]"
                >
                    Upcoming Event
                </motion.p>

                {/* Main Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-lg"
                >
                    {eventTitle}
                </motion.h1>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed mx-auto"
                >
                    {event?.description || "Join the world's most influential student conference. Master leadership, career growth, and global opportunities in the age of AI."}
                </motion.p>

                {/* Countdown Timer */}
                <div className="mb-10 w-full flex justify-center">
                    <CountdownTimer targetDate={eventDate} />
                </div>

                {/* CTA and Date */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-6"
                >
                    <Link
                        to={event ? `/events/${event.id}/register` : "/events/register"}
                        className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_4px_20px_rgba(255,0,0,0.4)] transition-all hover:scale-105"
                    >
                        Register Now
                    </Link>

                    <div className="flex flex-col items-center mt-2">
                        <span className="text-primary-500 font-bold text-lg uppercase tracking-wide">{displayDate}</span>
                        <span className="text-white/80 text-sm flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                            {location}
                        </span>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};
