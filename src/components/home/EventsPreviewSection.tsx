import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { eventService } from '../../services/eventService';
import { EventCard } from '../dynamic/EventCard';
import { Button } from '../common/Button';
import type { Event } from '../../types';

export const EventsPreviewSection = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                // Fetch upcoming events, limit to 3
                const data = await eventService.getUpcomingEvents(0, 3);
                if (data && data.content) {
                    setEvents(data.content);
                }
            } catch (error) {
                console.error("Failed to fetch events preview", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) return null; // Or a skeleton if preferred, but null prevents layout shift if fast
    if (events.length === 0) return null;

    return (
        <section className="py-28 bg-dark-950 relative">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-dark-900/50 via-transparent to-transparent"></div>

            {/* Top accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary-500"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-primary-500 font-bold tracking-widest uppercase text-sm mb-2 block"
                        >
                            Don't Miss Out
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight"
                        >
                            Upcoming Events
                        </motion.h2>
                    </div>
                    <Link to="/events">
                        <Button variant="outline" className="hidden md:flex border-white/20 text-white hover:bg-white/10">View All Events</Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <EventCard event={event} />
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/events">
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">View All Events</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
