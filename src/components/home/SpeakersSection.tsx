import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakerGridCard } from '../speakers/SpeakerGridCard';
import { SpeakerDetailModal } from '../speakers/SpeakerDetailModal';
import { eventService } from '../../services/eventService';
import type { Speaker } from '../../types';
import { HiArrowRight } from 'react-icons/hi';

export const SpeakersSection: React.FC = () => {
    const [speakers, setSpeakers] = useState<Speaker[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSpeakers = async () => {
            try {
                const eventsData = await eventService.getUpcomingEvents(0, 5);
                const mainEvent = eventsData.content && eventsData.content.length > 0 ? eventsData.content[0] : null;

                if (mainEvent) {
                    const speakersData = await eventService.getEventSpeakers(mainEvent.id);
                    // Sort by displayOrder and limit to 10
                    const sortedSpeakers = speakersData
                        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                        .slice(0, 10);
                    setSpeakers(sortedSpeakers);
                }
            } catch (err) {
                console.error("Failed to load speakers for home section:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSpeakers();
    }, []);

    const handleSpeakerClick = (speaker: Speaker) => {
        setSelectedSpeaker(speaker);
        setIsModalOpen(true);
    };

    return (
        <section className="py-32 bg-dark-950 text-white border-t border-white/5 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                    <div className="text-left">
                        <span className="text-primary-500 font-bold text-xs tracking-widest uppercase mb-3 block">Meet Our Visionaries</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Featured Speakers</h2>
                        <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
                            A curated lineup of industry experts, thought leaders, and innovators ready to share their journey.
                        </p>
                    </div>
                    <a href="/speakers" className="group bg-white/5 border border-white/10 px-8 py-4 rounded-sm text-white font-bold text-sm hover:bg-white/10 hover:border-primary-500/50 flex items-center gap-3 transition-all uppercase tracking-widest">
                        View All Speakers <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : speakers.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 bg-dark-900/50 border border-white/5 rounded-sm">
                        No speakers announced yet. Stay tuned!
                    </div>
                ) : (
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-12"
                    >
                        {speakers.map((speaker, index) => (
                            <SpeakerGridCard
                                key={speaker.id || index}
                                name={speaker.name}
                                role={speaker.title || speaker.role || "Speaker"}
                                image={speaker.imageUrl || `https://i.pravatar.cc/500?u=${speaker.id}`}
                                bio={speaker.bio}
                                onClick={() => handleSpeakerClick(speaker)}
                            />
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Speaker Modal */}
            <SpeakerDetailModal
                speaker={selectedSpeaker}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

