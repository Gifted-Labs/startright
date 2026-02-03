import React from 'react';
import { motion } from 'framer-motion';

const scheduleItem = [
    { time: "09:00 AM", title: "Registration & Breakfast", location: "Main Hall" },
    { time: "10:00 AM", title: "Opening Ceremony", location: "Main Stage" },
    { time: "10:30 AM", title: "Keynote: The Future of You", location: "Grand Ballroom" },
    { time: "12:00 PM", title: "Networking Lunch", location: "Dining Area" },
    { time: "01:30 PM", title: "Panel: Breaking Barriers", location: "Main Hall" },
    { time: "03:00 PM", title: "Workshops: Skill Building", location: "Various Rooms" },
];

export const AgendaSection: React.FC = () => {
    return (
        <section className="bg-dark-950 text-white relative isolate">
            {/* Header Section */}
            <div className="bg-dark-900 py-24 text-center relative z-10 border-b border-white/5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Event Schedule</h2>
                    <p className="text-gray-400 text-lg max-w-xl mx-auto">
                        A structured breakdown of what to expect at Start Right Conference 2026.
                    </p>
                    <div className="w-24 h-px bg-primary-500/30 mx-auto mt-12"></div>
                </motion.div>
            </div>

            {/* Timeline Section */}
            <div className="bg-dark-950/50 py-32 relative overflow-hidden">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2 z-0"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <div className="space-y-24">
                        {scheduleItem.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Card Side */}
                                <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 md:px-12">
                                    <div className={`w-full max-w-md bg-dark-900/50 border border-white/10 p-8 rounded-xl hover:border-primary-500/40 transition-all group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                        }`}>
                                        <span className="text-primary-500 font-bold text-xs tracking-widest uppercase mb-3 block">
                                            {item.time}
                                        </span>
                                        <h3 className="text-2xl font-black mb-2 group-hover:text-primary-400 transition-colors tracking-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm italic">{item.location}</p>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full z-20 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>

                                {/* Empty Side for Balance */}
                                <div className="w-full md:w-1/2 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom CTA Area */}
            <div className="bg-dark-900 py-24 relative z-10 border-t border-white/5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-10 py-4 font-black tracking-widest uppercase text-sm shadow-2xl transition-all hover:translate-y-[-2px] rounded-sm">
                        View Full Schedule
                    </button>
                </motion.div>
            </div>
        </section>
    );
};
