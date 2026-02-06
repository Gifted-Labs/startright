import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';

export const TicketCTASection: React.FC = () => {
    return (
        <section className="relative py-32 bg-dark-950 overflow-hidden isolate">
            {/* Background Texture/Overlay */}
            <div className="absolute inset-0 z-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    alt="Background"
                    className="w-full h-full object-cover grayscale mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                    {/* Left Side — Messaging (Messaging Column) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tight">
                            ARE YOU READY FOR <br />
                            <span className="text-primary-500">
                                START RIGHT CONFERENCE 2026?
                            </span>
                        </h2>

                        <p className="text-xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
                            A transformative gathering for young professionals, students, and leaders
                            to gain clarity, build purpose, and position themselves for the future.
                        </p>

                        {/* Key Benefits */}
                        <div className="space-y-6 mb-12">
                            {[
                                { title: "Strategic Insight", desc: "Learn practical frameworks for career, leadership, and purpose." },
                                { title: "High-Value Networking", desc: "Connect with industry leaders and like-minded peers." },
                                { title: "Actionable Takeaways", desc: "Walk away with clear next steps, not just inspiration." },
                                { title: "Community & Mentorship", desc: "Be part of a growing network beyond the conference." }
                            ].map((benefit, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="flex items-start gap-4 group"
                                >
                                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded bg-primary-500/10 flex items-center justify-center text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors duration-300">
                                        <HiCheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg mb-1">{benefit.title}</h4>
                                        <p className="text-gray-400 text-sm leading-snug">{benefit.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <Link
                            to="/events/register"
                            className="inline-flex items-center gap-3 bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 font-bold text-lg transition-all hover:gap-5 group"
                        >
                            Book Your Ticket <HiArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    {/* Right Side — Redesigned Card (Conference Pass) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
                        className="lg:col-span-5 flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500 py-1">
                            {/* Card Header (Dark Banner) */}
                            <div className="bg-dark-900 px-6 py-5 text-center relative">
                                <span className="absolute top-2 right-4 text-[10px] font-bold text-primary-500 tracking-widest animate-pulse">
                                    LIMITED SEATS AVAILABLE
                                </span>
                                <h3 className="text-white font-black text-xl leading-tight tracking-widest">
                                    START RIGHT CONFERENCE 2026<br />
                                    <span className="text-primary-500 text-sm font-medium">FREE REGISTRATION PASS</span>
                                </h3>
                            </div>

                            {/* Middle Section — Attendee Details */}
                            <div className="px-8 py-8 border-b border-gray-100">
                                <div className="grid grid-cols-1 gap-y-6">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Pass Type</p>
                                        <p className="text-dark-900 font-bold">SRC 2026 Standard</p>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Seat</p>
                                        <p className="text-dark-900 font-bold">Freeee</p>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date</p>
                                        <p className="text-dark-900 font-bold">Saturday, February 21, 2026</p>
                                    </div>
                                </div>
                            </div>

                            {/* Lower Section — Conference Benefits */}
                            <div className="px-8 py-6 bg-gray-50/50">
                                <p className="text-[11px] text-gray-600 font-bold uppercase tracking-widest mb-4">What Your Pass Includes</p>
                                <ul className="space-y-2 mb-8">
                                    {[
                                        "Full access to all sessions & panel discussions",
                                        "LinkedIn Corner: account setup & headshots",
                                        "Networking and community connections",
                                        "Q&A and interactive session",
                                        "Photo session",
                                        "Digital resources after the conference"
                                    ].map((perk, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-600 text-xs text-left">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0"></div>
                                            {perk}
                                        </li>
                                    ))}
                                </ul>

                                <button className="w-full py-4 bg-dark-900 hover:bg-primary-600 text-white font-black tracking-widest uppercase text-sm transition-colors duration-300">
                                    Get QR Code
                                </button>
                            </div>

                            {/* Design Decorative Elements */}
                            <div className="absolute top-1/2 -left-3 w-6 h-6 bg-dark-950 rounded-full"></div>
                            <div className="absolute top-1/2 -right-3 w-6 h-6 bg-dark-950 rounded-full"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// Supporting standard link import if missing
import { Link } from 'react-router-dom';
