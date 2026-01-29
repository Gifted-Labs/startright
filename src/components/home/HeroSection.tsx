import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { CountdownTimer } from '../common/CountdownTimer';

import { useState, useEffect } from 'react';
import { eventService } from '../../services/eventService';
import type { Event } from '../../types';

export const HeroSection: React.FC = () => {
    const [event, setEvent] = useState<Event | null>(null);

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

    // Fallback constants
    const eventDate = event ? `${event.date}T${event.time || '09:00:00'}` : "2026-02-21T09:00:00";
    const displayDate = event ? new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "21 Feb, 2026";
    const location = event?.location || "Lake Buena Vista, Orlando";
    const eventTitle = event?.title || "Start Right Conference 2026";

    return (
        <section className="relative min-h-[110vh] flex flex-col justify-center bg-dark-950 overflow-hidden isolate">
            {/* Background Image / Speaker */}
            <div className="absolute inset-0 z-0">
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent z-10"></div>

                <img
                    src="https://images.unsplash.com/photo-1475721027767-pfa536add3d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Speaker on Stage"
                    className="w-full h-full object-cover object-center"
                />
            </div>

            {/* Content Container */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Side (Space for Speaker background visibility) */}
                <div className="hidden lg:block lg:col-span-5">
                    {/* Visual space for the speaker in background */}
                </div>

                {/* Right/Center Content */}
                {/* Right/Center Content */}
                <div className="lg:col-span-7 flex flex-col items-center lg:items-end text-center lg:text-right">

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
                        className="text-lg text-gray-400 mb-8 max-w-lg leading-relaxed"
                    >
                        {event?.description || "Join the world's most influential student conference. Master leadership, career growth, and global opportunities in the age of AI."}
                    </motion.p>

                    {/* Countdown Timer */}
                    <div className="mb-10 w-full flex justify-center lg:justify-end">
                        <CountdownTimer targetDate={eventDate} />
                    </div>

                    {/* CTA and Date */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col items-center lg:items-end gap-4"
                    >
                        <Link
                            to={event ? `/events/${event.id}/register` : "/events/register"}
                            className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-[0_4px_20px_rgba(255,107,0,0.4)] transition-all hover:scale-105"
                        >
                            Register Now
                        </Link>

                        <div className="text-right mt-2 flex flex-col items-end">
                            <span className="text-primary-500 font-bold text-lg uppercase tracking-wide">{displayDate}</span>
                            <span className="text-white/60 text-sm flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                                {location}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Floating Curve Section */}
            <div className="relative z-30 mt-auto w-full max-w-[95%] lg:max-w-[1300px] mx-auto translate-y-1/2">
                <div className="bg-white rounded-[60px] md:rounded-[80px] shadow-2xl p-4 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 min-h-[200px] relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>

                    {/* Image Circle Group */}
                    <div className="flex -space-x-8 md:-space-x-12 overflow-hidden py-4 px-4 md:px-0">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-20 h-20 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden shadow-lg relative z-10 transition-transform hover:scale-110 hover:z-20">
                                <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80`} className="w-full h-full object-cover" alt="Attendee" />
                            </div >
                        ))}
                    </div >

                    {/* Content */}
                    < div className="flex-1 text-center md:text-left z-10" >
                        <span className="text-primary-500 font-bold uppercase tracking-widest text-sm mb-1 block">Top Conferences</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-dark-900 mb-4">Developer Conference</h2>
                        <button className="bg-primary-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-primary-600 transition-colors">
                            Registration
                        </button>
                    </div >
                </div >
            </div >

            {/* White overlay to smooth transition to next section if needed, or margin */}
            < div className="h-32 bg-transparent" ></div >
        </section >
    );
};
