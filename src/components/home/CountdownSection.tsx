import React from 'react';
import { CountdownTimer } from '../common/CountdownTimer';
import { motion } from 'framer-motion';

export const CountdownSection: React.FC = () => {
    return (
        <section className="py-20 relative bg-dark-900 border-y border-white/5 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-600/5 rounded-full blur-[100px]"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block px-4 py-1 rounded-full bg-red-500/10 text-red-500 font-bold text-sm mb-6 border border-red-500/20 animate-pulse">
                        ⚠️ LIMITED SEATS AVAILABLE
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-2">
                        TIME IS RUNNING OUT
                    </h2>
                    <p className="text-gray-400 mb-12 text-lg">
                        Secure your spot before registrations close.
                    </p>

                    <CountdownTimer targetDate="2026-02-21T09:00:00" />

                    <div className="mt-12">
                        <a
                            href="/events/2/register"
                            className="inline-block px-10 py-4 rounded-full bg-primary-600 hover:bg-white hover:text-black text-white font-bold text-xl transition-all duration-300 shadow-[0_10px_30px_rgba(255,107,0,0.3)] hover:shadow-[0_10px_30px_rgba(255,255,255,0.3)]"
                        >
                            Reserve Your Seat
                        </a>
                    </div>
                </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
        </section>
    );
};
