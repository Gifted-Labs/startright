import React from 'react';
import { HiOutlineUserGroup, HiOutlineGlobeAlt, HiOutlineTrendingUp } from 'react-icons/hi';
import { motion } from 'framer-motion';

export const AboutStatsSection: React.FC = () => {
    return (
        <section className="py-24 bg-gray-50 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <span className="text-primary-600 font-bold uppercase text-xs tracking-wider mb-2 block">OUR IMPACT SO FAR</span>
                <h2 className="text-3xl md:text-4xl font-black text-dark-950 mb-4">
                    We Help Students Start Right
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto mb-16">
                    Through mentorship, practical sessions, and a strong community, MerbsConnect equips students to grow academically, professionally, and personally.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Stat Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow relative group"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center text-dark-950 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                            <HiOutlineUserGroup className="w-8 h-8" />
                        </div>
                        <h3 className="text-5xl font-black text-dark-950 mb-2">5000+</h3>
                        <p className="text-primary-500 font-bold text-sm uppercase tracking-wide mb-4">Students Reached</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Students impacted through MerbsConnect programs, mentorship, and events.
                        </p>
                    </motion.div>

                    {/* Stat Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow relative group mt-0 md:-mt-8 border-b-4 border-primary-500" // Raised card effect
                    >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center text-dark-950 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                            <HiOutlineGlobeAlt className="w-8 h-8" />
                        </div>
                        <h3 className="text-5xl font-black text-dark-950 mb-2">20+</h3>
                        <p className="text-primary-500 font-bold text-sm uppercase tracking-wide mb-4">Speakers Featured</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Academic and industry leaders sharing practical guidance and real stories.
                        </p>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-primary-500/40">
                            <span className="text-2xl font-bold">+</span>
                        </div>
                    </motion.div>

                    {/* Stat Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow relative group"
                    >
                        <div className="w-16 h-16 mx-auto mb-6 bg-gray-50 rounded-2xl flex items-center justify-center text-dark-950 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                            <HiOutlineTrendingUp className="w-8 h-8" />
                        </div>
                        <h3 className="text-5xl font-black text-dark-950 mb-2">3+</h3>
                        <p className="text-primary-500 font-bold text-sm uppercase tracking-wide mb-4">Sessions Delivered</p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Talks, panels, workshops, and interactive sessions designed for student growth.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
