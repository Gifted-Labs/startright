import React, { useState } from 'react';
import { motion } from 'framer-motion';

const historyData = [
    {
        year: 2024,
        title: "Start Right Conference 2024",
        description: "The inaugural Start Right Conference focused on foundational career success and networking for students, setting a new standard for student-led initiatives.",
        image: "/images/history/2024.jpg"
    },
    {
        year: 2025,
        title: "Start Right Conference 2025",
        description: "Expansion to multiple university chapters and the introduction of specialized tracks in technology, business, and creative arts.",
        image: "/images/history/2025.jpg"
    },
    {
        year: 2026,
        title: "Start Right Conference 2026",
        description: "Our current and most ambitious event yet, bridging the gap between academia and the AI-driven industry landscape.",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
];

export const AboutHistorySection: React.FC = () => {
    const [activeYear, setActiveYear] = useState(2026);
    const activeItem = historyData.find(item => item.year === activeYear) || historyData[0];

    return (
        <section className="py-24 bg-dark-950 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary-500 font-bold uppercase text-xs tracking-wider mb-2 block">Our milestones & achievements</span>
                    <h2 className="text-4xl font-black mb-4">Our Event History</h2>
                </div>

                {/* Timeline Controls */}
                <div className="flex items-center justify-center gap-4 md:gap-12 mb-16 overflow-x-auto pb-4 scrollbar-hide">
                    {historyData.map((item) => (
                        <button
                            key={item.year}
                            onClick={() => setActiveYear(item.year)}
                            className={`flex flex-col items-center gap-4 group min-w-[60px] cursor-pointer focus:outline-none`}
                        >
                            <span className={`text-sm md:text-lg font-bold transition-colors ${activeYear === item.year ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>
                                {item.year}
                            </span>
                            <div className={`w-3 h-3 rounded-full border-2 transition-all ${activeYear === item.year ? 'bg-primary-500 border-primary-500 scale-125' : 'bg-transparent border-gray-700 group-hover:border-gray-500'}`} />
                        </button>
                    ))}
                </div>

                {/* Content Display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        key={`img-${activeYear}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 aspect-video lg:aspect-auto h-full min-h-[300px]"
                    >
                        <img
                            src={activeItem.image}
                            alt={activeItem.title}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    <motion.div
                        key={`txt-${activeYear}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white/10 to-transparent mb-[-0.5em] select-none">
                            {activeItem.year}
                        </h3>
                        <h4 className="text-3xl font-bold text-white mb-4 relative z-10">
                            Driving Innovation at <br />
                            <span className="text-primary-500">{activeItem.title}</span>
                        </h4>
                        <div className="w-16 h-1 bg-primary-500 mb-6" />
                        <p className="text-gray-400 text-lg leading-relaxed">
                            {activeItem.description}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
