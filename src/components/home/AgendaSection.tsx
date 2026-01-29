import React from 'react';
import { motion } from 'framer-motion';

const scheduleItem = [
    { time: "09:00 AM", title: "Registration & Breakfast", speaker: "Main Hall", role: "Check-in" },
    { time: "10:00 AM", title: "Opening Ceremony", speaker: "Conference Host", role: "Main Stage" },
    { time: "10:30 AM", title: "Keynote: The Future of You", speaker: "Dr. Kweku Arthur", role: "AI Researcher" },
    { time: "12:00 PM", title: "Networking Lunch", speaker: "Dining Area", role: "Community" },
    { time: "01:30 PM", title: "Panel: Breaking Barriers", speaker: "Industry Leaders", role: "Interactive Session" },
    { time: "03:00 PM", title: "Workshops: Skill Building", speaker: "Various Rooms", role: "Hands-on" },
];

export const AgendaSection: React.FC = () => {
    return (
        <section className="py-24 bg-dark-950 text-white relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-primary-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary-500 font-script text-3xl md:text-4xl block mb-2"
                    >
                        Event Schedule
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black tracking-tight"
                    >
                        Brief Timeline
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Vertical Glowing Line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500/0 via-primary-500/50 to-primary-500/0 md:-translate-x-1/2"></div>

                    <div className="space-y-12 md:space-y-24">
                        {scheduleItem.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
                                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'}`}>
                                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl hover:border-primary-500/30 transition-all group w-full">
                                            <span className="text-primary-500 font-bold text-sm tracking-widest uppercase mb-2 block">
                                                {item.time}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-primary-400 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-3">{item.role}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-300">
                                                <span className={`w-2 h-2 rounded-full bg-primary-500`}></span>
                                                {item.speaker}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Center Dot */}
                                <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-dark-950 border-4 border-primary-500 rounded-full z-20 shadow-[0_0_15px_rgba(255,107,0,0.5)]"></div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 w-full md:w-1/2 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-20">
                    <button className="bg-gradient-to-r from-primary-600 to-primary-500 text-white px-10 py-4 rounded-full font-bold shadow-[0_4px_20px_rgba(255,107,0,0.3)] hover:shadow-[0_6px_25px_rgba(255,107,0,0.5)] hover:scale-105 transition-all">
                        View Full Schedule
                    </button>
                </div>
            </div>
        </section>
    );
};
