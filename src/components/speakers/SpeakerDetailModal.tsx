import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import type { Speaker } from '../../types';

interface SpeakerDetailModalProps {
    speaker: Speaker | null;
    isOpen: boolean;
    onClose: () => void;
}

export const SpeakerDetailModal: React.FC<SpeakerDetailModalProps> = ({ speaker, isOpen, onClose }) => {
    if (!speaker) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 bg-dark-950/50 hover:bg-dark-950 text-white p-2 rounded-full transition-colors"
                        >
                            <HiX className="w-6 h-6" />
                        </button>

                        {/* Left Side: Image */}
                        <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-auto relative overflow-hidden">
                            <img
                                src={speaker.imageUrl || `https://i.pravatar.cc/500?u=${speaker.id}`}
                                alt={speaker.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60"></div>
                        </div>

                        {/* Right Side: Details */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-none">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="text-primary-500 font-bold text-xs tracking-widest uppercase mb-2 block">
                                    Featured Speaker
                                </span>
                                <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-2">
                                    {speaker.name}
                                </h3>
                                <p className="text-gray-300 font-medium text-lg mb-8 tracking-wider uppercase border-l-2 border-primary-500 pl-4">
                                    {speaker.title || speaker.role || "Speaker"}
                                </p>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-3 opacity-50">Biography</h4>
                                        <p className="text-gray-400 leading-relaxed text-lg italic">
                                            {speaker.bio || "No biography provided for this speaker."}
                                        </p>
                                    </div>

                                    {/* Social Links & CTA */}
                                    <div className="pt-8 flex flex-wrap gap-4">
                                        {speaker.linkedinUrl && (
                                            <a
                                                href={speaker.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-[#0077b5] hover:bg-[#006097] text-white px-6 py-3 rounded-sm font-bold text-sm flex items-center gap-2 transition-all uppercase tracking-widest"
                                            >
                                                <FaLinkedin className="w-5 h-5" />
                                                LinkedIn Profile
                                            </a>
                                        )}
                                        {speaker.twitterUrl && (
                                            <a
                                                href={speaker.twitterUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-3 rounded-sm font-bold text-sm flex items-center gap-2 transition-all uppercase tracking-widest"
                                            >
                                                <FaTwitter className="w-5 h-5" />
                                                Twitter
                                            </a>
                                        )}
                                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-sm font-bold text-sm flex items-center gap-2 transition-all uppercase tracking-widest">
                                            Follow Speaker
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
