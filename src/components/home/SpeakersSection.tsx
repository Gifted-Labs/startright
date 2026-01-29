import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakerGridCard } from '../speakers/SpeakerGridCard';
import { eventService } from '../../services/eventService';
import type { Speaker } from '../../types';

export const SpeakersSection: React.FC = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                // 1. Get upcoming events to find the main/active event
                const eventsData = await eventService.getUpcomingEvents(0, 5);
                const mainEvent = eventsData.content && eventsData.content.length > 0 ? eventsData.content[0] : null;

                if (mainEvent) {
                    // 2. Fetch speakers for this event
                    const speakersData = await eventService.getEventSpeakers(mainEvent.id);
                    // Limit to 4 speakers for the home section
                    setSpeakers(speakersData.slice(0, 4));
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
        <section className="py-24 bg-dark-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured Speakers</h2>
                        <p className="text-gray-400 text-lg max-w-xl">
                            Learn from the best minds in the industry who are shaping the future.
                        </p>
                    </div>
                    <a href="/speakers" className="text-primary-500 font-semibold hover:text-primary-400 flex items-center gap-2">
                        View All Speakers &rarr;
                    </a>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : speakers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">No speakers announced yet.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {speakers.map((speaker, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
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

