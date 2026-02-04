import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SpeakerDetailModal } from '../speakers/SpeakerDetailModal';
import type { Speaker } from '../../types';

interface SpeakerShowcaseProps {
    speakers: Speaker[];
}

export const SpeakerShowcase = ({ speakers }: SpeakerShowcaseProps) => {
    const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!speakers || speakers.length === 0) return null;

    const handleSpeakerClick = (speaker: Speaker) => {
        setSelectedSpeaker(speaker);
        setIsModalOpen(true);
    };

    return (
        <section className="py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 tracking-tight">Featured Speakers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {speakers.map((speaker, index) => (
                    <motion.div
                        key={speaker.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleSpeakerClick(speaker)}
                        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                    >
                        {/* Image Aspect 3:4 */}
                        <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                            {speaker.imageUrl ? (
                                <img
                                    src={speaker.imageUrl}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-300">
                                    <svg className="w-16 h-16 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <span className="text-white text-xs font-bold uppercase tracking-widest mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">View Profile</span>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-50 bg-white relative z-10">
                            <h4 className="font-bold text-lg text-gray-900 truncate" title={speaker.name}>{speaker.name}</h4>
                            <p className="text-primary-600 text-sm font-medium truncate" title={speaker.role}>{speaker.role || speaker.title || 'Speaker'}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <SpeakerDetailModal
                speaker={selectedSpeaker}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};
