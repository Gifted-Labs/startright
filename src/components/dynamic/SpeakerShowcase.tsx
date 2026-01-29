import type { Speaker } from '../../types';
import { HiUser } from 'react-icons/hi';
import { motion } from 'framer-motion';

interface SpeakerShowcaseProps {
    speakers: Speaker[];
}

export const SpeakerShowcase = ({ speakers }: SpeakerShowcaseProps) => {
    if (!speakers || speakers.length === 0) return null;

    return (
        <section className="py-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Speakers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {speakers.map((speaker, index) => (
                    <motion.div
                        key={speaker.id || index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                        {/* Image Aspect 3:4 */}
                        <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                            {speaker.imageUrl ? (
                                <img
                                    src={speaker.imageUrl}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                    <HiUser className="w-20 h-20" />
                                </div>
                            )}

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-white text-sm line-clamp-4">
                                    {speaker.bio || "No biography available."}
                                </p>
                            </div>
                        </div>

                        <div className="p-4 border-t border-gray-50 bg-white relative z-10">
                            <h4 className="font-bold text-lg text-gray-900 truncate" title={speaker.name}>{speaker.name}</h4>
                            <p className="text-primary-600 text-sm font-medium truncate" title={speaker.role}>{speaker.role || 'Speaker'}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
