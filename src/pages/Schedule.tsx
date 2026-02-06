import { useEffect, useState } from 'react';
import { eventService } from '../services/eventService';
import type { Event, ItineraryItem } from '../types';
import { motion } from 'framer-motion';
import { PageHero } from '../components/common/PageHero';

const Schedule = () => {
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const upcoming = await eventService.getUpcomingEvents(0, 1);
                if (upcoming.content.length > 0) {
                    setEvent(upcoming.content[0]);
                }
            } catch (error) {
                console.error("Failed to load schedule", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSchedule();
    }, []);

    const itinerary: ItineraryItem[] = event?.itinerary
        ? [...event.itinerary].sort((a, b) => a.startTime.localeCompare(b.startTime))
        : [];

    return (
        <div className="bg-white min-h-screen text-gray-900">
            <PageHero
                title="SCHEDULE"
                subtitle="Plan your day"
                backgroundImage="/images/schedule-bg.jpg"
                breadcrumbs={[
                    { label: 'Schedule' }
                ]}
            />

            {/* Timeline Section */}
            <div className="bg-gray-50 py-32 relative overflow-hidden">
                {/* Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 z-0"></div>

                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    {loading ? (
                        <div className="space-y-12">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-40 bg-white/5 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : itinerary.length > 0 ? (
                        <div className="space-y-24">
                            {itinerary.map((item, index) => (
                                <motion.div
                                    key={item.id || index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6 }}
                                    className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Card Side */}
                                    <div className="w-full md:w-1/2 flex justify-center md:justify-end px-4 md:px-12">
                                        <div className={`w-full max-w-md bg-white border border-gray-100 p-8 rounded-xl hover:border-primary-500/40 shadow-sm transition-all group ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                            }`}>
                                            <span className="text-primary-600 font-bold text-xs tracking-widest uppercase mb-3 block">
                                                {item.startTime?.slice(0, 5)} - {item.endTime?.slice(0, 5)}
                                            </span>
                                            <h3 className="text-2xl font-black mb-3 group-hover:text-primary-600 transition-colors tracking-tight text-gray-900">
                                                {item.title}
                                            </h3>
                                            {item.speakerName && (
                                                <p className="text-primary-600/80 text-sm font-medium mb-2">
                                                    {item.speakerName}
                                                </p>
                                            )}
                                            <p className="text-gray-600 text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                            {item.venue && (
                                                <p className="text-gray-400 text-xs mt-3 uppercase tracking-wide">
                                                    📍 {item.venue}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Center Dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full z-20 shadow-[0_0_10px_rgba(255,0,0,0.5)]"></div>

                                    {/* Empty Side for Balance */}
                                    <div className="w-full md:w-1/2 hidden md:block"></div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white border border-gray-100 rounded-xl max-w-3xl mx-auto shadow-sm">
                            <p className="text-gray-500 text-lg">Schedule will be announced soon. Stay tuned!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom CTA Area */}
            <div className="bg-white py-32 relative z-10 border-t border-gray-100">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <button className="bg-primary-500 hover:bg-primary-600 text-white px-12 py-5 font-black tracking-widest uppercase text-sm shadow-2xl transition-all hover:translate-y-[-2px] rounded-sm">
                        Register For Event
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Schedule;
