import React, { useState } from 'react';
import { motion } from 'framer-motion';

const historyData = [
    { year: 2010, title: "Foundation", description: "StartRight was founded with a vision to connect young professionals with industry leaders.", image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { year: 2013, title: "First Summit", description: "Hosted our first major international summit in London, attended by over 500 delegates.", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { year: 2016, title: "Global Expansion", description: "Expected markets in Asia and South America, launching regional chapters.", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { year: 2019, title: "Digital Platform", description: "Launched our digital learning platform to provide year-round resources.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
    { year: 2022, title: "Post-Pandemic Return", description: "Returned to live events with our biggest conference yet in NYC.", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
];

export const AboutHistorySection: React.FC = () => {
    const [activeYear, setActiveYear] = useState(2022);
    const activeItem = historyData.find(item => item.year === activeYear) || historyData[0];

    return (
        <section className="py-24 bg-dark-950 text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px]" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <span className="text-primary-500 font-bold uppercase text-xs tracking-wider mb-2 block">Our milestones & achievements</span>
                    <h2 className="text-4xl font-black mb-4">Our Company History</h2>
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
                            We Generate New and <br />
                            <span className="text-primary-500">{activeItem.title}</span> ideas
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
