import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakerGridCard } from '../speakers/SpeakerGridCard';
import { eventService } from '../../services/eventService';
import type { Speaker } from '../../types';
import { HiArrowRight } from 'react-icons/hi';

export const SpeakersSection: React.FC = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const eventsData = await eventService.getUpcomingEvents(0, 5);
                const mainEvent = eventsData.content && eventsData.content.length > 0 ? eventsData.content[0] : null;

                if (mainEvent) {
                    const speakersData = await eventService.getEventSpeakers(mainEvent.id);
                    // Limit to 3 speakers for the home section as per 3-column grid rule
                    setSpeakers(speakersData.slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to load speakers for home section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    return (
        <section className="py-32 bg-dark-950 text-white border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="text-left">
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Featured Speakers</h2>
                        <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                            Learn from industry leaders shaping the future of technology, leadership, and innovation.
                        </p>
                    </div>
                    <a href="/speakers" className="group text-primary-500 font-bold text-lg hover:text-primary-400 flex items-center gap-2 transition-all">
                        View All Speakers <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : speakers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No speakers announced yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                        {speakers.map((speaker, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <SpeakerGridCard
                                    name={speaker.name}
                                    role={speaker.title || speaker.role || "Speaker"}
                                    image={speaker.imageUrl || `https://i.pravatar.cc/500?u=${speaker.id}`}
                                    bio={speaker.bio}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

