import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '../common/Button';
import { CountdownTimer } from '../common/CountdownTimer';
import { eventService } from '../../services/eventService';
import type { Event } from '../../types';
import { format } from 'date-fns';
import clsx from 'clsx';

export const ActiveEventHero = () => {
    const [featuredEvent, setFeaturedEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const data = await eventService.getUpcomingEvents(0, 1);
                if (data.content.length > 0) {
                    setFeaturedEvent(data.content[0]);
                }
            } catch (error) {
                console.error("Failed to fetch featured event", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const bgImages = [
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2070",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=2012"
    ];

    if (loading) {
        return (
            <div className="h-screen bg-secondary-950 flex items-center justify-center">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-secondary-950">
            {/* Background Image */}
            <AnimatePresence mode='wait'>
                <motion.div
                    key="bg-1"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 0.6, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${featuredEvent?.imageUrl || bgImages[0]})` }}
                />
            </AnimatePresence>

            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-950 via-secondary-950/40 to-transparent" />

            {/* Decorative Grid/Lines */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 md:px-6 h-full flex flex-col justify-center relative z-10 pt-32 pb-20 min-h-screen">
                {featuredEvent ? (
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        className="max-w-5xl"
                    >
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-primary-500/10 text-primary-400 text-xs font-black mb-8 border border-primary-500/20 backdrop-blur-md uppercase tracking-[0.2em]"
                        >
                            <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                            Next Major Event
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black text-white mb-8 leading-[0.9] tracking-tighter uppercase">
                            {featuredEvent.title.split(' ').map((word, i) => (
                                <span key={i} className={clsx("block", i % 2 !== 0 && "text-primary-500")}>
                                    {word}
                                </span>
                            ))}
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed font-medium">
                            {featuredEvent.description.substring(0, 180)}...
                        </p>

                        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12">
                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                                <Link to={`/events/${featuredEvent.id}/register`}>
                                    <Button size="lg" className="h-16 px-10 rounded-full font-black text-lg bg-primary-600 hover:bg-primary-500 shadow-2xl shadow-primary-500/40 transition-all hover:scale-105 active:scale-95">
                                        BOOK EXPERIENCE
                                    </Button>
                                </Link>
                                <Link to={`/events/${featuredEvent.id}`}>
                                    <Button variant="outline" size="lg" className="h-16 px-10 rounded-full font-black text-lg text-white border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all">
                                        EXPLORE
                                    </Button>
                                </Link>
                            </div>

                            {/* Event Meta Glassmorphism */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex flex-col bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 min-w-[160px]">
                                    <span className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-1">When</span>
                                    <span className="text-white font-bold">{format(new Date(featuredEvent.date + 'T00:00:00'), 'MMM dd, yyyy')}</span>
                                </div>
                                <div className="flex flex-col bg-white/5 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white/10 min-w-[160px]">
                                    <span className="text-[10px] uppercase tracking-widest text-primary-500 font-black mb-1">Where</span>
                                    <span className="text-white font-bold truncate max-w-[200px]">{featuredEvent.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Countdown Timer Hooked Below */}
                        <div className="mt-16 border-t border-white/10 pt-12">
                            <CountdownTimer targetDate={featuredEvent.date} />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-left"
                    >
                        <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter uppercase mb-12">
                            CONNECTING <span className="text-primary-500">PEOPLE</span><br />
                            THROUGH <span className="text-white/20">EVENTS</span>
                        </h1>
                        <Link to="/events">
                            <Button size="lg" className="h-16 px-12 rounded-full font-black bg-primary-600 text-white">
                                DISCOVER MORE
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Bottom Fade */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
    );
};
