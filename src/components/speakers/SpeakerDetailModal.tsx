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

    // Deterministic theme selection based on speaker name
    // ALL WHITE AND LIGHT-GRAY BACKGROUNDS REMOVED PER USER REQUEST
    const themes = [
        {
            bg: 'bg-[#D4FF00]', // Lemon
            text: 'text-black',
            sub: 'text-red-600',
            muted: 'text-black/40',
            bioText: 'text-black/80',
            quoteBorder: 'border-black',
            sessionBg: 'bg-black/10',
            cta: 'bg-black text-white',
            secondaryBg: 'bg-dark-900',
            accentColor: 'text-red-600'
        },
        {
            bg: 'bg-[#FF3B30]', // Red
            text: 'text-white',
            sub: 'text-yellow-300',
            muted: 'text-white/60',
            bioText: 'text-white/90',
            quoteBorder: 'border-white',
            sessionBg: 'bg-black/20',
            cta: 'bg-white text-black',
            secondaryBg: 'bg-dark-950',
            accentColor: 'text-yellow-300'
        },
        {
            bg: 'bg-[#001D3D]', // Navy
            text: 'text-white',
            sub: 'text-[#D4FF00]',
            muted: 'text-white/40',
            bioText: 'text-white/80',
            quoteBorder: 'border-[#D4FF00]',
            sessionBg: 'bg-white/5',
            cta: 'bg-[#D4FF00] text-black',
            secondaryBg: 'bg-dark-900',
            accentColor: 'text-[#D4FF00]'
        },
        {
            bg: 'bg-[#7000FF]', // Purple
            text: 'text-white',
            sub: 'text-yellow-300',
            muted: 'text-white/60',
            bioText: 'text-white/90',
            quoteBorder: 'border-yellow-300',
            sessionBg: 'bg-black/20',
            cta: 'bg-white text-black',
            secondaryBg: 'bg-dark-950',
            accentColor: 'text-yellow-300'
        },
        {
            bg: 'bg-[#00D1FF]', // Cyan
            text: 'text-black',
            sub: 'text-blue-900',
            muted: 'text-black/50',
            bioText: 'text-black/80',
            quoteBorder: 'border-blue-900',
            sessionBg: 'bg-black/10',
            cta: 'bg-black text-white',
            secondaryBg: 'bg-dark-900',
            accentColor: 'text-blue-800'
        }
    ];

    const themeIndex = speaker.name.length % themes.length;
    const theme = themes[themeIndex];

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
                        className="absolute inset-0 bg-dark-950/98 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className={`relative w-full max-w-5xl ${theme.secondaryBg} rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[95vh] border border-white/5`}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-30 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors"
                        >
                            <HiX className="w-5 h-5" />
                        </button>

                        {/* Left Column: Sidebar with Image and Branding */}
                        <div className={`w-full md:w-[38%] ${theme.secondaryBg} relative overflow-hidden flex flex-col p-8 lg:p-12`}>
                            {/* Vertical "SPEAKER" Watermark */}
                            <div className="absolute left-0 top-0 bottom-0 flex items-center h-full pointer-events-none opacity-5">
                                <span className="text-8xl lg:text-9xl font-black text-white -rotate-90 origin-center whitespace-nowrap tracking-widest uppercase">
                                    SPEAKER
                                </span>
                            </div>

                            {/* Speaker Image Frame */}
                            <div className="relative z-10 flex-grow flex flex-col items-center justify-center">
                                <div className="relative w-full aspect-[4/5] bg-dark-800 p-2 shadow-2xl border border-white/10">
                                    <div className="w-full h-full overflow-hidden bg-dark-900">
                                        {speaker.imageUrl ? (
                                            <img
                                                src={speaker.imageUrl}
                                                alt={speaker.name}
                                                className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white/20">
                                                <svg className="w-32 h-32 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 14c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {/* Name Badge Overlay */}
                                    <div className="absolute -bottom-4 -left-4 bg-dark-950 px-6 py-3 shadow-xl border-l-[6px] border-primary-500 flex items-center gap-3">
                                        <div className="w-5 h-5 bg-primary-500 rounded-sm flex items-center justify-center">
                                            <div className="w-1.5 h-3 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-[10px] lg:text-xs font-black text-white uppercase tracking-widest leading-none">
                                            {speaker.name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Design Elements */}
                            <div className={`absolute bottom-0 right-0 w-24 h-24 ${theme.bg} translate-x-12 translate-y-12 rotate-45 opacity-20`}></div>
                        </div>

                        {/* Right Column: Profile and Content */}
                        <div className={`w-full md:w-[62%] ${theme.bg} p-8 lg:p-14 overflow-y-auto`}>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="h-full flex flex-col"
                            >
                                {/* Header */}
                                <div className="mb-8">
                                    <span className={`text-[10px] lg:text-xs font-bold ${theme.muted} uppercase tracking-[0.6em] block mb-4`}>
                                        S P E A K E R ' S P R O F I L E
                                    </span>
                                    <h2 className={`text-3xl lg:text-4xl font-black ${theme.text} tracking-tight mb-4`}>
                                        {speaker.name}
                                    </h2>
                                    <div className="space-y-1">
                                        <p className={`font-bold text-sm uppercase tracking-wide ${theme.sub}`}>
                                            {speaker.title || speaker.role || "Speaker"}
                                        </p>
                                        <p className={`font-medium text-xs opacity-60 italic ${theme.text}`}>
                                            Special Guest
                                        </p>
                                    </div>
                                </div>

                                {/* Quote Section - Only render if speaker has a quote */}
                                {speaker.quote && (
                                    <div className={`mb-8 border-l-4 ${theme.quoteBorder} pl-6 py-2`}>
                                        <p className={`text-lg lg:text-xl font-black ${theme.text} leading-tight italic opacity-90`}>
                                            "{speaker.quote}"
                                        </p>
                                        {speaker.quoteAuthor && (
                                            <p className={`text-sm font-bold mt-2 ${theme.sub}`}>
                                                — {speaker.quoteAuthor}
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Biography */}
                                <div className="flex-grow mb-12">
                                    <p className={`font-medium text-sm lg:text-base leading-relaxed text-justify whitespace-pre-wrap ${theme.bioText}`}>
                                        {speaker.bio || "No biography provided for this speaker."}
                                    </p>
                                </div>

                                {/* Session Footer */}
                                <div className={`mt-auto border-t ${theme.text === 'text-white' ? 'border-white/10' : 'border-black/10'} pt-8 flex flex-col gap-6`}>
                                    <div className={`${theme.sessionBg} backdrop-blur-sm p-6 rounded-sm`}>
                                        <h4 className={`text-[11px] font-black uppercase tracking-[0.2em] mb-3 ${theme.muted}`}>
                                            Session Contribution
                                        </h4>
                                        <p className={`text-sm font-bold ${theme.text} leading-snug`}>
                                            Will be serving as a Panelist for the session titled <br />
                                            <span className={`${theme.accentColor}`}>"Setting Yourself up for Success in 2026"</span>
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap items-center gap-4">
                                        <button className={`${theme.cta} px-8 py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all flex items-center gap-2 group shadow-xl`}>
                                            I Want to Attend
                                            <svg className="w-4 h-4 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </button>

                                        <div className="flex items-center gap-2 ml-auto">
                                            {speaker.linkedinUrl && (
                                                <a href={speaker.linkedinUrl} target="_blank" className={`p-2 ${theme.text === 'text-white' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} rounded-full transition-colors`}>
                                                    <FaLinkedin className={`w-4 h-4 ${theme.text}`} />
                                                </a>
                                            )}
                                            {speaker.twitterUrl && (
                                                <a href={speaker.twitterUrl} target="_blank" className={`p-2 ${theme.text === 'text-white' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/10 hover:bg-black/20'} rounded-full transition-colors`}>
                                                    <FaTwitter className={`w-4 h-4 ${theme.text}`} />
                                                </a>
                                            )}
                                        </div>
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
